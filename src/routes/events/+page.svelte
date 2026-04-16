<script lang="ts">
	import { type EventPost, EventCategory } from '$lib/schemas';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import EventTabsTrigger from 'components/event/EventTabsTrigger.svelte';
	import EventTabsContent from 'components/event/EventTabsContent.svelte';

	let { data } = $props();

	let events = $derived(data.events ?? []);
	let group = $state<EventCategory>(EventCategory.ALL_EVENTS);
	let categories: { value: EventCategory; label: string }[] = [
		{ value: EventCategory.ALL_EVENTS, label: 'All' },
		{ value: EventCategory.ACADEMIC, label: 'Academic' },
		{ value: EventCategory.PROFESSIONAL, label: 'Professional' },
		{ value: EventCategory.SOCIAL, label: 'Social' },
		{ value: EventCategory.TECHNICAL, label: 'Technical' }
	];

	function handleTabChange(selectedCategory: EventCategory) {
		group = selectedCategory;
	}
</script>

<SeoMetaTags
	title="Events by ECSESS"
	description="Checkout our events! ECSESS organizes academic events, professional & social networkings, technical workshops, and more!"
	canonical={data.canonical}
/>

<Section contentStart={true}>
	<!-- Page header -->
	<div class="w-full max-w-7xl pt-6 text-left">
		<p class="text-ecsess-500 mb-2 text-xs font-bold tracking-[0.2em] uppercase">ECSESS</p>
		<h1 class="text-ecsess-50 mb-6 py-0 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
			Events
		</h1>

		<!-- Filter pills -->
		<ul class="flex flex-wrap gap-2" role="tablist" aria-label="Filter events by category">
			{#each categories as category}
				<EventTabsTrigger
					value={category.value}
					selected={group === category.value}
					onclick={handleTabChange}
				>
					{category.label}
				</EventTabsTrigger>
			{/each}
		</ul>
	</div>

	<!-- Feed -->
	<EventTabsContent category={group} {events} />
</Section>
