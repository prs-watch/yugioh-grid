<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>yugioh-grid</title>
	<link rel="icon" href={favicon} />
	<meta property="og:title" content="Yu-Gi-Oh! Card Grid" />
	<meta property="og:description" content="遊戯王カードデータベース — 23,000+ cards を検索・フィルタ・ソート" />
	<meta property="og:image" content="https://yugioh-grid.vercel.app/og" />
	<meta property="og:url" content="https://yugioh-grid.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://yugioh-grid.vercel.app/og" />
</svelte:head>

{@render children()}
