<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Yu-Gi-Oh! Card Grid</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
