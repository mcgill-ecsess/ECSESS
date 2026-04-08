<script lang="ts">
	import EventBlock from 'components/event/EventBlock.svelte';
	import EventDialog from 'components/event/EventDialog.svelte';
	import { type EventPost, type EventCategory, EventLinkKind, type LinkType } from '$lib/schemas';

	let { category, events } = $props<{
		category: EventCategory;
		events: EventPost[];
	}>();

	// ─── Dialog state ────────────────────────────────────────────────
	let dialogOpen = $state(false);
	let selectedEvent = $state<EventPost | null>(null);

	function openDialog(event: EventPost) {
		selectedEvent = event;
		dialogOpen = true;
	}

	function closeDialog() {
		dialogOpen = false;
	}

	// ─── Date helpers ────────────────────────────────────────────────
	const parseEventDate = (dateString: string): Date => {
		const parsed = new Date(dateString);
		return isNaN(parsed.getTime()) ? new Date() : parsed;
	};

	const formatEventDate = (dateString: string): string => {
		const date = parseEventDate(dateString);
		const isMidnight = date.getUTCHours() === 0 && date.getUTCMinutes() === 0;
		if (isMidnight) {
			return date.toLocaleDateString('en-US', {
				weekday: 'short',
				year: 'numeric',
				month: 'short',
				day: 'numeric',
				timeZone: 'UTC'
			});
		}
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});
	};

	const isPast = (dateString: string): boolean => {
		const eventDate = parseEventDate(dateString);
		return new Date() > new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
	};

	const getLink = (e: EventPost, type: EventLinkKind): LinkType[] | null => {
		let generalLinks: LinkType[] = [];
		for (const link of e.links ?? []) {
			if (
				type === EventLinkKind.GENERAL &&
				link.kind === EventLinkKind.GENERAL &&
				link.url !== ''
			) {
				generalLinks.push(link);
				if (generalLinks.length >= 4) break;
			} else if (link.kind === type && link.url !== '') {
				return [link];
			}
		}
		return generalLinks.length > 0 ? generalLinks : null;
	};

	// ─── CSS-class filtering: all events stay mounted, only visibility changes ──
	// This avoids grid reflow and re-mount on every filter click.
	const isVisible = (e: EventPost): boolean => {
		if (category === 'allEvents') return true;
		const c: unknown = e.category ?? [];
		return Array.isArray(c) ? c.includes(category) : (c as string) === category;
	};

	// Sorted lists (all events, pre-sorted, never filtered out of DOM)
	const allEvents = $derived(
		[...(events ?? [])].sort((a, b) => {
			const aIsPast = isPast(a.date);
			const bIsPast = isPast(b.date);
			if (aIsPast !== bIsPast) return aIsPast ? 1 : -1;
			if (!aIsPast) return parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime();
			return parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime();
		})
	);

	const upcomingEvents = $derived(allEvents.filter((e) => !isPast(e.date)));
	const pastEvents = $derived(allEvents.filter((e) => isPast(e.date)));

	const hasVisibleUpcoming = $derived(upcomingEvents.some(isVisible));
	const hasVisiblePast = $derived(pastEvents.some(isVisible));
	const hasAnyVisible = $derived(hasVisibleUpcoming || hasVisiblePast);
</script>

<div class="w-full max-w-7xl py-8">
	<!-- Upcoming Events -->
	{#if upcomingEvents.length > 0}
		<section class="mb-10 transition-all duration-300" class:hidden={!hasVisibleUpcoming}>
			<div class="mb-5 flex items-center gap-3">
				<span class="bg-ecsess-800 h-px flex-1"></span>
				<h2 class="text-ecsess-400 text-[10px] font-bold tracking-[0.2em] uppercase">Upcoming</h2>
				<span class="bg-ecsess-800 h-px flex-1"></span>
			</div>

			<!-- Grid: all upcoming events rendered; hidden class toggled by CSS only -->
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

	<!-- Past Events -->
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

	<!-- Empty state -->
	{#if !hasAnyVisible}
		<div class="flex min-h-[40vh] items-center justify-center">
			<div class="text-center">
				<p class="text-ecsess-400 text-sm font-semibold">No events in this category yet</p>
				<p class="text-ecsess-600 mt-1 text-xs">Check back soon for updates!</p>
			</div>
		</div>
	{/if}
</div>

<!-- Single shared dialog — avoids mounting/unmounting per card -->
{#if selectedEvent}
	<EventDialog
		open={dialogOpen}
		eventTitle={selectedEvent.name}
		date={formatEventDate(selectedEvent.date)}
		location={selectedEvent.location}
		eventDescription={selectedEvent.description}
		thumbnail={selectedEvent.thumbnail}
		registrationLink={getLink(selectedEvent, EventLinkKind.REGISTRATION)}
		paymentLink={getLink(selectedEvent, EventLinkKind.PAYMENT)}
		generalLink={getLink(selectedEvent, EventLinkKind.GENERAL)}
		eventCategory={selectedEvent.category}
		isPastEvent={isPast(selectedEvent.date)}
		onclose={closeDialog}
	/>
{/if}
