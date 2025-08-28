<script>
	import '../app.css';
	import Navbar from 'components/NavBar.svelte';
	import Footer from 'components/Footer.svelte';

	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
