<script>
	let {
		title = "Electrical, Computer & Software Engineering Students' Society at McGill - ECSESS",
		description = 'Meet the student council, get access to academic and technical resources, registration for events, and much more!',
		canonical = 'https://ecsess.mcgilleus.ca'
	} = $props();

	let thumbnail = "https://cdn.sanity.io/images/vmtsvpe2/production/5d68504038cc692805dc5e51af83adedfefde442-5304x3443.jpg?h=628&fm=webp";
</script>

<svelte:head>
	<!-- Meta Tags Generated with https://metatags.io -->
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={thumbnail} />

	<!-- X (Twitter) -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonical} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={thumbnail} />
</svelte:head>
