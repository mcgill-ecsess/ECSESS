<script lang="ts">
	import type { OfficeHour } from '$lib/schemas';

	let { officeHour, isShortBlock }: { officeHour: OfficeHour; isShortBlock: boolean } = $props();

	function shortenPosition(position: string): string {
		return position.replace(/Engineering Representative/gi, 'Rep.');
	}
</script>

<div
	class="win-raised h-full grid place-content-center text-center"
	style="background: #ece9d8; cursor: default;"
	onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background = '#d4d0c8'; }}
	onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background = '#ece9d8'; }}
>
	<p style="font-size: 11px; font-weight: bold; color: #000080; line-height: 1.2;">
		{officeHour.member.name.split(' ')[0]}
	</p>

	{#if !isShortBlock}
		<p style="font-size: 9px; color: #444; margin-top: 1px; line-height: 1.2;">
			{shortenPosition(officeHour.member.position)}
		</p>
	{/if}
</div>
