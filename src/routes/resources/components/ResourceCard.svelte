<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import Link from 'components/Link.svelte';

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
		class="bg-ecsess-black border-ecsess-800 hover:border-ecsess-600 grid h-full grid-rows-[1fr_1fr_4fr] gap-2 rounded-xl border p-5 text-left transition-colors duration-200"
	>
		<div class="flex flex-row justify-between gap-3">
			<h3 class="text-ecsess-50 py-0 text-left text-lg leading-snug font-bold text-balance">
				{title}
			</h3>
			<ArrowUpRight
				size="16"
				class="stroke-ecsess-300 group-hover:stroke-ecsess-100 mt-1 shrink-0 transition-colors"
			/>
		</div>

		<div class="flex flex-wrap items-start justify-start gap-1">
			{#each categories as category}
				<span
					class="bg-ecsess-800 text-ecsess-300 self-start rounded-full px-2 py-0.5 text-sm font-medium"
				>
					{category}
				</span>
			{/each}
		</div>

		<p class="text-ecsess-400 min-h-0 overflow-hidden text-left text-sm leading-relaxed">
			{description}
		</p>
	</div>
</Link>
