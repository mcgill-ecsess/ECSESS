<script>
	let { value, selected, onclick, children } = $props();
</script>

<li>
	<button
		{value}
		onclick={() => onclick(value)}
		class="rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide transition-colors {selected
			? 'bg-ecsess-500 text-ecsess-50'
			: 'border-ecsess-700/60 text-ecsess-400 hover:border-ecsess-500 hover:text-ecsess-200 border'}"
	>
		{@render children()}
	</button>
</li>
