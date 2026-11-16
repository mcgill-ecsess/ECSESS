<script lang="ts">
	import type { OfficeHour } from '#lib/schemas.ts';

	let { officeHour, isShortBlock }: { officeHour: OfficeHour; isShortBlock: boolean } = $props();

	function shortenPosition(position: string): string {
		return position.replace(/Engineering Representative/gi, 'Rep.');
	}
</script>

<div
	class="grid h-full place-content-center rounded-xl border border-ecsess-500/35 bg-ecsess-600/75 px-1 text-center text-ecsess-50 transition-colors hover:border-ecsess-400/45 hover:bg-ecsess-550/85"
	data-component="OHBlock"
>
	<p class="text-sm leading-tight font-medium md:text-base">
		{officeHour.member.name.split(' ')[0]}
	</p>

	{#if !isShortBlock}
		<p class="mt-0.5 text-[11px] leading-tight text-ecsess-200/80">
			{shortenPosition(officeHour.member.position)}
		</p>
	{/if}
</div>
