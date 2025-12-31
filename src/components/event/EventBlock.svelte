<script lang="ts">
	import {
		CalendarDays,
		MapPin,
		Link as LinkIcon,
		FilePen,
		CalendarPlus,
		ExternalLink as ExternalLinkIcon
	} from '@lucide/svelte';
	import RichText from 'components/RichText.svelte';

	let {
		eventTitle,
		date,
		location,
		eventDescription,
		thumbnail,
		registrationLink, //[LinkType]
		paymentLink, //[LinkType]
		generalLink, //[LinkType]
		eventCategory,
		isPastEvent = false
	} = $props();

	let showDescription = $state(false);

	// Function to generate .ics file for calendar
	const addToCalendar = () => {
		const eventDate = new Date(date);
		const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

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

	const flipCard = (e: MouseEvent) => {
		showDescription = !showDescription;
	};
</script>

<div
	class="
	flip-box
	group relative flex flex-col rounded-2xl"
>
	<!--Flip Card container-->
	<div class="flip-box-inner rounded-2xl" class:show-back={showDescription}>
		<!--Front Side-->
		<!--Opacity thing is to fix the visual bug on ios-->
		<div
			class="flip-box-front bg-ecsess-950 shadow-ecsess-950/60 flex flex-col rounded-2xl shadow-xl transition-opacity duration-500 {showDescription
				? 'pointer-events-none opacity-0'
				: 'opacity-100'}"
		>
			<!--Flip button-->
			<div
				class="
				absolute inset-0 z-10 cursor-pointer rounded-2xl bg-transparent"
				onclick={flipCard}
			></div>
			<!-- Image Container with Gradient Overlay -->
			<div class="relative h-80 overflow-hidden rounded-t-2xl">
				{#if thumbnail}
					<img class="h-full w-full object-cover" src={thumbnail} alt={eventTitle} />
				{:else if eventCategory?.[0] === 'social'}
					<img class="h-full w-full object-cover" src="/Social.jpg" alt="Social Event" />
				{:else if eventCategory?.[0] === 'technical'}
					<img class="h-full w-full object-cover" src="/Technical.jpg" alt="Technical Event" />
				{:else if eventCategory?.[0] === 'professional'}
					<img
						class="h-full w-full object-cover"
						src="/Professional.jpg"
						alt="Professional Event"
					/>
				{:else if eventCategory?.[0] === 'academic'}
					<img class="h-full w-full object-cover" src="/Academic.jpg" alt="Academic Event" />
				{:else}
					<img class="h-full w-full object-cover" src="/ECSESS.png" alt="ECSESS Event" />
				{/if}

				<!-- Gradient overlay -->
				<div
					class="via-ecsess-800/30 to-ecsess-950 absolute inset-0 rounded-t-2xl bg-gradient-to-b from-transparent"
				></div>
				<!-- Event Title Overlay -->
				<div class="absolute right-0 bottom-0 left-0 p-6">
					<h3 class="text-2xl leading-tight font-bold text-white drop-shadow-2xl">
						{eventTitle}
					</h3>
				</div>
			</div>
			<!-- Badges -->
			<div class="absolute top-0 right-0 left-0 flex items-start justify-between gap-2 p-4">
				{#if isPastEvent}
					<span
						class="bg-ecsess-900 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-gray-300 uppercase backdrop-blur-sm"
					>
						Past Event
					</span>
				{:else}
					<span
						class="bg-ecsess-400/95 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm"
					>
						Upcoming
					</span>
				{/if}

				{#if eventCategory && eventCategory.length > 0}
					<div class="flex flex-wrap justify-end gap-2">
						{#each eventCategory as category}
							<span
								class="bg-ecsess-500/95 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm"
							>
								{category}
							</span>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Info Grid -->
			<div class="bg-ecsess-900/40 m-5 space-y-3 rounded-xl p-4">
				<div class="flex items-center gap-3">
					<div
						class="bg-ecsess-400 flex h-10 w-10 items-center justify-center rounded-full shadow-md"
					>
						<CalendarDays class="h-5 w-5 text-white" strokeWidth={2.5} />
					</div>
					<div class="flex-1">
						<p class="text-ecsess-50 text-sm font-semibold">{date}</p>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<div
						class="bg-ecsess-400 flex h-10 w-10 items-center justify-center rounded-full shadow-md"
					>
						<MapPin class="h-5 w-5 text-white" strokeWidth={2.5} />
					</div>
					<div class="flex-1">
						<p class="text-ecsess-50 text-sm font-semibold">
							{location ?? 'TBA'}
						</p>
					</div>
				</div>
			</div>
			<div class="relative z-100 flex-1 p-4 px-6">
				<!-- Action Buttons -->
				{#if !isPastEvent}
					<div class="space-y-2">
						<!-- Registration & Payment Row & Add to Calendar Button -->
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-2">
							{#if registrationLink}
								<a
									href={registrationLink[0].url}
									target="_blank"
									rel="noopener noreferrer"
									class="bg-ecsess-500 hover:bg-ecsess-600 p3 shadow-ecsess-300 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold
								text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg
								"
								>
									<FilePen class="h-4 w-4" strokeWidth={2.5} />
									Register
								</a>
							{:else}
								<div
									class="bg-ecsess-500 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white"
								>
									<FilePen class="h-4 w-4" strokeWidth={2.5} />
									Drop In
								</div>
							{/if}
							<button
								onclick={addToCalendar}
								class="bg-ecsess-700 hover:bg-ecsess-800 shadow-ecsess-400 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white
								shadow-md transition-all hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg"
							>
								<CalendarPlus class="h-5 w-5" strokeWidth={2.5} />
								Add to Calendar
							</button>
							{#if paymentLink}
								<a
									href={paymentLink[0].url}
									target="_blank"
									rel="noopener noreferrer"
									class="bg-ecsess-800 hover:bg-ecsess-900 shadow-ecsess-500 col-span-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white
									shadow-md transition-all hover:-translate-y-1 hover:shadow-lg sm:col-span-1"
								>
									<LinkIcon class="h-4 w-4" strokeWidth={2.5} />
									Pay
								</a>
							{:else}
								<div
									class="bg-ecsess-800 col-span-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white sm:col-span-1"
								>
									Free!
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
			<div class="p-4 lg:hidden">
				<p>Click to view more</p>
			</div>
		</div>
		<!-- Back Side -->
		<div
			class=" flip-box-back bg-ecsess-950 shadow-ecsess-950/60 flex flex-col rounded-2xl shadow-xl"
		>
			<!--Flip button-->
			<div
				class="
				absolute inset-0 z-10 cursor-pointer rounded-2xl bg-transparent"
				onclick={flipCard}
			></div>
			<!--Event Title-->
			<div class="right-0 bottom-0 left-0 p-6">
				<h3 class="text-2xl leading-tight font-bold text-white drop-shadow-2xl">
					{eventTitle}
				</h3>
			</div>
			<div class="relative z-20 my-2 flex h-56 flex-col md:h-64 xl:h-84" onclick={flipCard}>
				<!-- Description -->
				<div
					class="text-ecsess-100 border-ecsess-800 flex flex-1 justify-center overflow-y-auto border-y p-6"
				>
					{#if eventDescription}
						<RichText value={eventDescription} />
					{:else}
						<p>No description available for this event.</p>
					{/if}
				</div>
			</div>

			<!-- General Links -->
			<!--add max-h-41 we decide to go back to scrollable-->
			<div
				class="relative z-20 flex w-full flex-1 flex-wrap items-center justify-center gap-4 overflow-auto p-6"
			>
				{#if generalLink}
					{#each generalLink as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="bg-ecsess-600 hover:bg-ecsess-700 shadow-ecsess-400 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold
							text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
						>
							<ExternalLinkIcon class="h-4 w-4" strokeWidth={2.5} />
							{link.title}
						</a>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.flip-box {
		@apply h-full w-full perspective-[1000px];
	}

	.flip-box-inner {
		@apply grid h-full w-full text-center duration-800 transform-3d;
	}

	@keyframes rotate-and-back {
		0% {
			transform: rotateY(0);
		}
		33% {
			transform: rotateY(5deg);
		}
		66% {
			transform: rotateY(-5deg);
		}
		100% {
			transform: rotateY(0);
		}
	}
	@media (min-width: 448px) {
		/* Apply hover effect only on screens wider than md*/
		.flip-box:hover .flip-box-front {
			@apply animate-[rotate-and-back_0.3s_ease-in-out];
		}
	}

	.flip-box-front,
	.flip-box-back {
		@apply col-1 row-1 h-full w-full [-webkit-backface-visibility:hidden] backface-hidden;
	}
	.flip-box-front {
		@apply z-2 rotate-y-0 transform-3d;
	}

	.flip-box-back {
		@apply rotate-y-180;
	}

	.show-back {
		@apply rotate-y-180;
	}
</style>
