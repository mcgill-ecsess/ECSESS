<script lang="ts">
	import type { FAQ } from '$lib/schemas';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
	import { slide } from 'svelte/transition';

	// Variable to be included into the component
	let { entries }: { entries: FAQ[] } = $props();
</script>

<Accordion multiple class="space-y-3">
	{#each entries as entry, index}
		<Accordion.Item
			value={index.toString()}
			class="border-ecsess-300 hover:bg-ecsess-500/30 rounded-md border-2 transition-colors duration-200"
		>
			<!-- Question -->
			<Accordion.ItemTrigger class="flex w-full items-center gap-3 px-3 py-2 text-left text-lg font-bold">
				{entry.question}
				<Accordion.ItemIndicator class="ml-auto group">
					<svg
						class="size-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90"
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
				</Accordion.ItemIndicator>
			</Accordion.ItemTrigger>

			<!-- Panel -->
			<Accordion.ItemContent
				class="h-fit overflow-hidden border-t-ecsess-300 bg-ecsess-400/50"
			>
			{#snippet element(attributes)}
				{#if !attributes.hidden}
					<div {...attributes}
						class="overflow-hidden px-4 py-3 text-base leading-relaxed
							 border-t-ecsess-300 border-t-2 transition-all duration-200" 
						transition:slide={{ duration: 200 }}
					>
						{entry.answer}
					</div>
				{/if}
			{/snippet}
			</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>

<!--  -->
