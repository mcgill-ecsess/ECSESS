<script lang="ts">
	import type { FAQ } from '$lib/schemas';
	import { slide } from 'svelte/transition';

	// Variable to be included into the component
	let { entries }: { entries: FAQ[] } = $props();

	// Track which items are open (supports multiple)
	let openItems = $state<Set<number>>(new Set());

	function toggleItem(index: number) {
		const newSet = new Set(openItems);
		if (newSet.has(index)) {
			newSet.delete(index);
		} else {
			newSet.add(index);
		}
		openItems = newSet;
	}

	function isOpen(index: number): boolean {
		return openItems.has(index);
	}
</script>

<div class="space-y-3">
	{#each entries as entry, index}
		<div class="border-muted rounded-(--radius-control) border-2 transition-colors duration-200">
			<!-- Question -->
			<button
				type="button"
				onclick={() => toggleItem(index)}
				class="bg-base hover:bg-primary-soft text-base-content focus-visible:ring-muted focus-visible:ring-offset-base flex w-full items-center gap-3 px-3 py-2 text-left text-lg font-bold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none {isOpen(
					index
				)
					? 'rounded-t-(--radius-control)'
					: 'rounded-(--radius-control)'}"
			>
				{entry.question}
				<span class="ml-auto">
					<svg
						class="size-5 shrink-0 transition-transform duration-200 {isOpen(index)
							? 'rotate-90'
							: ''}"
						width="20"
						height="20"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path d="M9 5l7 7-7 7" />
					</svg>
				</span>
			</button>

			<!-- Panel -->
			{#if isOpen(index)}
				<div
					class="border-t-muted text-base-content h-fit overflow-hidden border-t-2 bg-transparent px-4 py-3
					  text-lg leading-relaxed transition-all duration-200"
					transition:slide={{ duration: 200 }}
				>
					{entry.answer}
				</div>
			{/if}
		</div>
	{/each}
</div>

<!--  -->
