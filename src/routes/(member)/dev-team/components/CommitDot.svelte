<script lang="ts">
	let { active = false }: { active?: boolean } = $props();
</script>

<div class="relative">
	<div
		class="relative inline-flex size-2.5 items-center justify-center rounded-full bg-ecsess-500 transition-all duration-200 {active
			? 'bg-ecsess-200'
			: 'bg-ecsess-500'}"
	>
		{#if active}
			<div
				class="relative inline-flex size-2.5 animate-ping items-center justify-center rounded-full bg-ecsess-100"
			></div>
		{/if}
	</div>
</div>
