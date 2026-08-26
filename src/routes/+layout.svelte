<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PageThumbnail from '$lib/components/layout/PageThumbnail.svelte';
	import BackgroundSplashes from '$lib/components/layout/BackgroundSplashes.svelte';

	let { children, data } = $props();
	// Lazy load analytics only in production for faster dev startup
	onMount(async () => {
		if (!dev) {
			const { inject } = await import('@vercel/analytics');
			inject({ mode: 'production' });
		}
	});
</script>

<BackgroundSplashes />
<div class="relative z-10 flex min-h-dvh flex-col">
	<Navbar notification={data.notification} />
	<PageThumbnail thumbnail={data.thumbnail} />
	<main class="flex flex-1 flex-col [&>*:only-child]:flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
