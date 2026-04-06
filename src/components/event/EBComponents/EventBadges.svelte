<script lang="ts">
	let { isPastEvent = false, eventCategory } = $props<{
		isPastEvent?: boolean;
		eventCategory?: string[];
	}>();
</script>

<div
	class="pointer-events-none absolute top-0 right-0 left-0 z-30 flex items-start justify-between gap-2 p-4"
>
	{#if isPastEvent}
		<span
			class="bg-primary-soft text-base-content rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase backdrop-blur-sm"
		>
			Past Event
		</span>
	{:else}
		<span
			class="bg-muted text-accent-content rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase backdrop-blur-sm"
		>
			Upcoming
		</span>
	{/if}

	{#if eventCategory && eventCategory.length > 0}
		<div class="flex flex-wrap justify-end gap-2">
			{#each eventCategory as category}
				<span
					class="bg-primary text-primary-content rounded-full px-3 py-1.5 text-xs font-bold tracking-wider uppercase backdrop-blur-sm"
				>
					{category}
				</span>
			{/each}
		</div>
	{/if}
</div>
