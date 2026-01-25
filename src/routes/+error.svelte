<script lang="ts">
	import { page } from '$app/state';
	import Section from 'components/layout/Section.svelte';
	import Link from 'components/Link.svelte';
	import Button from 'components/Button.svelte';
</script>

<svelte:head>
	<title>{page.status} - Error | ECSESS</title>
</svelte:head>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<h1 class="text-ecsess-100 text-8xl font-black tracking-tighter md:text-9xl">
		Segmentation Fault
	</h1>
	<Link href="/">
		<Button class="text-ecsess-50 mb-2 cursor-pointer text-lg">Reboot to Homepage</Button>
	</Link>

	<p class="text-ecsess-200 text-lg leading-relaxed md:text-xl">
		The page you are looking for is not implemented because we are too lazy to do it. <br />
		But if you really want to see it, you can reboot to the homepage and try again.
		<br />
		<br />
		Or even better, you can join us and help us implement it.
	</p>

	<p
		class="text-ecsess-200 border-ecsess-300 border-t border-b border-dashed py-2 text-lg leading-relaxed md:text-xl"
	>
		Logging error
	</p>
	<p class="text-ecsess-200 text-base leading-relaxed">
		Status: {page.status ?? 'Unknown'} <br />
		Error: {page.error?.message ?? 'Segmentation Fault'}<br />
	</p>
</Section>
