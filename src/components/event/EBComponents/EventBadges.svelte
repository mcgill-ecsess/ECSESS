<script lang="ts">
	let { isPastEvent = false, eventCategory } = $props<{
		isPastEvent?: boolean;
		eventCategory?: string[];
	}>();
</script>

<div class="absolute top-0 left-0 right-0 z-30 flex items-start justify-between gap-2 p-4 pointer-events-none">
	{#if isPastEvent}
		<span class="rounded-full bg-ecsess-800/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-300 backdrop-blur-sm">
			Past Event
		</span>
	{:else}
		<span class="rounded-full bg-ecsess-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
			Upcoming
		</span>
	{/if}

	{#if eventCategory && eventCategory.length > 0}
		<div class="flex flex-wrap justify-end gap-2">
			{#each eventCategory as category}
				<span class="rounded-full bg-ecsess-500/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
					{category}
				</span>
			{/each}
		</div>
	{/if}
</div>