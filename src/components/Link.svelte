<script lang="ts">
	let {
		href = undefined,
		external = false,
		button = false,
		children,
		class: className = ''
	} = $props();
</script>

{#if href}
	<a
		href={href}
		class="{button ? '' : 'underline'} {className}"
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
	>
		{@render children?.()}
	</a>
{:else}
	<span class={className}>
		{@render children?.()}
	</span>
{/if}
