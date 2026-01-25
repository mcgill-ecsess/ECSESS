<script>
	let { thumbnail = '' } = $props();
</script>

<svelte:head>
	<meta property="og:image" content={thumbnail} />
	<meta property="twitter:image" content={thumbnail} />
</svelte:head>
