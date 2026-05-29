<script lang="ts">
	import { Grid, Willow } from '@svar-ui/svelte-grid';
	import type { IColumnConfig } from '@svar-ui/svelte-grid';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const columns = [
		{ id: 'id', header: 'ID', width: 90 },
		{ id: 'name_ja', header: [{ text: 'カード名' }, { filter: 'text' as const }], width: 300 },
		{
			id: 'frame_type',
			header: ['カード種', { filter: 'richselect' as const }],
			width: 200,
			sort: true
		},
		{
			id: 'race',
			header: ['種族 / カード種詳細', { filter: 'richselect' as const }],
			width: 200,
			sort: true
		},
		{ id: 'attribute', header: ['属性', { filter: 'richselect' as const }], width: 80, sort: true },
		{ id: 'level', header: 'レベル', width: 80, sort: true },
		{ id: 'scale', header: 'スケール', width: 80, sort: true },
		{ id: 'linkval', header: 'リンク', width: 80, sort: true },
		{ id: 'atk', header: '攻', width: 80, sort: true },
		{ id: 'def', header: '守', width: 80, sort: true },
		{ id: 'text_ja', header: ['テキスト', { filter: 'text' as const }], flexgrow: 1 }
	] satisfies IColumnConfig[];
</script>

<div class="app">
	<header>
		<h1>yugioh-grid</h1>
	</header>

	<main>
		<Willow>
			<Grid data={data.cards} {columns} />
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
