<script lang="ts">
	import type { OfficeHour } from '$lib/schemas';

	function parseTime(timeStr: string): number {
		let timeRegexMatch = timeStr.match(/^(\d{1,2})(?::(\d{2}))?(AM|PM)$/i);
		if (!timeRegexMatch) return 0;

		let hours = parseInt(timeRegexMatch[1], 10);
		let minutes = parseInt(timeRegexMatch[2] || '0', 10);
		let period = timeRegexMatch[3];

		if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
		if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

		return Number(hours * 60 + minutes); // total minutes since midnight
	}
	let { allOhs }: { allOhs: OfficeHour[] } = $props();
	let sortedOHs = allOhs.sort((a, b) => {
		return parseTime(a.startTime) - parseTime(b.startTime);
	});
</script>

<div class="grid min-w-2/3 grid-cols-5 gap-2 place-self-center">
	{#each ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as day}
		
		<div>
			<p class="text-center text-xl">{day}</p>
			{#each sortedOHs.filter((OH) => OH.day == day) as OH}
				<div
					class="
					bg-ecsess-200 text-ecsess-black m-2 grid h-36 max-w-md min-w-50
					 grid-rows-[2fr_4fr_3fr] place-content-center rounded-xl
					p-3 text-center"
				>
					<p class="border-b-ecsess-600 border-b-2 text-lg">{OH.startTime} - {OH.endTime}</p>

					<p class="text-ecsess-800 place-self-center text-2xl font-bold">
						{OH.member.name.split(' ')[0]}
					</p>
					<p class="text-sm italic">{OH.member.position}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>
