<script lang="ts">
	import { FilePen, CalendarPlus, Link as LinkIcon } from '@lucide/svelte';
	import Button from 'components/Button.svelte';
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
			<Button
				href={registrationLink[0].url}
				external
				variant="primary"
				size="md"
				class="flex flex-1 rounded-(--radius-panel)"
				onclick={handleClick}
			>
				<FilePen class="h-4 w-4 shrink-0" strokeWidth={2.5} />
				Register
			</Button>
		{:else}
			<div
				class="bg-primary-soft text-base-content flex flex-1 items-center justify-center gap-2 rounded-(--radius-panel) px-4 py-3 text-sm font-bold"
			>
				<FilePen class="h-4 w-4 shrink-0" strokeWidth={2.5} />
				Drop In
			</div>
		{/if}

		<button
			type="button"
			onclick={(e) => {
				e.stopPropagation();
				addToCalendar();
			}}
			class="bg-primary-hover text-base-content hover:bg-primary-soft focus-visible:ring-offset-base focus-visible:ring-muted inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-(--radius-panel) border border-transparent px-4 py-2.5 text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
		>
			<CalendarPlus class="h-5 w-5 shrink-0" strokeWidth={2.5} />
			Add to Calendar
		</button>

		{#if paymentLink}
			<Button
				href={paymentLink[0].url}
				external
				variant="secondary"
				size="md"
				class="col-span-2 flex items-center justify-center rounded-(--radius-panel) sm:col-span-1"
				onclick={handleClick}
			>
				<LinkIcon class="h-4 w-4 shrink-0" strokeWidth={2.5} />
				Pay
			</Button>
		{:else}
			<div
				class="bg-primary-soft text-base-content col-span-2 flex items-center justify-center gap-2 rounded-(--radius-panel) px-4 py-3 text-sm font-bold sm:col-span-1"
			>
				Free!
			</div>
		{/if}
	</div>
</div>
