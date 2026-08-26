<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PageThumbnail from '$lib/components/layout/PageThumbnail.svelte';
	import BackgroundMotifs from '$lib/components/layout/BackgroundMotifs.svelte';

	let { children, data } = $props();
	// Lazy load analytics only in production for faster dev startup
	onMount(async () => {
		if (!dev) {
			const { inject } = await import('@vercel/analytics');
			inject({ mode: 'production' });
		}
	});
</script>

<div class="relative flex min-h-dvh flex-col">
	<BackgroundMotifs />
	<!-- Content sits above motifs; footer is a sibling so its backdrop-blur can sample them -->
	<div class="relative z-10 flex flex-1 flex-col">
		<Navbar notification={data.notification} />
		<PageThumbnail thumbnail={data.thumbnail} />
		<main class="flex flex-1 flex-col [&>*:only-child]:flex-1">
			{@render children()}
		</main>
	</div>
	<div class="relative z-10">
		<Footer />
	</div>
</div>
