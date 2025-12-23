<script>
	let { value, onclick, children } = $props();

</script>

<div>
	<button
		{value}
		onclick={() => onclick(value)}
		class="hover:border-b-ecsess-200 data-[state=active]:border-b-ecsess-400 border-b-4 border-b-transparent px-2 pb-2 text-lg transition-all ease-in-out"
	>
		{@render children()}
	</button>
</div>
