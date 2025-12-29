<script lang="ts">
	import { type EventPost, EventCategory } from '$lib/schemas';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import EventTabsTrigger from 'components/event/EventTabsTrigger.svelte';
	import EventTabsContent from 'components/event/EventTabsContent.svelte';

	let { data } = $props();

	let events: EventPost[] = data.events ?? [];
	let group = $state<EventCategory>(EventCategory.ALL_EVENTS);
	let categories: {value: EventCategory; label: string}[] = [
	{ value: EventCategory.ALL_EVENTS, label: 'All Events' },
	{ value: EventCategory.ACADEMIC, label: 'Academic' },
	{ value: EventCategory.PROFESSIONAL, label: 'Professional' },
	{ value: EventCategory.SOCIAL, label: 'Social' },
	{ value: EventCategory.TECHNICAL, label: 'Technical' }
];
	// Handle tab change
	function handleTabChange(selectedCategory: EventCategory) {
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
				<EventTabsTrigger value={category.value} selected={group=== category.value} onclick={handleTabChange}>{category.label}</EventTabsTrigger>
			{/each}
		</ul>

		<EventTabsContent category={group} {events} />
	</div>
</Section>
