<script lang="ts">
	let { row, column }: { row: any; column: any; api: any; onaction: any } = $props();

	const level = $derived(Number(row[column.id] ?? 0));
</script>

{#if level > 0}
	<span class="stars" title={`レベル ${level}`}>
		{'★'.repeat(level)}
	</span>
{/if}

<style>
	.stars {
		color: #fbbf24;
		font-size: 0.85rem;
		letter-spacing: -0.1em;
		white-space: nowrap;
	}
</style>
