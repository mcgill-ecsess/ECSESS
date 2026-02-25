<script lang="ts">
	let {
		isPastEvent = false,
		eventCategory,
		inline = false
	} = $props<{
		isPastEvent?: boolean;
		eventCategory?: string[];
		inline?: boolean;
	}>();
</script>

<div
	class={inline
		? 'mt-3 flex flex-wrap items-center gap-2'
		: 'pointer-events-none absolute top-0 right-0 left-0 z-30 flex items-start justify-between gap-2 p-4'}
>
	{#if isPastEvent}
		<span
			class="bg-ecsess-800/90 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-gray-300 uppercase backdrop-blur-sm"
		>
			Past Event
		</span>
	{:else}
		<span
			class="bg-ecsess-400 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm"
		>
			Upcoming
		</span>
	{/if}

	{#if eventCategory && eventCategory.length > 0}
		<div class="flex flex-wrap {inline ? '' : 'justify-end'} gap-2">
			{#each eventCategory as category}
				<span
					class="bg-ecsess-500/90 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm"
				>
					{category}
				</span>
			{/each}
		</div>
	{/if}
</div>
