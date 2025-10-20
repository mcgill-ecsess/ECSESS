<script>
	import ResourceCard from 'components/resource/ResourceCard.svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	let { data } = $props();
</script>

<SeoMetaTags
	title="ECSESS Resources - Academic, Technical, Involvement, etc."
	description="ECSESS resource hub for everything relating to academic, technical, involvement, sustainability, equity, campus life, and more!"
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<p class="page-title">Resources</p>

	<div class="grid gap-4">
		{#each data.resources as re}
			<ResourceCard title={re.title} link={re.url} description={re.description} />
		{/each}
	</div>
</Section>
