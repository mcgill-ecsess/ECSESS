<script lang="ts">
	let { active = false } = $props<{
		active?: boolean;
	}>();
</script>

<div class="relative">
	<div
		class="bg-ecsess-500 relative inline-flex size-2.5 items-center justify-center rounded-full transition-all duration-200 {active
			? 'bg-ecsess-200'
			: 'bg-ecsess-500'}"
	>
		{#if active}
			<div
				class="bg-ecsess-100 relative inline-flex size-2.5 animate-ping items-center justify-center rounded-full"
			></div>
		{/if}
	</div>
</div>
