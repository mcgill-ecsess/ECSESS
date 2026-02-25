<script lang="ts">
	import type { LinkType } from '$lib/schemas';
	import type { InputValue } from '@portabletext/svelte';
	import { X } from '@lucide/svelte';
	import { tick } from 'svelte';
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

	let showPopup = $state(false);
	let modalRef = $state<HTMLDivElement | null>(null);

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

	const openPopup = () => {
		showPopup = true;
	};

	const closePopup = () => {
		showPopup = false;
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openPopup();
		}
	};

	const onBackdropKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') closePopup();
	};

	$effect(() => {
		if (showPopup) {
			document.body.style.overflow = 'hidden';
			tick().then(() => modalRef?.focus());
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<div class="group relative flex h-full w-full flex-col">
	<div
		class="border-ecsess-650/70 bg-ecsess-900 hover:border-ecsess-350 focus-within:ring-ecsess-300 focus-within:ring-offset-ecsess-900 hover:shadow-ecsess-300/25 hover:ring-ecsess-300/80 hover:ring-offset-ecsess-900 relative mx-auto flex h-full w-full max-w-80 cursor-pointer flex-col overflow-hidden rounded-2xl border text-left shadow-xl transition-all duration-300 ease-out focus-within:ring-2 focus-within:ring-offset-2 hover:-translate-y-1 hover:shadow-2xl hover:ring-2 hover:ring-offset-2"
		role="button"
		tabindex="0"
		onclick={openPopup}
		onkeydown={handleKeyDown}
		aria-label="Open event details"
	>
		<div class="relative">
			<EventImageHeader {eventTitle} {thumbnail} {eventCategory} />
			{#if eventCategory && eventCategory.length > 0}
				<div class="pointer-events-none absolute top-2.5 right-2.5 z-10 flex flex-wrap gap-1.5">
					{#each eventCategory as category}
						<span
							class="bg-ecsess-500/90 rounded-full px-2.5 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm"
						>
							{category}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex flex-1 flex-col p-3 md:p-4">
			<EventInfoGrid {date} {location} compact />
		</div>
	</div>

	<div
		class="ring-ecsess-400/80 ring-offset-ecsess-900 animate-pulse-ring pointer-events-none absolute inset-0 mx-auto w-full max-w-80 rounded-2xl ring-2 ring-offset-2 sm:hidden"
		aria-hidden="true"
	></div>

	{#if showPopup}
		<div
			bind:this={modalRef}
			tabindex="-1"
			class="focus-visible:ring-ecsess-400 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-inset"
			role="dialog"
			aria-modal="true"
			aria-labelledby="event-popup-title"
			onclick={(e) => e.target === e.currentTarget && closePopup()}
			onkeydown={onBackdropKeydown}
		>
			<div
				class="relative my-auto flex w-full max-w-2xl flex-col items-center px-2 md:max-w-6xl md:px-4"
			>
				<div
					class="border-ecsess-650/70 bg-ecsess-900 text-ecsess-100 relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border shadow-2xl md:max-h-[90vh] md:flex-row"
					role="article"
				>
					<!-- Close button with its own breathing room -->
					<div class="flex h-12 shrink-0 items-start justify-end px-3 pt-3 md:hidden">
						<button
							type="button"
							onclick={closePopup}
							class="bg-ecsess-650 text-ecsess-50 hover:bg-ecsess-550 focus:ring-ecsess-500 focus:ring-offset-ecsess-900 flex size-8 items-center justify-center rounded-full transition hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
							aria-label="Close"
						>
							<X class="size-4" />
						</button>
					</div>

					<!-- Desktop-only absolute close button -->
					<button
						type="button"
						onclick={closePopup}
						class="bg-ecsess-650 text-ecsess-50 hover:bg-ecsess-550 focus:ring-ecsess-500 focus:ring-offset-ecsess-900 absolute top-3 right-3 z-10 hidden size-8 items-center justify-center rounded-full transition hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none md:flex"
						aria-label="Close"
					>
						<X class="size-5" />
					</button>

					<div
						class="border-ecsess-700/60 bg-ecsess-850 flex shrink-0 flex-col border-b md:w-[56%] md:border-r md:border-b-0"
					>
						<EventImageHeader {eventTitle} {thumbnail} {eventCategory} />
					</div>

					<div class="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 md:w-[44%] md:p-6">
						<h2 id="event-popup-title" class="sr-only">{eventTitle}</h2>
						<EventBadges {isPastEvent} {eventCategory} inline />
						<EventDescription {eventDescription} {generalLink} />
						<div class="border-ecsess-700/60 mt-4 border-t pt-4">
							<EventInfoGrid {date} {location} />
						</div>
						{#if !isPastEvent}
							<div class="mt-4">
								<EventActionButtons {registrationLink} {paymentLink} {addToCalendar} />
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
