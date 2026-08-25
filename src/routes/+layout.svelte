<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/layout/NavBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import PageThumbnail from '$lib/components/layout/PageThumbnail.svelte';

	let { children, data } = $props();
	// Lazy load analytics only in production for faster dev startup
	onMount(async () => {
		if (!dev) {
			const { inject } = await import('@vercel/analytics');
			inject({ mode: 'production' });
		}
	});
</script>

<Navbar />
<PageThumbnail thumbnail={data.thumbnail} />
{@render children()}
<Footer />
