<script lang="ts">
	import EventBlock from 'components/event/EventBlock.svelte';
	import { type EventPost, type EventCategory, EventLinkKind, type LinkType } from '$lib/schemas';

	let { category, events } = $props<{
		category: EventCategory;
		events: EventPost[];
	}>();

	const matchCategory = (e: EventPost): boolean => {
		if (category === 'allEvents') return true;
		const c: unknown = e.category ?? [];
		return Array.isArray(c) ? c.includes(category) : (c as string) === category;
	};

	const parseEventDate = (dateString: string): Date => {
		const parsed = new Date(dateString);
		return isNaN(parsed.getTime()) ? new Date() : parsed;
	};

	const formatEventDate = (dateString: string): string => {
		const date = parseEventDate(dateString);
		const isMidnight = date.getUTCHours() === 0 && date.getUTCMinutes() === 0;

		if (isMidnight) {
			return date.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				timeZone: 'UTC'
			});
		} else {
			return date.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			});
		}
	};

	const isPastEvent = (dateString: string): boolean => {
		const eventDate = parseEventDate(dateString);
		const now = new Date();
		const eventDatePlusOneDay = new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
		return now > eventDatePlusOneDay;
	};

	const filtered = $derived((events ?? []).filter(matchCategory));

	const upcomingEvents = $derived(
		filtered
			.filter((e) => !isPastEvent(e.date))
			.sort((a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime())
	);

	const finishedEvents = $derived(
		filtered
			.filter((e) => isPastEvent(e.date))
			.sort((a, b) => parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime())
	);

	const getLink = (e: EventPost, type: EventLinkKind): LinkType[] | null => {
		let generalLinks: LinkType[] = [];
		for (const link of e.links ?? []) {
			if (type === EventLinkKind.GENERAL && link.kind === EventLinkKind.GENERAL && link.url !== '') {
				generalLinks.push(link);
				if (generalLinks.length >= 4) break;
			} else if (link.kind === type && link.url !== '') {
				return [link];
			}
		}
		return generalLinks.length > 0 ? generalLinks : null;
	};
</script>

<div class="w-full max-w-3xl py-10 text-left">
	<!-- Upcoming Events -->
	{#if upcomingEvents.length > 0}
		<section class="mb-12">
			<div class="mb-8 flex items-center gap-4">
				<span class="h-px flex-1 bg-ecsess-800/60"></span>
				<h2 class="text-xs font-bold uppercase tracking-[0.2em] text-ecsess-400">Upcoming</h2>
				<span class="h-px flex-1 bg-ecsess-800/60"></span>
			</div>

			<div class="space-y-10">
				{#each upcomingEvents as e (e._id ?? e.name)}
					<EventBlock
						eventTitle={e.name}
						date={formatEventDate(e.date)}
						location={e.location}
						eventDescription={e.description}
						thumbnail={e.thumbnail}
						registrationLink={getLink(e, EventLinkKind.REGISTRATION)}
						paymentLink={getLink(e, EventLinkKind.PAYMENT)}
						generalLink={getLink(e, EventLinkKind.GENERAL)}
						eventCategory={e.category}
						isPastEvent={false}
					/>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Past Events -->
	{#if finishedEvents.length > 0}
		<section>
			<div class="mb-8 flex items-center gap-4">
				<span class="h-px flex-1 bg-ecsess-800/60"></span>
				<h2 class="text-xs font-bold uppercase tracking-[0.2em] text-ecsess-600">Past Events</h2>
				<span class="h-px flex-1 bg-ecsess-800/60"></span>
			</div>

			<div class="space-y-10">
				{#each finishedEvents as e (e._id ?? e.name)}
					<EventBlock
						eventTitle={e.name}
						date={formatEventDate(e.date)}
						location={e.location}
						eventDescription={e.description}
						thumbnail={e.thumbnail}
						registrationLink={getLink(e, EventLinkKind.REGISTRATION)}
						paymentLink={getLink(e, EventLinkKind.PAYMENT)}
						generalLink={getLink(e, EventLinkKind.GENERAL)}
						eventCategory={e.category}
						isPastEvent={true}
					/>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Empty state -->
	{#if upcomingEvents.length === 0 && finishedEvents.length === 0}
		<div class="flex min-h-[40vh] items-center justify-center">
			<div class="text-center">
				<p class="text-lg font-semibold text-ecsess-400">No events in this category yet</p>
				<p class="mt-2 text-sm text-ecsess-600">Check back soon for updates!</p>
			</div>
		</div>
	{/if}
</div>
