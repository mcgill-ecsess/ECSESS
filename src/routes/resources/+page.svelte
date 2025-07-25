<script>
	import ResourceCard from 'components/ResourceCard.svelte';
	import Section from 'components/Section.svelte';
	let { data } = $props();
</script>

<title> Resources </title>

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
