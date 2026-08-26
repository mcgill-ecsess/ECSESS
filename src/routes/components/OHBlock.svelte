<script lang="ts">
	import type { OfficeHour } from '$lib/schemas';

	let { officeHour, isShortBlock }: { officeHour: OfficeHour; isShortBlock: boolean } = $props();

	function shortenPosition(position: string): string {
		return position.replace(/Engineering Representative/gi, 'Rep.');
	}
</script>

<div
	class="border-ecsess-500/35 bg-ecsess-600/75 text-ecsess-50 hover:border-ecsess-400/45 hover:bg-ecsess-550/85 grid h-full place-content-center rounded-xl border px-1 text-center transition-colors"
>
	<p class="text-sm leading-tight font-medium md:text-base">
		{officeHour.member.name.split(' ')[0]}
	</p>

	{#if !isShortBlock}
		<p class="text-ecsess-200/80 mt-0.5 text-[11px] leading-tight">
			{shortenPosition(officeHour.member.position)}
		</p>
	{/if}
</div>
