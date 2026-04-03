<script lang="ts">
	import type { LinkType } from '$lib/schemas';
	import type { InputValue } from '@portabletext/svelte';
	import { CalendarDays, MapPin, FilePen, CalendarPlus, ExternalLink, ChevronDown } from '@lucide/svelte';
	import RichText from 'components/RichText.svelte';

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

	let expanded = $state(false);

	const getDefaultImage = (category?: string[]): string => {
		if (!category || category.length === 0) return '/ECSESS.png';
		const cat = Array.isArray(category) ? category[0] : category;
		switch (cat) {
			case 'social': return '/Social.jpg';
			case 'technical': return '/Technical.jpg';
			case 'professional': return '/Professional.jpg';
			case 'academic': return '/Academic.jpg';
			default: return '/ECSESS.png';
		}
	};

	const imageSrc = $derived(thumbnail || getDefaultImage(eventCategory));

	const categoryLabel = $derived(
		eventCategory && eventCategory.length > 0
			? (Array.isArray(eventCategory) ? eventCategory : [eventCategory])
			: []
	);

	const addToCalendar = () => {
		const eventDate = new Date(date);
		const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);
		const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
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
</script>

<!-- Post-style event entry -->
<article class="border-b border-ecsess-800/60 pb-10 last:border-0" class:opacity-70={isPastEvent}>
	<!-- Banner Image -->
	<div class="relative mb-5 overflow-hidden rounded-xl" style="aspect-ratio: 16/7;">
		<img
			src={imageSrc}
			alt={eventTitle}
			class="h-full w-full object-cover"
			class:grayscale={isPastEvent}
		/>
		<!-- Subtle bottom gradient for readability -->
		<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-ecsess-950/60 via-transparent to-transparent rounded-xl"></div>
	</div>

	<!-- Meta row: status + categories -->
	<div class="mb-3 flex flex-wrap items-center gap-2">
		{#if isPastEvent}
			<span class="inline-flex items-center gap-1.5 rounded-full border border-ecsess-700/60 bg-ecsess-900/60 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-ecsess-400">
				Past Event
			</span>
		{:else}
			<span class="inline-flex items-center gap-1.5 rounded-full bg-ecsess-500 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-ecsess-50">
				<span class="h-1.5 w-1.5 rounded-full bg-ecsess-100 animate-pulse-ring"></span>
				Upcoming
			</span>
		{/if}

		{#each categoryLabel as cat}
			<span class="rounded-full border border-ecsess-700/40 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-ecsess-300">
				{cat}
			</span>
		{/each}
	</div>

	<!-- Title -->
	<h2 class="mb-4 text-xl font-bold leading-snug text-ecsess-50 text-balance md:text-2xl">
		{eventTitle}
	</h2>

	<!-- Date & location inline row -->
	<div class="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ecsess-300">
		<span class="flex items-center gap-1.5">
			<CalendarDays class="h-4 w-4 text-ecsess-400" strokeWidth={2} />
			{date}
		</span>
		<span class="hidden text-ecsess-700 sm:inline">|</span>
		<span class="flex items-center gap-1.5">
			<MapPin class="h-4 w-4 text-ecsess-400" strokeWidth={2} />
			{location ?? 'TBA'}
		</span>
	</div>

	<!-- Action row -->
	<div class="flex flex-wrap items-center gap-3">
		{#if !isPastEvent && registrationLink}
			<a
				href={registrationLink[0].url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg bg-ecsess-500 px-5 py-2.5 text-sm font-semibold text-ecsess-50 transition-colors hover:bg-ecsess-600"
			>
				<FilePen class="h-4 w-4" strokeWidth={2.5} />
				Register
			</a>
		{/if}

		{#if !isPastEvent && paymentLink}
			<a
				href={paymentLink[0].url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-lg border border-ecsess-700 px-5 py-2.5 text-sm font-semibold text-ecsess-200 transition-colors hover:border-ecsess-500 hover:text-ecsess-50"
			>
				<ExternalLink class="h-4 w-4" strokeWidth={2.5} />
				Pay
			</a>
		{/if}

		{#if !isPastEvent}
			<button
				type="button"
				onclick={addToCalendar}
				class="inline-flex items-center gap-2 rounded-lg border border-ecsess-700 px-5 py-2.5 text-sm font-semibold text-ecsess-200 transition-colors hover:border-ecsess-500 hover:text-ecsess-50"
			>
				<CalendarPlus class="h-4 w-4" strokeWidth={2.5} />
				Add to Calendar
			</button>
		{/if}

		{#if generalLink && generalLink.length > 0}
			{#each generalLink.slice(0, 4) as link}
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-lg border border-ecsess-700 px-5 py-2.5 text-sm font-semibold text-ecsess-200 transition-colors hover:border-ecsess-500 hover:text-ecsess-50"
				>
					<ExternalLink class="h-4 w-4" strokeWidth={2.5} />
					{link.title}
				</a>
			{/each}
		{/if}

		<!-- Toggle description -->
		{#if eventDescription}
			<button
				type="button"
				onclick={() => (expanded = !expanded)}
				class="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ecsess-400 transition-colors hover:text-ecsess-200"
				aria-expanded={expanded}
			>
				{expanded ? 'Hide details' : 'Read more'}
				<ChevronDown
					class="h-4 w-4 transition-transform duration-300 {expanded ? 'rotate-180' : ''}"
					strokeWidth={2.5}
				/>
			</button>
		{/if}
	</div>

	<!-- Expandable description -->
	{#if expanded && eventDescription}
		<div class="mt-5 border-t border-ecsess-800/50 pt-5">
			<div class="typography text-ecsess-100 max-w-3xl">
				<RichText value={eventDescription} />
			</div>
		</div>
	{/if}
</article>
