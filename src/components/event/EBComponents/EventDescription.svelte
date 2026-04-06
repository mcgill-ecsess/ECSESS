<script lang="ts">
	import { ExternalLink as ExternalLinkIcon } from '@lucide/svelte';
	import RichText from 'components/RichText.svelte';
	import Button from 'components/Button.svelte';
	import type { InputValue } from '@portabletext/svelte';
	import type { LinkType } from '$lib/schemas';

	let { eventTitle, eventDescription, generalLink } = $props<{
		eventTitle: string;
		eventDescription?: InputValue;
		generalLink?: LinkType[] | null;
	}>();

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
	};
</script>

<div class="pointer-events-auto relative z-30 p-6">
	<h3 class="text-primary-content text-2xl leading-tight font-bold">{eventTitle}</h3>
</div>

<div class="pointer-events-auto relative z-30 my-2 flex h-56 flex-col md:h-64 xl:h-80">
	<div
		class="border-primary-soft text-base-content flex flex-1 justify-center overflow-y-auto border-y p-6"
	>
		{#if eventDescription}
			<RichText value={eventDescription} />
		{:else}
			<p>No description available for this event.</p>
		{/if}
	</div>
</div>

{#if generalLink}
	<div
		class="pointer-events-auto relative z-30 flex w-full flex-wrap items-center justify-center gap-3 overflow-auto p-6 pb-8"
	>
		{#each generalLink.slice(0, 4) as link}
			<Button
				href={link.url}
				external
				variant="primary"
				size="md"
				class="rounded-(--radius-panel)"
				onclick={handleClick}
			>
				<ExternalLinkIcon class="h-4 w-4 shrink-0" strokeWidth={2.5} />
				{link.title}
			</Button>
		{/each}
	</div>
{/if}

<div class="pointer-events-auto relative z-30 p-4 lg:hidden">
	<p class="text-base-content text-sm">Click to flip back</p>
</div>
