<script>
	import ResourceCard from 'components/ResourceCard.svelte';
	import Section from 'components/Section.svelte';
	import SeoMetaTags from 'components/SeoMetaTags.svelte';
	let { data } = $props();
</script>

<SeoMetaTags
	title="ECSESS Resources - Academic, Technical, Involvement, etc."
	description="ECSESS resource hub for everything relating to academic, technical, involvement, sustainability, equity, campus life, and more!"
	canonical={data.canonical}
/>

<Section>
	<p class="page-title">Resources</p>

	<div class="flex flex-col gap-8">
		{#each data.resources as re}
			<ResourceCard title={re.title} link={re.url}>
				{re.description}
			</ResourceCard>
		{/each}
	</div>
</Section>
