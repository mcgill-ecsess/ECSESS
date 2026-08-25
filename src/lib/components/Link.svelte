<script lang="ts">
	let { href, external = false, children, class: className = '' } = $props();
</script>

<a
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
	class={className}
>
	{@render children()}
</a>
