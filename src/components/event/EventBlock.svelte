<script lang="ts">
	import type { LinkType } from '$lib/schemas';
	import type { InputValue } from '@portabletext/svelte';
	import { CalendarDays, MapPin, Eye } from '@lucide/svelte';

	let {
		eventTitle,
		date,
		location,
		thumbnail,
		eventCategory,
		isPastEvent = false,
		onopen
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
		onopen?: () => void;
	}>();

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
</script>

<!-- Post tile -->
<article
	class="group flex cursor-pointer flex-col"
	class:opacity-55={isPastEvent}
	onclick={onopen}
	role="button"
	tabindex="0"
	onkeydown={(e) => e.key === 'Enter' && onopen?.()}
	aria-label="View {eventTitle} details"
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
		<div class="absolute inset-0 flex items-center justify-center bg-ecsess-950/0 transition-colors duration-200 group-hover:bg-ecsess-950/50">
			<Eye class="h-7 w-7 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" strokeWidth={1.5} />
		</div>

		<!-- Status + category badges -->
		<div class="absolute top-2 left-2 flex flex-wrap gap-1">
			{#if isPastEvent}
				<span class="rounded bg-ecsess-950/75 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-ecsess-400 backdrop-blur-sm">
					Past
				</span>
			{:else}
				<span class="inline-flex items-center gap-1 rounded bg-ecsess-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
					<span class="h-1 w-1 rounded-full bg-white animate-pulse"></span>
					Upcoming
				</span>
			{/if}
			{#each categoryLabel as cat}
				<span class="rounded bg-ecsess-900/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-ecsess-300 backdrop-blur-sm">
					{cat}
				</span>
			{/each}
		</div>
	</div>

	<!-- Post meta below image -->
	<div class="pt-2">
		<h2 class="text-[11px] font-bold leading-snug text-ecsess-50 text-balance mb-1 line-clamp-2">
			{eventTitle}
		</h2>
		<div class="flex flex-col gap-0.5 text-[10px] text-ecsess-400">
			<span class="flex items-center gap-1">
				<CalendarDays class="h-2.5 w-2.5 shrink-0 text-ecsess-500" strokeWidth={2} />
				{date}
			</span>
			<span class="flex items-center gap-1">
				<MapPin class="h-2.5 w-2.5 shrink-0 text-ecsess-500" strokeWidth={2} />
				{location ?? 'TBA'}
			</span>
		</div>
	</div>
</article>
