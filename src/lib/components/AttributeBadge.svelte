<script lang="ts">
	const EMOJIS: Record<string, string> = {
		光: '☀️',
		闇: '🌑',
		炎: '🔥',
		水: '💧',
		風: '💨',
		地: '🪨',
		神: '⚡'
	};

	let { row, column }: { row: any; column: any; api: any; onaction: any } = $props();

	const value = $derived(String(row[column.id] ?? ''));
	const emoji = $derived(EMOJIS[value] ?? '');
</script>

<span class="attr">{emoji ? `${emoji} ${value}` : value}</span>

<style>
	.attr {
		white-space: nowrap;
		font-size: 0.82rem;
	}
</style>
