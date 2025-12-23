<script lang="ts">
	import type { EventPost, Category } from '$lib/schemas';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import EventTabsTrigger from 'components/event/EventTabsTrigger.svelte';
	import EventTabsContent from 'components/event/EventTabsContent.svelte';

	let { data } = $props();

	let events: EventPost[] = data.events ?? [];
	let group = $state<Category>('allEvents');
	let categories: {value: Category; label: string}[] = [
	{ value: 'allEvents', label: 'All Events' },
	{ value: 'academic', label: 'Academic' },
	{ value: 'professional', label: 'Professional' },
	{ value: 'social', label: 'Social' },
	{ value: 'technical', label: 'Technical' }
];
	// Handle tab change
	function handleTabChange(selectedCategory: Category) {
		group = selectedCategory;
	}
</script>

<SeoMetaTags
	title="Events by ECSESS"
	description="Checkout our events! ECSESS organizes academic events, professional & social networkings, technical workshops, and more!"
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-600" direction="to-b">
	<p class="page-title">Events</p>

	<div>
		<ul class="flex justify-center flex-wrap gap-2">
			{#each categories as category}
				<EventTabsTrigger value={category.value} onclick={handleTabChange}>{category.label}</EventTabsTrigger>
			{/each}
		</ul>

		<EventTabsContent category={group} {events} />
	</div>
</Section>
