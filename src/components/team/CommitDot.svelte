<script lang="ts">
	let { active = false } = $props<{
		active?: boolean;
	}>();
</script>

<div class="relative">
	<div
		class="relative inline-flex items-center justify-center rounded-full transition-all duration-200 size-2.5 bg-ecsess-500 {active
			? 'bg-ecsess-200'
			: 'bg-ecsess-500'}"
	>
		{#if active}
			<div class="relative inline-flex items-center justify-center bg-ecsess-100 size-2.5 animate-ping rounded-full"></div>
		{/if}
	</div>
</div>
