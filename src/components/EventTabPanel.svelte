<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import EventBlock from 'components/EventBlock.svelte';
	import type { EventPost } from '$lib/schemas';

	type Category = 'allEvents' | 'academic' | 'professional' | 'social' | 'technical';

	let { value, category, events } = $props<{
		value: Category; 
		category: Category;
		events: EventPost[];
	}>();

	const matchCategory = (e: EventPost): boolean => {
		if (category === 'allEvents') return true;
		const c: unknown = e.category ?? [];
		return Array.isArray(c) ? c.includes(category) : (c as string) === category;
	};

	const filtered = $derived((events ?? []).filter(matchCategory));
</script>

<Tabs.Panel {value}>
	<div class="flex flex-wrap gap-4 p-4">
		{#each filtered as e (e._id ?? e.name)}
			<EventBlock
				eventTitle={e.name}
				date={e.date}
				location={e.location}
				eventDescription={e.description}
				thumbnail={e.thumbnail}
				registrationLink={e.reglink}
				paymentLink={e.paylink}
				eventCategory={e.category}
			/>
		{/each}
	</div>
</Tabs.Panel>
