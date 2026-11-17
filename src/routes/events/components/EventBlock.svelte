<script lang="ts">
	import type { EventPost } from '#lib/schemas.ts';
	import { CalendarDays, Clock, MapPin, Eye } from '@lucide/svelte';
	import { formatEventCardWhen, isPastEvent, isSameDayEvent } from '#lib/events.js';

	interface Props {
		e: EventPost;
		onopen?: () => void;
	}

	let { e, onopen }: Props = $props();

	const when = $derived(formatEventCardWhen(e.from, e.to));
	const sameDay = $derived(isSameDayEvent(e.from, e.to));
	const past = $derived(isPastEvent(e.from, e.to));

	function defaultImage(category?: string[]): string {
		if (!category || category.length === 0) return '/ECSESS.png';
		switch (category[0]) {
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
	}

	const imageSrc = $derived(e.thumbnail || defaultImage(e.category));
	const categories = $derived(e.category ?? []);
</script>

<!-- Post tile -->
<div
	class="group flex cursor-pointer flex-col"
	class:opacity-55={past}
	onclick={onopen}
	role="button"
	tabindex="0"
	onkeydown={(ev) => (ev.key === 'Enter' || ev.key === ' ') && (ev.preventDefault(), onopen?.())}
	aria-label="View {e.name} details"
	data-component="EventBlock"
>
	<!-- Poster image — 4:5 portrait -->
	<div class="relative w-full overflow-hidden rounded-md" style="aspect-ratio: 4/5;">
		<img
			src={imageSrc}
			alt={e.name}
			class="absolute inset-0 h-full w-full object-cover transition-[filter] duration-300"
			class:grayscale={past}
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
		{#if categories.length > 0}
			<div class="absolute top-2 left-2 flex flex-wrap gap-1">
				{#each categories as cat (cat)}
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
			{e.name}
		</h2>
		<div class="flex flex-col gap-0.5 text-sm text-ecsess-200">
			<span class="flex items-start gap-1.5">
				<CalendarDays class="mt-0.5 h-3.5 w-3.5 shrink-0 text-ecsess-400" strokeWidth={2} />
				<span class="min-w-0 leading-snug text-pretty">
					{when.date}
					{#if when.time && !sameDay}
						<br />{when.time}
					{/if}
				</span>
			</span>
			{#if when.time && sameDay}
				<span class="flex items-start gap-1.5">
					<Clock class="mt-0.5 h-3.5 w-3.5 shrink-0 text-ecsess-400" strokeWidth={2} />
					<span class="min-w-0 leading-snug text-pretty">{when.time}</span>
				</span>
			{/if}
			<span class="flex items-start gap-1.5">
				<MapPin class="mt-0.5 h-3.5 w-3.5 shrink-0 text-ecsess-400" strokeWidth={2} />
				<span class="min-w-0 leading-snug">{e.location ?? 'TBA'}</span>
			</span>
		</div>
	</div>
</div>
