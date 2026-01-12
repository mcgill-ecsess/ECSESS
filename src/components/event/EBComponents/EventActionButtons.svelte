<script lang="ts">
	import { FilePen, CalendarPlus, Link as LinkIcon } from '@lucide/svelte';
	import type { LinkType } from '$lib/schemas';

	let { registrationLink, paymentLink, addToCalendar } = $props<{
		registrationLink?: LinkType[] | null;
		paymentLink?: LinkType[] | null;
		addToCalendar: () => void;
	}>();

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
	};
</script>

<div class="pointer-events-auto space-y-2">
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-2">
		{#if registrationLink}
			<a
				href={registrationLink[0].url}
				target="_blank"
				rel="noopener noreferrer"
				class="bg-ecsess-500 hover:bg-ecsess-600 flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors"
				onclick={handleClick}
			>
				<FilePen class="h-4 w-4" strokeWidth={2.5} />
				Register
			</a>
		{:else}
			<div
				class="bg-ecsess-700/50 text-ecsess-300/70 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold opacity-60"
			>
				<FilePen class="h-4 w-4" strokeWidth={2.5} />
				Drop In
			</div>
		{/if}

		<button
			type="button"
			onclick={(e) => {
				e.stopPropagation();
				addToCalendar();
			}}
			class="bg-ecsess-700 hover:bg-ecsess-800 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors"
		>
			<CalendarPlus class="h-5 w-5" strokeWidth={2.5} />
			Add to Calendar
		</button>

		{#if paymentLink}
			<a
				href={paymentLink[0].url}
				target="_blank"
				rel="noopener noreferrer"
				class="bg-ecsess-800 hover:bg-ecsess-900 col-span-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors sm:col-span-1"
				onclick={handleClick}
			>
				<LinkIcon class="h-4 w-4" strokeWidth={2.5} />
				Pay
			</a>
		{:else}
			<div
				class="bg-ecsess-800/50 text-ecsess-300/70 col-span-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold opacity-60 sm:col-span-1"
			>
				Free!
			</div>
		{/if}
	</div>
</div>
