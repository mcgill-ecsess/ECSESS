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
		// Try to parse various date formats
		const parsed = new Date(dateString);
		return isNaN(parsed.getTime()) ? new Date() : parsed;
	};

	const formatEventDate = (dateString: string): string => {
		const date = parseEventDate(dateString);

		// Check if the time is midnight (00:00) which likely means no time was specified
		const isMidnight = date.getUTCHours() === 0 && date.getUTCMinutes() === 0;

		if (isMidnight) {
			// Format without time - just the date
			return date.toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				timeZone: 'UTC'
			});
		} else {
			// Format with time
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
		// Add 1 day to the event date
		const now = new Date();
		const eventDatePlusOneDay = new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);

		return now > eventDatePlusOneDay;
		// return eventDate < now;
	};

	const filtered = $derived((events ?? []).filter(matchCategory));

	const upcomingEvents = $derived(
		filtered
			.filter((e: { date: string }) => !isPastEvent(e.date))
			.sort(
				(a: { date: string }, b: { date: string }) =>
					parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime()
			)
	);

	const finishedEvents = $derived(
		filtered
			.filter((e: { date: string }) => isPastEvent(e.date))
			.sort(
				(a: { date: string }, b: { date: string }) =>
					parseEventDate(b.date).getTime() - parseEventDate(a.date).getTime()
			)
	);

	const getPaymentLink = (e: EventPost, type: EventLinkKind): LinkType[] | null => {
		let generalLinks: LinkType[] = [];
		for (const link of e.links ?? []) {
			if (type == EventLinkKind.GENERAL && link.kind === EventLinkKind.GENERAL && link.url !== '') {
				generalLinks.push(link);
			} else if (link.kind === type && link.url !== '') {
				return [link];
			}
		}
		return generalLinks.length > 0 ? generalLinks : null;
	};
</script>

<div>
	<div class="space-y-12 px-4 py-8 lg:px-8">
		<!-- Upcoming Events -->
		{#if upcomingEvents.length > 0}
			<section>
				<div class="mb-6 flex items-center gap-3">
					<div class="bg-ecsess-200 h-1 w-16 rounded-full"></div>
					<h2 class="text-ecsess-200 text-3xl font-bold">Upcoming Events</h2>
				</div>
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each upcomingEvents as e (e._id ?? e.name)}
						<EventBlock
							eventTitle={e.name}
							date={formatEventDate(e.date)}
							location={e.location}
							eventDescription={e.description}
							thumbnail={e.thumbnail}
							registrationLink={getPaymentLink(e, EventLinkKind.REGISTRATION)}
							paymentLink={getPaymentLink(e, EventLinkKind.PAYMENT)}
							generalLink={getPaymentLink(e, EventLinkKind.GENERAL)}
							eventCategory={e.category}
							isPastEvent={false}
						/>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Finished Events -->
		{#if finishedEvents.length > 0}
			<section>
				<div class="mb-6 flex items-center gap-3">
					<div class="bg-ecsess-400 h-1 w-16 rounded-full"></div>
					<h2 class="text-ecsess-400 text-3xl font-bold">Past Events</h2>
				</div>
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each finishedEvents as e (e._id ?? e.name)}
						<EventBlock
							eventTitle={e.name}
							date={formatEventDate(e.date)}
							location={e.location}
							eventDescription={e.description}
							thumbnail={e.thumbnail}
							registrationLink={getPaymentLink(e, EventLinkKind.REGISTRATION)}
							paymentLink={getPaymentLink(e, EventLinkKind.PAYMENT)}
							generalLink={getPaymentLink(e, EventLinkKind.GENERAL)}
							eventCategory={e.category}
							isPastEvent={true}
						/>
					{/each}
				</div>
			</section>
		{/if}

		<!-- No events message -->
		{#if upcomingEvents.length === 0 && finishedEvents.length === 0}
			<div class="flex min-h-[400px] items-center justify-center">
				<div class="text-center">
					<p class="text-xl font-semibold text-gray-600">No events in this category yet</p>
					<p class="mt-2 text-gray-500">Check back soon for updates!</p>
				</div>
			</div>
		{/if}
	</div>
</div>
