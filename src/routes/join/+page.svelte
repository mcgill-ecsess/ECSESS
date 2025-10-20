<script>
	import ResourceCard from 'components/resource/ResourceCard.svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	let isElectionTime = $state(true);
	let { data } = $props();
</script>

<SeoMetaTags
	title="Join the ECSESS student council!!!"
	description="Learn how you can join the ECSESS council and make an impact on the ECSE student community at McGill University!"
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<p class="page-title">Want to join ECSESS Council?</p>
	<p>Come back around March for application period!</p>

	<!-- {#if isElectionTime}
		<ResourceCard title="Involvement Booklet">
			A guide to involvement with ECSESS and its subcommittees (The Factory, IEEE McGill, CodeJam).
		</ResourceCard>
	{:else}{/if} -->
</Section>
