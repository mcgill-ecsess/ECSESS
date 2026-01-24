<script lang="ts">
	let { active = false, size = 'md' } = $props<{
		active?: boolean;
		size?: 'sm' | 'md' | 'lg';
	}>();

	const sizeClasses = {
		sm: 'size-2.5',
		md: 'size-3',
		lg: 'size-4'
	};
</script>

<div class="relative {sizeClasses[size]}">
	{#if active}
		<div class="bg-ecsess-300 absolute inset-0 animate-ping rounded-full opacity-75"></div>
	{/if}
	<div
		class="relative rounded-full transition-all duration-200 {sizeClasses[size]} {active
			? 'bg-ecsess-300'
			: 'bg-ecsess-500'}"
	></div>
</div>
