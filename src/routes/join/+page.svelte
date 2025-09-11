<script>
	import ResourceCard from 'components/ResourceCard.svelte';
	import Section from 'components/Section.svelte';
	import SeoMetaTags from 'components/SeoMetaTags.svelte';
	let isElectionTime = $state(true);
	let { data } = $props();
</script>

<SeoMetaTags
	title="Join the ECSESS student council!!!"
	description="Learn how you can join the ECSESS council and make an impact on the ECSE student community at McGill University!"
	canonical={data.canonical}
/>

<Section>
	<p class="page-title">Want to join ECSESS Council?</p>
	<p>Come back around March for application period!</p>

	<!-- {#if isElectionTime}
		<ResourceCard title="Involvement Booklet">
			A guide to involvement with ECSESS and its subcommittees (The Factory, IEEE McGill, CodeJam).
		</ResourceCard>
	{:else}{/if} -->
</Section>
