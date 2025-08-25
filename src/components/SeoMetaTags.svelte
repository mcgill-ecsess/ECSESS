<script>
	let {
		title = "Electrical, Computer & Software Engineering Students' Society at McGill - ECSESS",
		description = 'Meet the student council, get access to academic and technical resources, registration for events, and much more!',
		canonical = 'https://ecsess.mcgilleus.ca'
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
</svelte:head>
