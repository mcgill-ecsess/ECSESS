<script>
	let { value, selected, onclick, children } = $props();
</script>

<div>
	<button
		{value}
		onclick={() => onclick(value)}
		class="hover:border-b-ecsess-200 {selected
			? 'border-b-ecsess-200'
			: 'border-b-transparent'} border-b-4 px-2 pb-2 text-lg transition-all ease-in-out"
	>
		{@render children()}
	</button>
</div>
