<script lang="ts">
	type ButtonSize = 'sm' | 'md' | 'lg';

	let {
		children,
		onclick = null,
		disabled = false,
		size = 'md' as ButtonSize,
		class: className = ''
	} = $props();

	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'px-3 py-1.5',
		md: 'px-4 py-2',
		lg: 'px-2 py-2'
	};
</script>

<button
	disabled={disabled}
	onclick={onclick}
	class="rounded-md border border-ecsess-200 bg-ecsess-500
		{sizeClasses[size]}
		text-sm font-semibold text-ecsess-50 transition-colors
		hover:bg-ecsess-600/50 hover:border-ecsess-300
		disabled:pointer-events-none disabled:opacity-50 {className}"
>
	{@render children?.()}
</button>
