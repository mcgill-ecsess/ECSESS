<script lang="ts">
	import type { LinkType } from '#lib/schemas.ts';
	import type { InputValue } from '@portabletext/svelte';
	import { CalendarDays, Clock, MapPin, Eye } from '@lucide/svelte';
	import { isSameDayEvent } from '#lib/events.js';

	interface Props {
		eventTitle: string;
		date: string;
		time?: string;
		from?: string;
		to?: string;
		location?: string;
		eventDescription?: InputValue;
		thumbnail?: string;
		registrationLink?: LinkType[] | null;
		paymentLink?: LinkType[] | null;
		generalLink?: LinkType[] | null;
		eventCategory?: string[];
		isPastEvent?: boolean;
		onopen?: () => void;
	}

	let {
		eventTitle,
		date,
		time,
		from,
		to,
		location,
		thumbnail,
		eventCategory,
		isPastEvent = false,
		onopen
	}: Props = $props();

	const sameDay = $derived(isSameDayEvent(from, to));

	const getDefaultImage = (category?: string[]): string => {
		if (!category || category.length === 0) return '/ECSESS.png';
		const cat = Array.isArray(category) ? category[0] : category;
		switch (cat) {
			case 'social':
				return '/Social.jpg';
			case 'technical':
				return '/Technical.jpg';
			case 'professional':
				return '/Professional.jpg';
			case 'academic':
				return '/Academic.jpg';
			default:
				return '/ECSESS.png';
		}
	};

	const imageSrc = $derived(thumbnail || getDefaultImage(eventCategory));

	const categoryLabel = $derived(
		eventCategory && eventCategory.length > 0
			? Array.isArray(eventCategory)
				? eventCategory
				: [eventCategory]
			: []
	);
</script>

<!-- Post tile -->
<div
	class="group flex cursor-pointer flex-col"
	class:opacity-55={isPastEvent}
	onclick={onopen}
	role="button"
	tabindex="0"
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onopen?.())}
	aria-label="View {eventTitle} details"
	data-component="EventBlock"
>
	<!-- Poster image — 4:5 portrait -->
	<div class="relative w-full overflow-hidden rounded-md" style="aspect-ratio: 4/5;">
		<img
			src={imageSrc}
			alt={eventTitle}
			class="absolute inset-0 h-full w-full object-cover transition-[filter] duration-300"
			class:grayscale={isPastEvent}
		/>

		<!-- Hover overlay -->
		<div
			class="absolute inset-0 flex items-center justify-center bg-ecsess-950/0 transition-colors duration-200 group-hover:bg-ecsess-950/50"
		>
			<Eye
				class="h-7 w-7 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				strokeWidth={1.5}
			/>
		</div>

		<!-- Category badges -->
		{#if categoryLabel.length > 0}
			<div class="absolute top-2 left-2 flex flex-wrap gap-1">
				{#each categoryLabel as cat (cat)}
					<span
						class="rounded bg-ecsess-900/80 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-ecsess-300 uppercase backdrop-blur-sm"
					>
						{cat}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Post meta below image -->
	<div class="pt-2 text-left">
		<h2 class="mb-1 line-clamp-2 text-[11px] leading-snug font-bold text-balance text-ecsess-50">
			{eventTitle}
		</h2>
		<div class="flex flex-col gap-0.5 text-sm text-ecsess-200">
			<span class="flex items-start gap-1.5">
				<CalendarDays class="mt-0.5 h-3.5 w-3.5 shrink-0 text-ecsess-400" strokeWidth={2} />
				<span class="min-w-0 leading-snug text-pretty">
					{date}
					{#if time && !sameDay}
						<br />{time}
					{/if}
				</span>
			</span>
			{#if time && sameDay}
				<span class="flex items-start gap-1.5">
					<Clock class="mt-0.5 h-3.5 w-3.5 shrink-0 text-ecsess-400" strokeWidth={2} />
					<span class="min-w-0 leading-snug text-pretty">{time}</span>
				</span>
			{/if}
			<span class="flex items-start gap-1.5">
				<MapPin class="mt-0.5 h-3.5 w-3.5 shrink-0 text-ecsess-400" strokeWidth={2} />
				<span class="min-w-0 leading-snug">{location ?? 'TBA'}</span>
			</span>
		</div>
	</div>
</div>
