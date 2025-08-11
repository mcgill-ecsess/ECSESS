<script>
	import '../app.css';
	import Navbar from 'components/NavBar.svelte';
	import Footer from 'components/Footer.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics({ mode: 'auto' });
	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
