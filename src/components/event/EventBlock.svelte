<script lang="ts">
	//import { PortableText } from '@portabletext/svelte';
	import { CalendarDays, MapPin, Link as LinkIcon, FilePen, CalendarPlus } from '@lucide/svelte';
	import RichText from 'components/RichText.svelte';

	let {
		eventTitle,
		date,
		location,
		eventDescription,
		thumbnail,
		registrationLink,
		paymentLink,
		eventCategory,
		isPastEvent = false
	} = $props();

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
</script>

<div
	class="group bg-ecsess-950 shadow-ecsess-950/50 relative flex h-full flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
	<!-- Image Container with Gradient Overlay -->
	<div class="relative h-64 overflow-hidden">
		{#if thumbnail}
			<img
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				src={thumbnail}
				alt={eventTitle}
			/>
		{:else if eventCategory?.[0] === 'social'}
			<img
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				src="/Social.jpg"
				alt="Social Event"
			/>
		{:else if eventCategory?.[0] === 'technical'}
			<img
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				src="/Technical.jpg"
				alt="Technical Event"
			/>
		{:else if eventCategory?.[0] === 'professional'}
			<img
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				src="/Professional.jpg"
				alt="Professional Event"
			/>
		{:else if eventCategory?.[0] === 'academic'}
			<img
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				src="/Academic.jpg"
				alt="Academic Event"
			/>
		{:else}
			<img
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				src="/ECSESS.png"
				alt="ECSESS Event"
			/>
		{/if}

		<!-- Gradient overlay -->
		<div
			class="via-ecsess-800/30 to-ecsess-950 absolute inset-0 bg-gradient-to-b from-transparent"
		></div>

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

		<!-- Event Title Overlay -->
		<div class="absolute right-0 bottom-0 left-0 p-6">
			<h3 class="text-2xl leading-tight font-bold text-white drop-shadow-2xl">
				{eventTitle}
			</h3>
		</div>
	</div>

	<!-- Content Section -->
	<div class="flex flex-1 flex-col p-6">
		<!-- Description -->
		{#if eventDescription}
			<div class="text-ecsess-100 mb-6 line-clamp-5">
				<RichText value={eventDescription} />
			</div>
		{/if}

		<!-- Info Grid -->
		<div class="bg-ecsess-900/40 mb-6 space-y-3 rounded-xl p-4">
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

		<!-- Action Buttons -->
		{#if !isPastEvent}
			<div class="space-y-2">
				<!-- Add to Calendar Button -->
				<button
					onclick={addToCalendar}
					class="bg-ecsess-400 hover:bg-ecsess-500 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
				>
					<CalendarPlus class="h-5 w-5" strokeWidth={2.5} />
					Add to Calendar
				</button>

				<!-- Registration & Payment Row -->
				<div class="grid grid-cols-2 gap-2">
					{#if registrationLink}
						<a
							href={registrationLink}
							target="_blank"
							rel="noopener noreferrer"
							class="bg-ecsess-500 hover:bg-ecsess-600 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
						>
							<FilePen class="h-4 w-4" strokeWidth={2.5} />
							Register
						</a>
					{:else}
						<div
							class="bg-ecsess-900 text-ecsess-200 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
						>
							<FilePen class="h-4 w-4" strokeWidth={2.5} />
							Drop In
						</div>
					{/if}

					{#if paymentLink}
						<a
							href={paymentLink}
							target="_blank"
							rel="noopener noreferrer"
							class="bg-ecsess-600 hover:bg-ecsess-700 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
						>
							<LinkIcon class="h-4 w-4" strokeWidth={2.5} />
							Pay
						</a>
					{:else}
						<div
							class="bg-ecsess-500 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md"
						>
							Free!
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
