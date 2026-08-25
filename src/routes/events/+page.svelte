<script lang="ts">
	import { type EventPost, EventCategory } from '$lib/schemas';
	import Section from '$lib/components/layout/Section.svelte';
	import SeoMetaTags from '$lib/components/layout/SeoMetaTags.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import EventTabsTrigger from '$lib/components/EventTabsTrigger.svelte';
	import EventTabsContent from './components/EventTabsContent.svelte';

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

<Section
	from="from-ecsess-black"
	to="to-ecsess-black"
	via="via-ecsess-600"
	direction="to-b"
	contentStart={true}
>
	<PageHeader
		title="Events"
		description="Academic events, professional networking, technical workshops, and social gatherings."
	/>
	<ul
		class="mb-8 flex w-full max-w-7xl flex-wrap gap-2"
		role="tablist"
		aria-label="Filter events by category"
	>
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

	<EventTabsContent category={group} {events} />
</Section>
