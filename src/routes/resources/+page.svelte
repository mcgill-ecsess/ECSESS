<script>
	import ResourceCard from 'components/ResourceCard.svelte';
	import Section from 'components/Section.svelte';
	let { data } = $props();
</script>

<title> Resources </title>

<Section>
	<p class="page-title">Resources</p>

	<div class="grid gap-4">
		{#each data.resources as re}
			<ResourceCard
				title={re.title}
				link={re.url}
				description={re.description}
			/>
		{/each}
	</div>
</Section>
