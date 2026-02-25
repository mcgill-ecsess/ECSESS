<script lang="ts">
	import { FilePen, CalendarPlus, Link as LinkIcon } from '@lucide/svelte';
	import Link from 'components/Link.svelte';
	import type { LinkType } from '$lib/schemas';

	let { registrationLink, paymentLink, addToCalendar } = $props<{
		registrationLink?: LinkType[] | null;
		paymentLink?: LinkType[] | null;
		addToCalendar: () => void;
	}>();
</script>

<div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
	{#if registrationLink}
		<Link
			href={registrationLink[0].url}
			external
			class="bg-ecsess-500 hover:bg-ecsess-550 focus:ring-ecsess-300 focus:ring-offset-ecsess-900 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
		>
			<FilePen class="h-4 w-4" strokeWidth={2.5} />
			Register
		</Link>
	{:else}
		<div
			class="bg-ecsess-700/50 text-ecsess-300/70 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold opacity-60"
		>
			<FilePen class="h-4 w-4" strokeWidth={2.5} />
			Drop In
		</div>
	{/if}

	<button
		type="button"
		onclick={addToCalendar}
		class="bg-ecsess-700 hover:bg-ecsess-750 focus:ring-ecsess-300 focus:ring-offset-ecsess-900 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
	>
		<CalendarPlus class="h-5 w-5" strokeWidth={2.5} />
		Add to Calendar
	</button>

	{#if paymentLink}
		<Link
			href={paymentLink[0].url}
			external
			class="bg-ecsess-800 hover:bg-ecsess-850 focus:ring-ecsess-300 focus:ring-offset-ecsess-900 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
		>
			<LinkIcon class="h-4 w-4" strokeWidth={2.5} />
			Pay
		</Link>
	{:else}
		<div
			class="bg-ecsess-800/50 text-ecsess-300/70 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold opacity-60"
		>
			Free!
		</div>
	{/if}
</div>
