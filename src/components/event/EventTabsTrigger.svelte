<script>
	let { value, selected, onclick, children } = $props();
</script>

<div>
	<button
		type="button"
		{value}
		onclick={() => onclick(value)}
		class="text-base-content hover:border-b-base-content focus-visible:ring-offset-base focus-visible:ring-muted border-b-4 px-2 pb-2 text-lg transition-all ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 {selected
			? 'border-b-base-content'
			: 'border-b-transparent'}"
	>
		{@render children()}
	</button>
</div>
