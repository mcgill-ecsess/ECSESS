<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import Navbar from 'components/layout/NavBar.svelte';
	import Footer from 'components/layout/Footer.svelte';

	let { children } = $props();

	// Lazy load analytics only in production for faster dev startup
	onMount(async () => {
		if (!dev) {
			const { inject } = await import('@vercel/analytics');
			inject({ mode: 'production' });
		}
	});
</script>

<Navbar />
{@render children()}
<Footer />
