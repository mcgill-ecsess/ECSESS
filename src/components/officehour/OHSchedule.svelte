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

<div style="overflow-x: auto;">
	<div style="max-width: 100%; min-width: 600px; border-top: 2px solid #808080; background: #ffffff;">
		<!-- Header row -->
		<div class="grid gap-0" style:grid-template-columns="80px repeat(5, 1fr)" style="margin-bottom: 2px; background: #0a246a;">
			<div style="color: #fff; background: #0a246a; padding: 4px; text-align: center; font-size: 11px; font-weight: bold; position: sticky; left: 0; z-index: 20;">
				Time
			</div>
			{#each DAYS as day}
				<div style="color: #fff; background: #0a246a; padding: 4px; text-align: center; font-size: 11px; font-weight: bold;">
					{day}
				</div>
			{/each}
		</div>

		<!-- Calendar grid -->
		<div
			class="grid gap-0"
			style:grid-template-columns="80px repeat(5, 1fr)"
			style="border-top: 2px solid #808080;"
		>
			{#each DAYS as day, dayIndex}
				{@const segments = getSegmentsForDay(day)}

				<!-- Time column (only for first day) -->
				{#if dayIndex === 0}
					<div style="background: #ece9d8; position: sticky; left: 0; z-index: 20; border-bottom: 1px solid #808080;">
						{#each timeSlots as timeSlot}
							{@const isHourMark = timeSlot % 60 === 0}
							<div
								style="
									display: flex; align-items: flex-start; justify-content: flex-end;
									padding: 2px 4px 0 0;
									border-top: {isHourMark ? '2px solid #808080' : '1px dotted #d4d0c8'};
									height: {SLOT_HEIGHT}px;
									font-size: {isHourMark ? '10px' : '9px'};
									font-weight: {isHourMark ? 'bold' : 'normal'};
									color: {isHourMark ? '#000080' : '#808080'};
								"
							>
								{#if isHourMark}{formatTime(timeSlot)}{/if}
							</div>
						{/each}
					</div>
				{/if}

				<!-- Day column with segments -->
				<div
					style="
						position: relative;
						border-left: 1px solid #d4d0c8;
						border-bottom: 1px solid #808080;
						min-height: {timeSlots.length * SLOT_HEIGHT}px;
						background: #ffffff;
					"
				>
					<!-- Background grid lines -->
					{#each timeSlots as timeSlot, idx}
						{@const isHourMark = timeSlot % 60 === 0}
						<div
							style="
								position: absolute;
								left: 0; right: 0;
								border-top: {isHourMark ? '2px solid #808080' : '1px dotted #ece9d8'};
								top: {idx * SLOT_HEIGHT}px;
								height: {SLOT_HEIGHT}px;
							"
						></div>
					{/each}

					<!-- Office hour segments -->
					{#each segments as segment}
						{@const startIndex = timeSlots.findIndex((ts) => ts >= segment.startSlot)}
						{@const duration = segment.endSlot - segment.startSlot}
						{@const heightPx = (duration / SLOT_DURATION) * SLOT_HEIGHT}
						{@const isShortBlock = duration <= 30}

						<div
							style="
								position: absolute;
								z-index: 10;
								display: grid;
								gap: 2px;
								top: {startIndex * SLOT_HEIGHT + BLOCK_MARGIN + 3}px;
								height: {heightPx - BLOCK_VERTICAL_PADDING - 3}px;
								left: {BLOCK_MARGIN}px;
								right: {BLOCK_MARGIN}px;
								grid-template-columns: repeat({segment.ohs.length}, 1fr);
							"
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
