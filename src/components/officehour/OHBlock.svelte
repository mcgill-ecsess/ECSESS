<script lang="ts">
	import type { OfficeHour } from '$lib/schemas';

	let { officeHour, isShortBlock }: { officeHour: OfficeHour; isShortBlock: boolean } = $props();

	function shortenPosition(position: string): string {
		return position.replace(/Engineering Representative/gi, 'Rep.');
	}
</script>

<div
	class="bg-ecsess-100 text-ecsess-900 grid h-full place-content-center rounded-md text-center hover:bg-ecsess-200 border-ecsess-300 border shadow-md transition-all hover:shadow-lg"
>
	<p class="text-base font-extrabold lg:text-lg">
		{officeHour.member.name.split(' ')[0]}
	</p>

	{#if !isShortBlock}
		<p class="text-ecsess-700 text-xs italic">
			{shortenPosition(officeHour.member.position)}
		</p>
	{/if}
</div>
