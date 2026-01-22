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
	{disabled}
	{onclick}
	class="border-ecsess-200 bg-ecsess-500 rounded-md border
		{sizeClasses[size]}
		text-ecsess-50 hover:bg-ecsess-600/50 hover:border-ecsess-300 text-sm
		font-semibold transition-colors {className}"
>
	{@render children()}
</button>
