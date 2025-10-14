<script>
	import '../app.css';
	import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
	import Navbar from 'components/layout/NavBar.svelte';
	import Footer from 'components/layout/Footer.svelte';

	inject({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
