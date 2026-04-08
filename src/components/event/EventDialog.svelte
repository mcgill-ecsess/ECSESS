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
		{open
		? 'bg-ecsess-950/80 pointer-events-auto backdrop-blur-sm'
		: 'pointer-events-none bg-transparent opacity-0 backdrop-blur-none'}"
>
	<div
		class="border-ecsess-800 bg-ecsess-950 relative flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border
			shadow-2xl transition-all duration-200
			{open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'}"
		style="max-height: 90dvh;"
	>
		<!-- Close button -->
		<button
			type="button"
			onclick={onclose}
			class="bg-ecsess-950/70 text-ecsess-400 hover:bg-ecsess-800 hover:text-ecsess-50 absolute top-3 right-3 z-10 rounded-full p-1.5 backdrop-blur-sm transition-colors"
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
						<span
							class="bg-ecsess-950/80 text-ecsess-300 rounded px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm"
						>
							Past
						</span>
					{:else}
						<span
							class="bg-ecsess-500 inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase"
						>
							<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
							Upcoming
						</span>
					{/if}
					{#each categoryLabel as cat}
						<span
							class="bg-ecsess-900/80 text-ecsess-200 rounded px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm"
						>
							{cat}
						</span>
					{/each}
				</div>
			</div>

			<!-- Dialog body -->
			<div class="flex flex-col gap-4 p-5">
				<!-- Title -->
				<h2 class="text-ecsess-50 text-xl leading-snug font-bold text-balance">
					{eventTitle}
				</h2>

				<!-- Meta -->
				<div class="text-ecsess-300 flex flex-col gap-1.5 text-sm">
					<span class="flex items-center gap-2">
						<CalendarDays class="text-ecsess-500 h-4 w-4 shrink-0" strokeWidth={2} />
						{date}
					</span>
					<span class="flex items-center gap-2">
						<MapPin class="text-ecsess-500 h-4 w-4 shrink-0" strokeWidth={2} />
						{location ?? 'TBA'}
					</span>
				</div>

				<!-- Description -->
				{#if eventDescription}
					<div class="border-ecsess-800 border-t pt-4">
						<div class="typography text-ecsess-200 text-sm">
							<RichText value={eventDescription} />
						</div>
					</div>
				{/if}

				<!-- Action buttons -->
				{#if !isPastEvent || generalLink}
					<div class="border-ecsess-800 flex flex-wrap gap-2 border-t pt-4">
						{#if !isPastEvent && registrationLink}
							<a
								href={registrationLink[0].url}
								target="_blank"
								rel="noopener noreferrer"
								class="bg-ecsess-500 hover:bg-ecsess-400 inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold text-white transition-colors"
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
								class="border-ecsess-600 text-ecsess-200 hover:border-ecsess-400 hover:text-ecsess-50 inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors"
							>
								<ExternalLink class="h-3.5 w-3.5" strokeWidth={2.5} />
								Pay
							</a>
						{/if}

						{#if !isPastEvent}
							<button
								type="button"
								onclick={addToCalendar}
								class="border-ecsess-600 text-ecsess-200 hover:border-ecsess-400 hover:text-ecsess-50 inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors"
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
									class="border-ecsess-600 text-ecsess-200 hover:border-ecsess-400 hover:text-ecsess-50 inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors"
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
