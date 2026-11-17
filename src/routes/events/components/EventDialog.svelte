<script lang="ts">
	import type { EventPost } from '#lib/schemas.ts';
	import { EventLinkKind } from '#lib/schemas.ts';
	import {
		CalendarDays,
		Clock,
		MapPin,
		FilePen,
		CalendarPlus,
		ExternalLink,
		X
	} from '@lucide/svelte';
	import RichText from '#lib/components/RichText.svelte';
	import { formatEventDialogWhen, getEventLink, isPastEvent, isSameDayEvent } from '#lib/events.js';

	interface Props {
		open: boolean;
		e: EventPost;
		onclose: () => void;
	}

	let { open = false, e, onclose }: Props = $props();

	const when = $derived(formatEventDialogWhen(e.from, e.to));
	const sameDay = $derived(isSameDayEvent(e.from, e.to));
	const past = $derived(isPastEvent(e.from, e.to));
	const registrationLink = $derived(getEventLink(e, EventLinkKind.REGISTRATION));
	const paymentLink = $derived(getEventLink(e, EventLinkKind.PAYMENT));
	const generalLink = $derived(getEventLink(e, EventLinkKind.GENERAL));
	const categories = $derived(e.category ?? []);

	let canScrollDown = $state(false);

	/** Escape page stacking contexts (footer/nav) by mounting on document.body. */
	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

	/** Tracks whether the description has more content below the fold. */
	function scrollHint(node: HTMLElement) {
		const update = () => {
			canScrollDown = node.scrollHeight - node.scrollTop - node.clientHeight > 8;
		};
		update();
		node.addEventListener('scroll', update, { passive: true });
		const ro = new ResizeObserver(update);
		ro.observe(node);
		return {
			destroy() {
				node.removeEventListener('scroll', update);
				ro.disconnect();
				canScrollDown = false;
			}
		};
	}

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

	function addToCalendar() {
		const eventDate = e.from ? new Date(e.from) : e.to ? new Date(e.to) : new Date();
		const endDate = e.to ? new Date(e.to) : new Date(eventDate.getTime() + 2 * 60 * 60 * 1000);
		const formatDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
		const icsContent = [
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'PRODID:-//ECSESS//Events//EN',
			'BEGIN:VEVENT',
			`DTSTART:${formatDate(eventDate)}`,
			`DTEND:${formatDate(endDate)}`,
			`SUMMARY:${e.name}`,
			`LOCATION:${e.location || 'TBA'}`,
			`DESCRIPTION:${e.name} - ECSESS Event`,
			'END:VEVENT',
			'END:VCALENDAR'
		].join('\n');
		const blob = new Blob([icsContent], { type: 'text/calendar' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${e.name.replace(/\s+/g, '_')}.ics`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	function handleBackdropClick(ev: MouseEvent) {
		if ((ev.target as HTMLElement).dataset.backdrop) onclose();
	}

	function handleKeydown(ev: KeyboardEvent) {
		if (ev.key === 'Escape') onclose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop + dialog (portaled above footer/nav stacking contexts) -->
<div
	use:portal
	data-backdrop="true"
	data-component="EventDialog"
	onclick={handleBackdropClick}
	onkeydown={handleKeydown}
	role="dialog"
	aria-modal="true"
	aria-label={e.name}
	tabindex="-1"
	class="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-200
		{open
		? 'pointer-events-auto bg-neutral-950/70 backdrop-blur-sm'
		: 'pointer-events-none bg-transparent opacity-0 backdrop-blur-none'}"
>
	<div
		class="relative flex h-[80dvh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-ecsess-950
			shadow-2xl transition-all duration-200
			{open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'}"
	>
		<!-- Close button -->
		<button
			type="button"
			onclick={onclose}
			class="absolute top-3 right-3 z-10 rounded-full bg-ecsess-950/70 p-1.5 text-ecsess-400 ring-1 ring-ecsess-600/80 backdrop-blur-sm transition-colors hover:bg-ecsess-800 hover:text-ecsess-50 hover:ring-ecsess-400"
			aria-label="Close dialog"
		>
			<X class="h-4 w-4" strokeWidth={2} />
		</button>

		<div class="flex min-h-0 flex-1 flex-col overflow-hidden">
			<!-- Header image — shorter on small screens -->
			<div class="relative h-[26%] min-h-36 w-full shrink-0 overflow-hidden md:h-[38%] md:min-h-72">
				<img
					src={imageSrc}
					alt={e.name}
					class="absolute inset-0 h-full w-full object-cover {past ? 'grayscale' : ''}"
				/>
				<!-- Fade into dialog body -->
				<div
					class="pointer-events-none absolute inset-0 bg-gradient-to-t from-ecsess-950 via-ecsess-950/40 to-transparent"
					aria-hidden="true"
				></div>
				<!-- Status + category tags over fade -->
				<div class="absolute bottom-3 left-3 z-[1] flex flex-wrap gap-1.5">
					{#if past}
						<span
							class="rounded bg-ecsess-950/80 px-2 py-0.5 text-[10px] font-bold tracking-widest text-ecsess-300 uppercase backdrop-blur-sm"
						>
							Past
						</span>
					{:else}
						<span
							class="inline-flex items-center gap-1 rounded bg-ecsess-500 px-2 py-0.5 text-[10px] font-bold tracking-widest text-white uppercase"
						>
							<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
							Upcoming
						</span>
					{/if}
					{#each categories as cat (cat)}
						<span
							class="rounded bg-ecsess-900/80 px-2 py-0.5 text-[10px] font-bold tracking-widest text-ecsess-200 uppercase backdrop-blur-sm"
						>
							{cat}
						</span>
					{/each}
				</div>
			</div>

			<!-- Dialog body -->
			<div
				class="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-5 pt-1 pb-5 text-left md:p-5"
			>
				<div class="flex shrink-0 flex-col gap-2 md:gap-4">
					<!-- Title -->
					<h2 class="pr-8 text-xl leading-snug font-bold text-balance text-ecsess-50">
						{e.name}
					</h2>

					<!-- Meta -->
					<div class="flex flex-col gap-1.5 text-sm text-ecsess-200">
						<span class="flex items-start gap-2">
							<CalendarDays class="mt-0.5 h-4 w-4 shrink-0 text-ecsess-400" strokeWidth={2} />
							<span class="min-w-0 leading-snug text-pretty">{when.date}</span>
						</span>
						{#if when.time}
							<span class="flex items-start gap-2">
								{#if sameDay}
									<Clock class="mt-0.5 h-4 w-4 shrink-0 text-ecsess-400" strokeWidth={2} />
								{:else}
									<CalendarDays class="mt-0.5 h-4 w-4 shrink-0 text-ecsess-400" strokeWidth={2} />
								{/if}
								<span class="min-w-0 leading-snug text-pretty">{when.time}</span>
							</span>
						{/if}
						<span class="flex items-start gap-2">
							<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-ecsess-400" strokeWidth={2} />
							<span class="min-w-0 leading-snug">{e.location ?? 'TBA'}</span>
						</span>
					</div>
				</div>

				<!-- Description — fills remaining space and scrolls -->
				{#if e.description}
					<div class="relative mt-4 min-h-0 flex-1 border-t border-ecsess-800">
						<div class="h-full min-h-0 overflow-y-auto pt-2 pr-1.5 text-left" use:scrollHint>
							<div class="pb-3 text-sm text-ecsess-100">
								<RichText value={e.description} />
							</div>
						</div>
						{#if canScrollDown}
							<div
								class="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ecsess-950 via-ecsess-950/90 to-transparent"
								aria-hidden="true"
							></div>
						{/if}
					</div>
				{:else}
					<div class="min-h-0 flex-1"></div>
				{/if}

				<!-- Action buttons -->
				{#if !past || generalLink}
					<div class="mt-4 flex shrink-0 flex-wrap gap-2 border-t border-ecsess-800 pt-4">
						{#if !past && registrationLink}
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

						{#if !past && paymentLink}
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

						{#if !past}
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
							{#each generalLink.slice(0, 4) as link (link.url)}
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
