<script lang="ts">
	let { href, children, class: className = '', ...rest } = $props();
</script>

<a {href} class="no-underline {className}" style="text-decoration: none;" {...rest}>
	{@render children()}
</a>