<script lang="ts">
	import type { FAQ } from '$lib/schemas';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	// Variable to be included into the component
	let { entries }: { entries: FAQ[] } = $props();
</script>

<Accordion multiple>
	{#snippet iconClosed()}
		<svg
			width="20"
			height="20"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path d="M9 5l7 7-7 7" />
		</svg>
	{/snippet}

	{#snippet iconOpen()}
		<svg
			class="rotate-90"
			width="20"
			height="20"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path d="M9 5l7 7-7 7" />
		</svg>
	{/snippet}

	{#each entries as entry, index}
		<Accordion.Item
			value={index.toString()}
			classes="border-ecsess-300 mb-4 rounded-md border-2 hover:bg-ecsess-500/30 transition-all"
			leadClasses="text-lg font-bold"
			controlClasses="
            flex cursor-pointer justify-between
            py-4 ease-in-out"
			panelClasses=" border-t-ecsess-300 border-t-2 bg-transparent p-4 bg-ecsess-350/50"
		>
			<!-- Control -->
			{#snippet lead()}
				{entry.question}
			{/snippet}

			{#snippet control()}{/snippet}

			<!-- Panel -->
			{#snippet panel()}{entry.answer}{/snippet}
		</Accordion.Item>
	{/each}
</Accordion>

<!--  -->
