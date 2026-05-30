<script lang="ts">
	let { row, column }: { row: any; column: any; api: any; onaction: any } = $props();

	const value = $derived(String(row[column.id] ?? ''));
</script>

<span class="badge">
	{value}
</span>

<style>
	.badge {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 500;
		background: #334155;
		color: #f8fafc;
		border: 1px solid #475569;
		white-space: nowrap;
	}
</style>
