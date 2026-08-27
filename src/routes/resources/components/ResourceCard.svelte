<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import Link from '$lib/components/Link.svelte';

	let {
		title = 'Resource Title',
		description = 'Lorem ipsum',
		link = 'https://example.com',
		category
	}: {
		title?: string;
		description?: string;
		link?: string;
		category?: string[];
	} = $props();

	let categories = $derived(Array.isArray(category) ? category : []);
</script>

<Link href={link} external={true} class="group block h-full">
	<div
		class="border-ecsess-800/60 bg-ecsess-950/40 hover:border-ecsess-600/70 hover:bg-ecsess-950/55 flex h-full flex-col gap-3 rounded-2xl border p-5 text-left transition-colors duration-200"
		data-component="ResourceCard"
	>
		<div class="flex shrink-0 flex-row justify-between gap-3">
			<h3 class="text-ecsess-50 py-0 text-left text-lg leading-snug font-bold text-balance">
				{title}
			</h3>
			<ArrowUpRight
				size="16"
				class="stroke-ecsess-400 group-hover:stroke-ecsess-200 mt-1 shrink-0 transition-colors"
			/>
		</div>

		{#if categories.length}
			<div class="flex shrink-0 flex-wrap items-start justify-start gap-1.5">
				{#each categories as cat (cat)}
					<span
						class="border-ecsess-700/40 bg-ecsess-800/50 text-ecsess-200 self-start rounded-xl border px-2.5 py-0.5 text-xs font-medium sm:text-sm"
					>
						{cat}
					</span>
				{/each}
			</div>
		{/if}

		<p class="text-ecsess-300 min-h-0 flex-1 overflow-hidden text-left text-sm leading-relaxed">
			{description}
		</p>
	</div>
</Link>
