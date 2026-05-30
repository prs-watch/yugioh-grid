<script lang="ts">
	const COLORS: Record<string, { bg: string; color: string }> = {
		通常: { bg: '#92400e', color: '#fde68a' },
		効果: { bg: '#9a3412', color: '#fed7aa' },
		魔法: { bg: '#14532d', color: '#86efac' },
		罠: { bg: '#831843', color: '#fbcfe8' },
		融合: { bg: '#4c1d95', color: '#ddd6fe' },
		儀式: { bg: '#1e3a8a', color: '#bfdbfe' },
		シンクロ: { bg: '#334155', color: '#e2e8f0' },
		エクシーズ: { bg: '#0f172a', color: '#94a3b8' },
		リンク: { bg: '#1e3a8a', color: '#93c5fd' },
		トークン: { bg: '#374151', color: '#d1d5db' },
		通常ペンデュラム: { bg: '#78350f', color: '#fde68a' },
		効果ペンデュラム: { bg: '#7c2d12', color: '#fed7aa' }
	};

	let { row, column }: { row: any; column: any; api: any; onaction: any } = $props();

	const value = $derived(String(row[column.id] ?? ''));
	const style = $derived(COLORS[value] ?? { bg: '#374151', color: '#d1d5db' });
</script>

<span class="badge" style="background:{style.bg}; color:{style.color};">
	{value}
</span>

<style>
	.badge {
		display: inline-block;
		padding: 2px 8px;
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 600;
		white-space: nowrap;
		letter-spacing: 0.02em;
	}
</style>
