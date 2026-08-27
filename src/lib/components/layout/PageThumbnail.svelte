<script>
	let { thumbnail } = $props();
</script>

<svelte:head>
	{#if thumbnail}
		<meta property="og:image" content={thumbnail} />
		<meta property="twitter:image" content={thumbnail} />
	{/if}
</svelte:head>
