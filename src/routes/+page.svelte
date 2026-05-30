<script lang="ts">
	import type { Json } from '@duckdb/node-api/lib/Json';
	import { Grid, HeaderMenu, Tooltip, Willow } from '@svar-ui/svelte-grid';
	import type { IApi, IColumnConfig } from '@svar-ui/svelte-grid';
	import { onMount } from 'svelte';
	import FrameTypeBadge from '$lib/components/FrameTypeBadge.svelte';
	import RaceBadge from '$lib/components/RaceBadge.svelte';
	import LevelBadge from '$lib/components/LevelBadge.svelte';

	/** マウント時に /api/cards から取得したカード行データ。 */
	let cards = $state<Record<string, Json>[]>([]);

	/** HeaderMenu・Tooltip との連携用グリッド API。 */
	let api = $state<IApi>();

	/** 数値フィールドの一意値を昇順ソートして richselect 用オプションに変換する。 */
	function numericOptions(field: string) {
		return [
			...new Set(
				cards
					.map((c) => c[field])
					.filter((v): v is number => typeof v === 'number' && v !== 0)
			)
		]
			.sort((a, b) => a - b)
			.map((v) => ({ id: v, label: String(v) }));
	}

	/** グリッドのカラム定義。数値フィルター列は cards ロード後に options が確定するため $derived で管理。 */
	const columns = $derived.by(
		() =>
			[
				{ id: 'name_ja', header: [{ text: 'カード名' }, { filter: 'text' as const }], width: 300 },
				{
					id: 'frame_type',
					header: ['カード種', { filter: 'richselect' as const }],
					width: 130,
					sort: true,
					cell: FrameTypeBadge
				},
				{
					id: 'race',
					header: ['種族 / カード種詳細', { filter: 'richselect' as const }],
					width: 180,
					sort: true,
					cell: RaceBadge
				},
				{
					id: 'attribute',
					header: ['属性', { filter: 'richselect' as const }],
					width: 80,
					sort: true
				},
				{
					id: 'level',
					header: ['レベル', { filter: 'richselect' as const }],
					width: 180,
					sort: true,
					cell: LevelBadge,
					options: numericOptions('level')
				},
				{
					id: 'scale',
					header: ['スケール', { filter: 'richselect' as const }],
					width: 80,
					sort: true,
					options: numericOptions('scale')
				},
				{
					id: 'linkval',
					header: ['リンク', { filter: 'richselect' as const }],
					width: 80,
					sort: true,
					options: numericOptions('linkval')
				},
				{ id: 'atk', header: '攻', width: 80, sort: true },
				{ id: 'def', header: '守', width: 80, sort: true },
				{
					id: 'text_ja',
					header: ['テキスト', { filter: 'text' as const }],
					flexgrow: 1,
					// @ts-expect-error tooltip は IColumnConfig 型定義にないが Tooltip コンポーネントが参照する
					tooltip: (row: Record<string, Json>) => String(row.text_ja ?? '')
				}
			] satisfies IColumnConfig[]
	);

	onMount(async () => {
		const res = await fetch('/api/cards');
		cards = await res.json();
	});
</script>

<div class="app">
	<header>
		<h1>yugioh-grid</h1>
		<div class="hint">
			<span class="hint-icon">i</span>
			<div class="hint-popup">
				<p>テキスト列のセルにカーソルを当てるとカードテキストが全文表示されます</p>
				<p>列ヘッダーを右クリックすると列の表示 / 非表示を切り替えられます</p>
			</div>
		</div>
	</header>

	<main>
		<Willow>
			<Tooltip {api}>
				<HeaderMenu {api}>
					<Grid
						data={cards}
						{columns}
						init={(a) => { api = a; }}
						split={{ left: 1 }}
						sizes={{ rowHeight: 40 }}
					/>
				</HeaderMenu>
			</Tooltip>
		</Willow>
	</main>
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100%;
		font-family: system-ui, sans-serif;
		background: #0f172a;
		color: #e2e8f0;
	}

	.app {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1.25rem;
		background: #1e293b;
		border-bottom: 1px solid #334155;
		flex-shrink: 0;
	}

	h1 {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #f8fafc;
	}

	.hint {
		position: relative;
	}

	.hint-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #334155;
		color: #94a3b8;
		font-size: 11px;
		font-style: italic;
		font-weight: 700;
		cursor: default;
		user-select: none;
	}

	.hint-popup {
		display: none;
		position: absolute;
		top: calc(100% + 8px);
		left: 0;
		background: #1e293b;
		border: 1px solid #475569;
		border-radius: 6px;
		padding: 8px 12px;
		font-size: 0.75rem;
		color: #cbd5e1;
		z-index: 100;
		pointer-events: none;
		width: max-content;
		max-width: 320px;
	}

	.hint-popup p {
		margin: 0;
		padding: 3px 0;
	}

	.hint-popup p + p {
		border-top: 1px solid #334155;
		margin-top: 6px;
		padding-top: 6px;
	}

	.hint-popup::before {
		content: '';
		position: absolute;
		bottom: 100%;
		left: 6px;
		border: 5px solid transparent;
		border-bottom-color: #475569;
	}

	.hint:hover .hint-popup {
		display: block;
	}

	main {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}

	main :global(.wx-grid) {
		flex: 1;
		min-height: 0;
	}
</style>
