<script lang="ts">
	let { active = false } = $props<{
		active?: boolean;
	}>();
</script>

<div class="relative">
	<div
		class="relative inline-flex size-2.5 items-center justify-center rounded-full transition-all duration-200 {active
			? 'bg-accent'
			: 'bg-primary'}"
	>
		{#if active}
			<div
				class="bg-primary-content relative inline-flex size-2.5 animate-ping items-center justify-center rounded-full"
			></div>
		{/if}
	</div>
</div>
