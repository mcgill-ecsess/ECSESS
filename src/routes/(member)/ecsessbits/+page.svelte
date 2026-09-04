<script lang="ts">
	import SeoMetaTags from '$lib/components/layout/SeoMetaTags.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import SubcommitteeRoster from '../components/SubcommitteeRoster.svelte';

	let { data } = $props();
</script>

<SeoMetaTags title={data.seoTitle} description={data.seoDescription} canonical={data.canonical} />

<Section contentStart={true}>
	<SubcommitteeRoster title={data.title} members={data.members} />
</Section>
