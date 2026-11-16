<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import Link from '#lib/components/Link.svelte';

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
		class="flex h-full flex-col gap-3 rounded-2xl border border-ecsess-800/60 bg-ecsess-950/40 p-5 text-left transition-colors duration-200 hover:border-ecsess-600/70 hover:bg-ecsess-950/55"
		data-component="ResourceCard"
	>
		<div class="flex shrink-0 flex-row justify-between gap-3">
			<h3 class="py-0 text-left text-lg leading-snug font-bold text-balance text-ecsess-50">
				{title}
			</h3>
			<ArrowUpRight
				size="16"
				class="mt-1 shrink-0 stroke-ecsess-400 transition-colors group-hover:stroke-ecsess-200"
			/>
		</div>

		{#if categories.length}
			<div class="flex shrink-0 flex-wrap items-start justify-start gap-1.5">
				{#each categories as cat (cat)}
					<span
						class="self-start rounded-xl border border-ecsess-700/40 bg-ecsess-800/50 px-2.5 py-0.5 text-xs font-medium text-ecsess-200 sm:text-sm"
					>
						{cat}
					</span>
				{/each}
			</div>
		{/if}

		<p class="min-h-0 flex-1 overflow-hidden text-left text-sm leading-relaxed text-ecsess-300">
			{description}
		</p>
	</div>
</Link>
