<script>
	let { href = 'https://www.example.com', children } = $props();
</script>

<a {href} target="_blank" rel="noopener noreferrer" class="underline">
	{@render children()}
</a>
