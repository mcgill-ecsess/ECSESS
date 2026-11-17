<script lang="ts">
	import EventBlock from './EventBlock.svelte';
	import EventDialog from './EventDialog.svelte';
	import { eventMatchesCategory, getEventStart, isPastEvent, parseEventDate } from '#lib/events.js';
	import { type EventPost, type EventCategory } from '#lib/schemas.ts';

	let { category, events }: { category: EventCategory; events: EventPost[] } = $props();

	let dialogOpen = $state(false);
	let selectedEvent = $state<EventPost | null>(null);

	function openDialog(event: EventPost) {
		selectedEvent = event;
		dialogOpen = true;
	}

	function closeDialog() {
		dialogOpen = false;
	}

	const isVisible = (event: EventPost): boolean => eventMatchesCategory(event, category);

	const allEvents = $derived(
		[...(events ?? [])].sort((a, b) => {
			const aIsPast = isPastEvent(a.from, a.to);
			const bIsPast = isPastEvent(b.from, b.to);
			if (aIsPast !== bIsPast) return aIsPast ? 1 : -1;
			const aStart = parseEventDate(getEventStart(a) ?? '').getTime();
			const bStart = parseEventDate(getEventStart(b) ?? '').getTime();
			return aIsPast ? bStart - aStart : aStart - bStart;
		})
	);

	const upcomingEvents = $derived(allEvents.filter((e) => !isPastEvent(e.from, e.to)));
	const pastEvents = $derived(allEvents.filter((e) => isPastEvent(e.from, e.to)));

	const hasVisibleUpcoming = $derived(upcomingEvents.some(isVisible));
	const hasVisiblePast = $derived(pastEvents.some(isVisible));
	const hasAnyVisible = $derived(hasVisibleUpcoming || hasVisiblePast);
</script>

<div class="w-full max-w-7xl py-8" id="EventTabsContent" data-component="EventTabsContent">
	{#if upcomingEvents.length > 0}
		<section class="mb-10 transition-all duration-300" class:hidden={!hasVisibleUpcoming}>
			<div class="mb-5 flex items-center gap-3">
				<span class="h-px flex-1 bg-ecsess-800"></span>
				<h2 class="text-[10px] font-bold tracking-[0.2em] text-ecsess-200 uppercase">Upcoming</h2>
				<span class="h-px flex-1 bg-ecsess-800"></span>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{#each upcomingEvents as e (e._id ?? e.name)}
					<div class="transition-opacity duration-150" class:hidden={!isVisible(e)}>
						<EventBlock {e} onopen={() => openDialog(e)} />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if pastEvents.length > 0}
		<section class="transition-all duration-300" class:hidden={!hasVisiblePast}>
			<div class="mb-5 flex items-center gap-3">
				<span class="h-px flex-1 bg-ecsess-800"></span>
				<h2 class="text-[10px] font-bold tracking-[0.2em] text-ecsess-300 uppercase">
					Past Events
				</h2>
				<span class="h-px flex-1 bg-ecsess-800"></span>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{#each pastEvents as e (e._id ?? e.name)}
					<div class="transition-opacity duration-150" class:hidden={!isVisible(e)}>
						<EventBlock {e} onopen={() => openDialog(e)} />
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if !hasAnyVisible}
		<div class="flex min-h-[40vh] items-center justify-center">
			<div class="text-center">
				<p class="text-sm font-semibold text-ecsess-200">No events in this category yet</p>
				<p class="mt-1 text-xs text-ecsess-300">Check back soon for updates!</p>
			</div>
		</div>
	{/if}
</div>

{#if selectedEvent}
	<EventDialog open={dialogOpen} e={selectedEvent} onclose={closeDialog} />
{/if}
