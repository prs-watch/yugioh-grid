<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
</script>

<svelte:head>
	<title>yugioh-grid</title>
	<link rel="icon" href={favicon} />
	<meta property="og:title" content="yugioh-grid" />
	<meta property="og:description" content="yugioh-grid" />
	<meta property="og:image" content="{data.baseUrl}/og" />
	<meta property="og:url" content="{data.baseUrl}/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="{data.baseUrl}/og" />
</svelte:head>

{@render children()}
