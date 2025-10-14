<script>
	let { href, children } = $props();
</script>

<a {href}>
	<button
		class="border-ecsess-black hover:border-ecsess-150 active:border-ecsess-300 border-b-4 px-6 py-2
    font-semibold transition-all hover:text-ecsess-100"
	>
		{@render children()}
	</button>
</a>
