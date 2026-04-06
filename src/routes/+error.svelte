<script lang="ts">
	import { page } from '$app/state';
	import Section from 'components/layout/Section.svelte';
	import Button from 'components/Button.svelte';
</script>

<svelte:head>
	<title>{page.status} - Error | ECSESS</title>
</svelte:head>

<Section
	from="from-primary-background"
	to="to-primary-background"
	via="via-primary-soft"
	direction="to-b"
>
	<h1 class="text-base-content text-8xl font-black tracking-tighter">Segmentation Fault</h1>
	<Button href="/" variant="primary" size="lg" class="mb-2">Reboot to Homepage</Button>

	<p class="text-base-content text-xl leading-relaxed">
		The page you are looking for is not implemented because we are too lazy to do it. <br />
		But if you really want to see it, you can reboot to the homepage and try again.
		<br />
		<br />
		Or even better, you can join us and help us implement it.
	</p>

	<p
		class="text-base-content border-muted border-t border-b border-dashed py-2 text-xl leading-relaxed"
	>
		Logging error
	</p>
	<p class="text-base-content text-lg leading-relaxed">
		Status: {page.status ?? 'Unknown'} <br />
		Error: {page.error?.message ?? 'Segmentation Fault'}<br />
	</p>
</Section>
