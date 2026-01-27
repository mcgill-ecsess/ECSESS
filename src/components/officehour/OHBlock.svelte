<script lang="ts">
	import type { OfficeHour } from '$lib/schemas';

	let { officeHour, isShortBlock }: { officeHour: OfficeHour; isShortBlock: boolean } = $props();

	function shortenPosition(position: string): string {
		return position.replace(/Engineering Representative/gi, 'Rep.');
	}
</script>

<div
	class="bg-ecsess-100 text-ecsess-900 hover:bg-ecsess-200 grid h-full place-content-center rounded-md text-center shadow-md transition-all hover:shadow-lg"
>
	<p class="text-base leading-tight font-semibold">
		{officeHour.member.name.split(' ')[0]}
	</p>

	{#if !isShortBlock}
		<p class="text-ecsess-700 mt-0.5 text-[11px] leading-tight opacity-90">
			{shortenPosition(officeHour.member.position)}
		</p>
	{/if}
</div>
