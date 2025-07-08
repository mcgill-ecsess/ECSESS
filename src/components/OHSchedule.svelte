<script lang="ts">
	import OhBlock from './OHBlock.svelte';
	import type { OhCMSResponse } from '$lib/schemas';

	function parseTime(timeStr: string) {
		let a = timeStr.match(/^(\d{1,2})(?::(\d{2}))?(AM|PM)$/i);
		if (!a) return;

		let hours = parseInt(a[1], 10);
		let minutes = parseInt(a[2] || '0', 10);
		let period = a[3];

		if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
		if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

		return hours * 60 + minutes; // total minutes since midnight
	}
	let { allOhs }: { allOhs: OhCMSResponse } = $props();
	let sortedOHs = $state(
		allOhs.sort((a, b) => {
			return parseTime(a.startTime) - parseTime(b.startTime);
		})
	);
	const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
</script>

<div class="grid grid-cols-5 gap-8">
	{#each daysOfTheWeek as DOTW}
		<div>
			{DOTW}
			{#each sortedOHs.filter((OH) => OH.day == DOTW) as OH}
				<OhBlock member={OH.member} startTime={OH.startTime} endTime={OH.endTime}></OhBlock>
			{/each}
		</div>
	{/each}
</div>
