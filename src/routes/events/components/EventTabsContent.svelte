<script lang="ts">
	import EventBlock from './EventBlock.svelte';
	import EventDialog from './EventDialog.svelte';
	import {
		eventMatchesCategory,
		formatEventDate,
		getEventLink,
		isPastEvent,
		parseEventDate
	} from '$lib/events.js';
	import { type EventPost, type EventCategory, EventLinkKind } from '$lib/schemas';

	let { category, events } = $props<{
		category: EventCategory;
		events: EventPost[];
	}>();

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
			const aIsPast = isPastEvent(a.date);
			const bIsPast = isPastEvent(b.date);
			if (aIsPast !== bIsPast) return aIsPast ? 1 : -1;
			if (!aIsPast) return parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime();
			return parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime();
		})
	);

	const upcomingEvents = $derived(allEvents.filter((e) => !isPastEvent(e.date)));
	const pastEvents = $derived(allEvents.filter((e) => isPastEvent(e.date)));

	const hasVisibleUpcoming = $derived(upcomingEvents.some(isVisible));
	const hasVisiblePast = $derived(pastEvents.some(isVisible));
	const hasAnyVisible = $derived(hasVisibleUpcoming || hasVisiblePast);
</script>

<div class="w-full max-w-7xl py-8">
	{#if upcomingEvents.length > 0}
		<section class="mb-10 transition-all duration-300" class:hidden={!hasVisibleUpcoming}>
			<div class="mb-5 flex items-center gap-3">
				<span class="bg-ecsess-800 h-px flex-1"></span>
				<h2 class="text-ecsess-400 text-[10px] font-bold tracking-[0.2em] uppercase">Upcoming</h2>
				<span class="bg-ecsess-800 h-px flex-1"></span>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{#each upcomingEvents as e (e._id ?? e.name)}
					<div class="transition-opacity duration-150" class:hidden={!isVisible(e)}>
						<EventBlock
							eventTitle={e.name}
							date={formatEventDate(e.date)}
							location={e.location}
							thumbnail={e.thumbnail}
							eventCategory={e.category}
							isPastEvent={false}
							onopen={() => openDialog(e)}
						/>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if pastEvents.length > 0}
		<section class="transition-all duration-300" class:hidden={!hasVisiblePast}>
			<div class="mb-5 flex items-center gap-3">
				<span class="bg-ecsess-800 h-px flex-1"></span>
				<h2 class="text-ecsess-600 text-[10px] font-bold tracking-[0.2em] uppercase">
					Past Events
				</h2>
				<span class="bg-ecsess-800 h-px flex-1"></span>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
				{#each pastEvents as e (e._id ?? e.name)}
					<div class="transition-opacity duration-150" class:hidden={!isVisible(e)}>
						<EventBlock
							eventTitle={e.name}
							date={formatEventDate(e.date)}
							location={e.location}
							thumbnail={e.thumbnail}
							eventCategory={e.category}
							isPastEvent={true}
							onopen={() => openDialog(e)}
						/>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if !hasAnyVisible}
		<div class="flex min-h-[40vh] items-center justify-center">
			<div class="text-center">
				<p class="text-ecsess-400 text-sm font-semibold">No events in this category yet</p>
				<p class="text-ecsess-600 mt-1 text-xs">Check back soon for updates!</p>
			</div>
		</div>
	{/if}
</div>

{#if selectedEvent}
	<EventDialog
		open={dialogOpen}
		eventTitle={selectedEvent.name}
		date={formatEventDate(selectedEvent.date)}
		location={selectedEvent.location}
		eventDescription={selectedEvent.description}
		thumbnail={selectedEvent.thumbnail}
		registrationLink={getEventLink(selectedEvent, EventLinkKind.REGISTRATION)}
		paymentLink={getEventLink(selectedEvent, EventLinkKind.PAYMENT)}
		generalLink={getEventLink(selectedEvent, EventLinkKind.GENERAL)}
		eventCategory={selectedEvent.category}
		isPastEvent={isPastEvent(selectedEvent.date)}
		onclose={closeDialog}
	/>
{/if}
