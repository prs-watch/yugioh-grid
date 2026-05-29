<script lang="ts">
	import { onMount } from 'svelte';
	import Papa from 'papaparse';
	import { Grid, Willow } from '@svar-ui/svelte-grid';
	import type { IColumnConfig } from '@svar-ui/svelte-grid';

	interface Card {
		id: number;
		name_en: string;
		text_en: string;
		name_ja: string;
		ruby: string;
		text_ja: string;
		type: string;
		frame_type: string;
		atk: number | null;
		def: number | null;
		level: number | null;
		race: string;
		attribute: string;
		scale: number | null;
		linkval: number | null;
		linkmarkers: string;
	}

	function toInt(v: string): number | null {
		const n = parseInt(v, 10);
		return isNaN(n) ? null : n;
	}

	let data = $state<Card[]>([]);
	let loading = $state(true);
	let error = $state('');

	const columns: IColumnConfig[] = [
		{ id: 'id', header: 'ID', width: 90 },
		{ id: 'name_ja', header: [{ text: 'カード名' }, { filter: 'text' }], width: 300 },
		{ id: 'frame_type', header: ['カード種', { filter: 'richselect' }], width: 200, sort: true },
		{
			id: 'race',
			header: ['種族 / カード種詳細', { filter: 'richselect' }],
			width: 200,
			sort: true
		},
		{ id: 'attribute', header: ['属性', { filter: 'richselect' }], width: 80, sort: true },
		{ id: 'level', header: 'レベル', width: 80, sort: true },
		{ id: 'scale', header: 'スケール', width: 80, sort: true },
		{ id: 'linkval', header: 'リンク', width: 80, sort: true },
		{ id: 'atk', header: '攻', width: 80, sort: true },
		{ id: 'def', header: '守', width: 80, sort: true },
		{ id: 'text_ja', header: ['テキスト', { filter: 'text' }], flexgrow: 1 }
	];

	onMount(async () => {
		try {
			const res = await fetch('/dataset.csv');
			const text = await res.text();
			const result = Papa.parse<Record<string, string>>(text, {
				header: true,
				skipEmptyLines: true,
				dynamicTyping: false
			});
			data = result.data
				.filter((r) => r.name_ja !== '')
				.map((r) => ({
					...r,
					id: toInt(r.id) ?? 0,
					atk: toInt(r.atk),
					def: toInt(r.def),
					level: toInt(r.level),
					scale: toInt(r.scale),
					linkval: toInt(r.linkval)
				})) as Card[];
		} catch (e) {
			error = String(e);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Yu-Gi-Oh! Card Grid</title>
</svelte:head>

<div class="app">
	<header>
		<h1>Yu-Gi-Oh! Card Grid</h1>
	</header>

	<main>
		{#if loading}
			<div class="status">Loading CSV…</div>
		{:else if error}
			<div class="status error">{error}</div>
		{:else}
			<Willow>
				<Grid {data} {columns} />
			</Willow>
		{/if}
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

	.status {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		font-size: 1rem;
		color: #94a3b8;
	}

	.error {
		color: #f87171;
	}
</style>
