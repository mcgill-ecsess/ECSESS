<script>
	let { href, children } = $props();
</script>

<a {href}>
	<button
		class="border-ecsess-black hover:border-ecsess-200 active:border-ecsess-400 border-b-4 px-6 py-2
    font-semibold transition-all"
	>
		{@render children()}
	</button>
</a>
