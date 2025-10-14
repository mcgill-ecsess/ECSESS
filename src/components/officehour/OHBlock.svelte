<script lang="ts">
	import type { OfficeHour } from '$lib/schemas';

	let { officeHour, compact = false, hideTime = false }: { officeHour: OfficeHour; compact?: boolean; hideTime?: boolean } = $props();

	function parseTime(timeStr: string): number {
		let timeRegexMatch = timeStr.match(/^(\d{1,2})(?::(\d{2}))?(AM|PM)$/i);
		if (!timeRegexMatch) return 0;

		let hours = parseInt(timeRegexMatch[1], 10);
		let minutes = parseInt(timeRegexMatch[2] || '0', 10);
		let period = timeRegexMatch[3];

		if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
		if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

		return hours * 60 + minutes;
	}

	// Calculate duration in minutes
	function getDuration(start: string, end: string): number {
		return parseTime(end) - parseTime(start);
	}

	// Calculate dynamic height based on duration
	// Base: 30 minutes = 3.5rem, scale proportionally
	function getHeight(duration: number): string {
		const baseMinutes = 30;
		const baseHeight = 3.5; // Half of original 7rem
		const heightRem = Math.max((duration / baseMinutes) * baseHeight, 2.5);
		return `${heightRem}rem`;
	}

	const duration = getDuration(officeHour.startTime, officeHour.endTime);
	const blockHeight = getHeight(duration);
	
	// Shorten position name for display
	const displayPosition = officeHour.member.position.replace(/Engineering Representative/gi, 'Rep.');
</script>

<div
	class="bg-ecsess-200 text-ecsess-black grid place-content-center rounded-lg text-center h-full"
	class:m-2={!compact && !hideTime}
	class:m-0={hideTime}
	class:p-2={!hideTime}
	class:p-1={hideTime}
	style={hideTime ? '' : `height: ${blockHeight};`}
>
	{#if !hideTime}
		<p class="border-b-ecsess-600 border-b-2 text-xs md:text-sm" class:lg:text-base={!compact} class:lg:text-sm={compact}>
			{officeHour.startTime} - {officeHour.endTime}
		</p>
	{/if}

	<p class="text-ecsess-800 font-extrabold text-base lg:text-lg">
		{officeHour.member.name.split(' ')[0]}
	</p>

	<p class="italic text-xs">
		{displayPosition}
	</p>
</div>

