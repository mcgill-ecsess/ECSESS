<script lang="ts">
	import { ExternalLink as ExternalLinkIcon } from '@lucide/svelte';
	import RichText from 'components/RichText.svelte';
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
	<h3 class="text-2xl leading-tight font-bold text-white">{eventTitle}</h3>
</div>

<div class="pointer-events-auto relative z-30 my-2 flex h-56 flex-col md:h-64 xl:h-80">
	<div
		class="border-ecsess-800 text-ecsess-100 flex flex-1 justify-center overflow-y-auto border-y p-6"
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
			<a
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				class="bg-ecsess-600 hover:bg-ecsess-700 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors"
				onclick={handleClick}
			>
				<ExternalLinkIcon class="h-4 w-4" strokeWidth={2.5} />
				{link.title}
			</a>
		{/each}
	</div>
{/if}

<div class="pointer-events-auto relative z-30 p-4 lg:hidden">
	<p class="text-ecsess-400 text-sm">Click to flip back</p>
</div>
