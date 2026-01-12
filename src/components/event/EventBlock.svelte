<script lang="ts">
	import type { LinkType } from '$lib/schemas';
	import type { InputValue } from '@portabletext/svelte';
	import EventImageHeader from './EBComponents/EventImageHeader.svelte';
	import EventBadges from './EBComponents/EventBadges.svelte';
	import EventInfoGrid from './EBComponents/EventInfoGrid.svelte';
	import EventActionButtons from './EBComponents/EventActionButtons.svelte';
	import EventDescription from './EBComponents/EventDescription.svelte';

	let {
		eventTitle,
		date,
		location,
		eventDescription,
		thumbnail,
		registrationLink,
		paymentLink,
		generalLink,
		eventCategory,
		isPastEvent = false
	} = $props<{
		eventTitle: string;
		date: string;
		location?: string;
		eventDescription?: InputValue;
		thumbnail?: string;
		registrationLink?: LinkType[] | null;
		paymentLink?: LinkType[] | null;
		generalLink?: LinkType[] | null;
		eventCategory?: string[];
		isPastEvent?: boolean;
	}>();

	let showDescription = $state(false);

	const addToCalendar = () => {
		const eventDate = new Date(date);
		const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);

		const formatDate = (d: Date) => {
			return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
		};

		const icsContent = [
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'PRODID:-//ECSESS//Events//EN',
			'BEGIN:VEVENT',
			`DTSTART:${formatDate(eventDate)}`,
			`DTEND:${formatDate(endDate)}`,
			`SUMMARY:${eventTitle}`,
			`LOCATION:${location || 'TBA'}`,
			`DESCRIPTION:${eventTitle} - ECSESS Event`,
			'END:VEVENT',
			'END:VCALENDAR'
		].join('\n');

		const blob = new Blob([icsContent], { type: 'text/calendar' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${eventTitle.replace(/\s+/g, '_')}.ics`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const flipCard = () => {
		showDescription = !showDescription;
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			flipCard();
		}
	};
</script>

<div class="group relative flex h-full w-full flex-col rounded-2xl perspective-[1000px]">
	<div
		class="grid h-full w-full rounded-2xl text-center transition-transform duration-500 transform-3d {showDescription
			? 'transform-[rotateY(180deg)]'
			: 'transform-[rotateY(0)] hover:animate-wiggle'}"
	>
		<!-- Front Side -->
		<div
			class="bg-ecsess-950 col-start-1 row-start-1 flex h-full w-full transform-[rotateY(0)] cursor-pointer flex-col rounded-2xl transition-opacity duration-500 backface-hidden {showDescription
				? 'pointer-events-none opacity-0'
				: 'opacity-100'}"
			data-flip-side="front"
			role="button"
			tabindex="0"
			onclick={flipCard}
			onkeydown={handleKeyDown}
			aria-label="Flip event card to view description"
		>
			<EventImageHeader {eventTitle} {thumbnail} {eventCategory} />
			<EventBadges {isPastEvent} {eventCategory} />

			<EventInfoGrid {date} {location} />

			{#if !isPastEvent}
				<div class="pointer-events-auto relative z-30 flex-1 px-6 pt-0 pb-4">
					<EventActionButtons {registrationLink} {paymentLink} {addToCalendar} />
				</div>
			{/if}

			<div class="p-4 lg:hidden">
				<p class="text-ecsess-400 text-sm">Click to view more</p>
			</div>
		</div>

		<!-- Back Side -->
		<div
			class="bg-ecsess-950 col-start-1 row-start-1 flex h-full w-full transform-[rotateY(180deg)] cursor-pointer flex-col rounded-2xl transition-opacity duration-500 backface-hidden transform-3d {showDescription
				? 'opacity-100'
				: 'pointer-events-none opacity-0'}"
			data-flip-side="back"
			class:flipped={showDescription}
			role="button"
			tabindex="0"
			onclick={flipCard}
			onkeydown={handleKeyDown}
			aria-label="Flip event card back to front"
		>
			<EventDescription {eventTitle} {eventDescription} {generalLink} />
		</div>
	</div>
</div>


