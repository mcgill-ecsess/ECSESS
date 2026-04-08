<script lang="ts">
	import type { LinkType } from '$lib/schemas';
	import type { InputValue } from '@portabletext/svelte';
	import { CalendarDays, MapPin, FilePen, CalendarPlus, ExternalLink, X } from '@lucide/svelte';
	import RichText from 'components/RichText.svelte';

	let {
		open = false,
		eventTitle = '',
		date = '',
		location,
		eventDescription,
		thumbnail,
		registrationLink,
		paymentLink,
		generalLink,
		eventCategory,
		isPastEvent = false,
		onclose
	} = $props<{
		open: boolean;
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
		onclose: () => void;
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

	const handleBackdropClick = (e: MouseEvent) => {
		if ((e.target as HTMLElement).dataset.backdrop) onclose();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') onclose();
	};
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop + dialog -->
<div
	data-backdrop="true"
	onclick={handleBackdropClick}
	role="dialog"
	aria-modal="true"
	aria-label={eventTitle}
	class="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200
		{open ? 'pointer-events-auto bg-ecsess-950/80 backdrop-blur-sm' : 'pointer-events-none bg-transparent backdrop-blur-none opacity-0'}"
>
	<div
		class="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-ecsess-800 bg-ecsess-950
			shadow-2xl transition-all duration-200
			{open ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}"
		style="max-height: 90dvh;"
	>
		<!-- Close button -->
		<button
			type="button"
			onclick={onclose}
			class="absolute right-3 top-3 z-10 rounded-full bg-ecsess-950/70 p-1.5 text-ecsess-400 backdrop-blur-sm transition-colors hover:bg-ecsess-800 hover:text-ecsess-50"
			aria-label="Close dialog"
		>
			<X class="h-4 w-4" strokeWidth={2} />
		</button>

		<!-- Scrollable content -->
		<div class="overflow-y-auto">
			<!-- Header image — 16:7 landscape for dialog -->
			<div class="relative w-full" style="aspect-ratio: 16/7;">
				<img
					src={imageSrc}
					alt={eventTitle}
					class="absolute inset-0 h-full w-full object-cover"
					class:grayscale={isPastEvent}
				/>
				<!-- Badges over image -->
				<div class="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
					{#if isPastEvent}
						<span class="rounded bg-ecsess-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ecsess-300 backdrop-blur-sm">
							Past
						</span>
					{:else}
						<span class="inline-flex items-center gap-1 rounded bg-ecsess-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
							<span class="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
							Upcoming
						</span>
					{/if}
					{#each categoryLabel as cat}
						<span class="rounded bg-ecsess-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-ecsess-200 backdrop-blur-sm">
							{cat}
						</span>
					{/each}
				</div>
			</div>

			<!-- Dialog body -->
			<div class="flex flex-col gap-4 p-5">
				<!-- Title -->
				<h2 class="text-xl font-bold leading-snug text-ecsess-50 text-balance">
					{eventTitle}
				</h2>

				<!-- Meta -->
				<div class="flex flex-col gap-1.5 text-sm text-ecsess-300">
					<span class="flex items-center gap-2">
						<CalendarDays class="h-4 w-4 shrink-0 text-ecsess-500" strokeWidth={2} />
						{date}
					</span>
					<span class="flex items-center gap-2">
						<MapPin class="h-4 w-4 shrink-0 text-ecsess-500" strokeWidth={2} />
						{location ?? 'TBA'}
					</span>
				</div>

				<!-- Description -->
				{#if eventDescription}
					<div class="border-t border-ecsess-800 pt-4">
						<div class="typography text-sm text-ecsess-200">
							<RichText value={eventDescription} />
						</div>
					</div>
				{/if}

				<!-- Action buttons -->
				{#if !isPastEvent || generalLink}
					<div class="flex flex-wrap gap-2 border-t border-ecsess-800 pt-4">
						{#if !isPastEvent && registrationLink}
							<a
								href={registrationLink[0].url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 rounded-md bg-ecsess-500 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-ecsess-400"
							>
								<FilePen class="h-3.5 w-3.5" strokeWidth={2.5} />
								Register
							</a>
						{/if}

						{#if !isPastEvent && paymentLink}
							<a
								href={paymentLink[0].url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 rounded-md border border-ecsess-600 px-3.5 py-2 text-sm font-semibold text-ecsess-200 transition-colors hover:border-ecsess-400 hover:text-ecsess-50"
							>
								<ExternalLink class="h-3.5 w-3.5" strokeWidth={2.5} />
								Pay
							</a>
						{/if}

						{#if !isPastEvent}
							<button
								type="button"
								onclick={addToCalendar}
								class="inline-flex items-center gap-1.5 rounded-md border border-ecsess-600 px-3.5 py-2 text-sm font-semibold text-ecsess-200 transition-colors hover:border-ecsess-400 hover:text-ecsess-50"
							>
								<CalendarPlus class="h-3.5 w-3.5" strokeWidth={2.5} />
								Add to Calendar
							</button>
						{/if}

						{#if generalLink}
							{#each generalLink.slice(0, 4) as link}
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 rounded-md border border-ecsess-600 px-3.5 py-2 text-sm font-semibold text-ecsess-200 transition-colors hover:border-ecsess-400 hover:text-ecsess-50"
								>
									<ExternalLink class="h-3.5 w-3.5" strokeWidth={2.5} />
									{link.title}
								</a>
							{/each}
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
