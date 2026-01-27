<script lang="ts">
	import type { OfficeHour } from '$lib/schemas';
	import OHBlock from './OHBlock.svelte';

	// Constants
	const SLOT_HEIGHT = 40; // pixels per 30-minute slot
	const SLOT_DURATION = 30; // minutes
	const BLOCK_MARGIN = 4; // pixels
	const BLOCK_VERTICAL_PADDING = 8; // pixels total (4px top + 4px bottom)
	const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
	const DEFAULT_START_TIME = 10 * 60; // 10 AM in minutes
	const DEFAULT_END_TIME = 17 * 60; // 5 PM in minutes

	type SegmentedControl = {
		startSlot: number;
		endSlot: number;
		ohs: OfficeHour[];
	};

	let { allOhs }: { allOhs: OfficeHour[] } = $props();

	// Time parsing utilities
	const parseTime = (timeStr: string): number => {
		const match = timeStr.match(/^(\d{1,2})(?::(\d{2}))?(AM|PM)$/i);
		if (!match) return 0;

		let hours = parseInt(match[1], 10);
		const minutes = parseInt(match[2] || '0', 10);
		const period = match[3].toUpperCase();

		if (period === 'PM' && hours !== 12) hours += 12;
		if (period === 'AM' && hours === 12) hours = 0;

		return hours * 60 + minutes;
	};

	const formatTime = (minutes: number): string => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		const period = hours >= 12 ? 'PM' : 'AM';
		const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
		return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
	};

	const getSegmentId = (ohs: OfficeHour[]): string =>
		ohs
			.map((oh) => `${oh.member.name}|${oh.startTime}`)
			.sort()
			.join('||');

	// Derived values using Svelte 5 $derived
	const timeRange = $derived.by(() => {
		const allTimes = allOhs.flatMap((oh) => [parseTime(oh.startTime), parseTime(oh.endTime)]);
		return {
			min: Math.min(...allTimes, DEFAULT_START_TIME),
			max: Math.max(...allTimes, DEFAULT_END_TIME)
		};
	});

	const timeSlots = $derived.by(() => {
		const startHour = Math.floor(timeRange.min / 60);
		const endHour = Math.ceil(timeRange.max / 60);
		const slots: number[] = [];

		for (let hour = startHour; hour < endHour; hour++) {
			slots.push(hour * 60);
			if (hour * 60 + SLOT_DURATION <= timeRange.max) {
				slots.push(hour * 60 + SLOT_DURATION);
			}
		}

		if (endHour * 60 <= timeRange.max) {
			slots.push(endHour * 60);
		}

		return slots;
	});

	// Get office hours active at a specific time slot
	const getActiveOHs = (day: string, timeSlot: number): OfficeHour[] =>
		allOhs.filter((oh) => {
			if (oh.day !== day) return false;
			const start = parseTime(oh.startTime);
			const end = parseTime(oh.endTime);
			return start <= timeSlot && timeSlot < end;
		});

	// Create continuous segments for a day
	const getSegmentsForDay = (day: string): SegmentedControl[] => {
		const segments: SegmentedControl[] = [];

		for (const currentSlot of timeSlots) {
			const activeOHs = getActiveOHs(day, currentSlot);
			if (activeOHs.length === 0) continue;

			const currentId = getSegmentId(activeOHs);
			const lastSegment = segments.at(-1);

			if (lastSegment && getSegmentId(lastSegment.ohs) === currentId) {
				// Continue existing segment
				lastSegment.endSlot = currentSlot + SLOT_DURATION;
			} else {
				// Create new segment
				segments.push({
					startSlot: currentSlot,
					endSlot: currentSlot + SLOT_DURATION,
					ohs: activeOHs
				});
			}
		}

		return segments;
	};
</script>

<div class="overflow-x-auto">
	<div class="border-ecsess-500 bg-ecsess-900 mx-auto max-w-7xl min-w-[800px] border-t pt-2">
		<!-- Header row -->
		<div class="mb-2 grid gap-0" style:grid-template-columns="80px repeat(5, 1fr)">
			<div
				class="text-ecsess-50 bg-ecsess-900 sticky left-0 z-20 px-2 text-center text-base font-semibold"
			>
				Time
			</div>
			{#each DAYS as day}
				<div class="text-ecsess-50 px-2 text-center text-base font-semibold md:text-lg">
					{day}
				</div>
			{/each}
		</div>

		<!-- Calendar grid -->
		<div
			class="border-ecsess-500 grid gap-0 border-t-2"
			style:grid-template-columns="80px repeat(5, 1fr)"
		>
			{#each DAYS as day, dayIndex}
				{@const segments = getSegmentsForDay(day)}

				<!-- Time column (only for first day) -->
				{#if dayIndex === 0}
					<div class="border-ecsess-500 bg-ecsess-900 sticky left-0 z-20 border-b-2">
						{#each timeSlots as timeSlot}
							{@const isHourMark = timeSlot % 60 === 0}
							<div
								class="text-ecsess-50 border-ecsess-400 flex items-start justify-end border-t pt-1 pr-2 text-sm"
								class:border-t-4={isHourMark}
								class:border-ecsess-500={isHourMark}
								class:font-semibold={isHourMark}
								style:height="{SLOT_HEIGHT}px"
							>
								{#if isHourMark}{formatTime(timeSlot)}{/if}
							</div>
						{/each}
					</div>
				{/if}

				<!-- Day column with segments -->
				<div
					class="border-ecsess-500 border-b-ecsess-500 relative border-b-2 border-l"
					style:min-height="{timeSlots.length * SLOT_HEIGHT}px"
				>
					<!-- Background grid lines -->
					{#each timeSlots as timeSlot, idx}
						{@const isHourMark = timeSlot % 60 === 0}
						<div
							class="border-ecsess-400 absolute inset-x-0 border-t"
							class:border-t-4={isHourMark}
							class:border-ecsess-500={isHourMark}
							style:top="{idx * SLOT_HEIGHT}px"
							style:height="{SLOT_HEIGHT}px"
						></div>
					{/each}

					<!-- Office hour segments -->
					{#each segments as segment}
						{@const startIndex = timeSlots.findIndex((ts) => ts >= segment.startSlot)}
						{@const duration = segment.endSlot - segment.startSlot}
						{@const heightPx = (duration / SLOT_DURATION) * SLOT_HEIGHT}
						{@const isShortBlock = duration <= 30}

						<div
							class="absolute z-10 grid gap-0.5"
							style:top="{startIndex * SLOT_HEIGHT + BLOCK_MARGIN + 3}px"
							style:height="{heightPx - BLOCK_VERTICAL_PADDING - 3}px"
							style:left="{BLOCK_MARGIN}px"
							style:right="{BLOCK_MARGIN}px"
							style:grid-template-columns="repeat({segment.ohs.length}, 1fr)"
						>
							{#each segment.ohs as oh}
								<OHBlock officeHour={oh} {isShortBlock} />
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
