<script lang="ts">
	import type { OhCMSResponse } from '$lib/schemas';

	function parseTime(timeStr: string): number {
		let a = timeStr.match(/^(\d{1,2})(?::(\d{2}))?(AM|PM)$/i);
		if (!a) return 0;

		let hours = parseInt(a[1], 10);
		let minutes = parseInt(a[2] || '0', 10);
		let period = a[3];

		if (period.toUpperCase() === 'PM' && hours !== 12) hours += 12;
		if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;

		return Number(hours * 60 + minutes); // total minutes since midnight
	}
	let { allOhs }: { allOhs: OhCMSResponse } = $props();
	let sortedOHs = $state(
		allOhs.sort((a, b) => {
			return parseTime(a.startTime) - parseTime(b.startTime);
		})
	);
</script>

<div class="grid min-w-2/3 grid-cols-5 gap-2 place-self-center">
	{#each ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as day}
		<div>
			<p>- {day} -</p>
			{#each sortedOHs.filter((OH) => OH.day == day) as OH}
				<div
					class="
					card w-64 grid h-38 grid-rows-[3fr_2fr_3fr] bg-ecsess-200 text-ecsess-black m-3  place-content-center rounded-xl
					p-4 text-center"
				>
					<p class="text-lg">{OH.startTime} - {OH.endTime}</p>
					<p class="text-2xl">{OH.member.name.split(" ")[0]}</p>
					<p class="text-sm italic">{OH.member.position}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>
