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
		const a = document.createElement('a');
		a.href = url;
		a.download = `${eventTitle.replace(/\s+/g, '_')}.ics`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
</script>

<!-- Instagram-style post -->
<article class="flex flex-col" class:opacity-60={isPastEvent}>

	<!-- Poster image — 4:5 portrait, object-cover; non-standard sizes fill gracefully -->
	<div class="relative w-full overflow-hidden rounded-lg" style="aspect-ratio: 4/5;">
		<img
			src={imageSrc}
			alt={eventTitle}
			class="absolute inset-0 h-full w-full object-cover"
			class:grayscale={isPastEvent}
		/>
		<!-- Status badge — top-left overlay -->
		<div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
			{#if isPastEvent}
				<span class="rounded-sm bg-ecsess-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ecsess-300 backdrop-blur-sm">
					Past
				</span>
			{:else}
				<span class="inline-flex items-center gap-1 rounded-sm bg-ecsess-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
					<span class="h-1.5 w-1.5 rounded-full bg-ecsess-100 animate-pulse-ring"></span>
					Upcoming
				</span>
			{/if}

			{#each categoryLabel as cat}
				<span class="rounded-sm bg-ecsess-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ecsess-200 backdrop-blur-sm">
					{cat}
				</span>
			{/each}
		</div>
	</div>

	<!-- Post body -->
	<div class="flex flex-1 flex-col gap-2 pt-3">

		<!-- Title -->
		<h2 class="text-sm font-bold leading-snug text-ecsess-50 text-balance">
			{eventTitle}
		</h2>

		<!-- Date & location -->
		<div class="flex flex-col gap-0.5 text-xs text-ecsess-300">
			<span class="flex items-center gap-1">
				<CalendarDays class="h-3 w-3 shrink-0 text-ecsess-400" strokeWidth={2} />
				{date}
			</span>
			<span class="flex items-center gap-1">
				<MapPin class="h-3 w-3 shrink-0 text-ecsess-400" strokeWidth={2} />
				{location ?? 'TBA'}
			</span>
		</div>

		<!-- Action buttons -->
		<div class="flex flex-wrap items-center gap-1.5 pt-1">
			{#if !isPastEvent && registrationLink}
				<a
					href={registrationLink[0].url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 rounded bg-ecsess-500 px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-ecsess-400"
				>
					<FilePen class="h-3 w-3" strokeWidth={2.5} />
					Register
				</a>
			{/if}

			{#if !isPastEvent && paymentLink}
				<a
					href={paymentLink[0].url}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 rounded border border-ecsess-600 px-2.5 py-1 text-xs font-semibold text-ecsess-200 transition-colors hover:border-ecsess-400 hover:text-ecsess-50"
				>
					<ExternalLink class="h-3 w-3" strokeWidth={2.5} />
					Pay
				</a>
			{/if}

			{#if !isPastEvent}
				<button
					type="button"
					onclick={addToCalendar}
					class="inline-flex items-center gap-1 rounded border border-ecsess-600 px-2.5 py-1 text-xs font-semibold text-ecsess-200 transition-colors hover:border-ecsess-400 hover:text-ecsess-50"
				>
					<CalendarPlus class="h-3 w-3" strokeWidth={2.5} />
					Calendar
				</button>
			{/if}

			{#if generalLink && generalLink.length > 0}
				{#each generalLink.slice(0, 2) as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 rounded border border-ecsess-600 px-2.5 py-1 text-xs font-semibold text-ecsess-200 transition-colors hover:border-ecsess-400 hover:text-ecsess-50"
					>
						<ExternalLink class="h-3 w-3" strokeWidth={2.5} />
						{link.title}
					</a>
				{/each}
			{/if}

			<!-- Toggle description -->
			{#if eventDescription}
				<button
					type="button"
					onclick={() => (expanded = !expanded)}
					class="ml-auto inline-flex items-center gap-0.5 text-xs font-semibold text-ecsess-400 transition-colors hover:text-ecsess-200"
					aria-expanded={expanded}
				>
					{expanded ? 'Less' : 'More'}
					<ChevronDown
						class="h-3.5 w-3.5 transition-transform duration-200 {expanded ? 'rotate-180' : ''}"
						strokeWidth={2.5}
					/>
				</button>
			{/if}
		</div>

		<!-- Expandable description -->
		{#if expanded && eventDescription}
			<div class="mt-2 border-t border-ecsess-800 pt-3">
				<div class="typography text-ecsess-100 text-xs">
					<RichText value={eventDescription} />
				</div>
			</div>
		{/if}
	</div>
</article>
