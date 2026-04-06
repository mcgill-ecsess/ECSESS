<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'default' | 'accent' | 'muted';

	let {
		children,
		variant = 'default',
		onclick = undefined,
		class: className = ''
	}: {
		children: Snippet;
		variant?: Variant;
		onclick?: (e: MouseEvent) => void;
		class?: string;
	} = $props();

	const variantClasses: Record<Variant, string> = {
		default:
			'border border-primary bg-primary-hover text-primary-content hover:bg-primary active:bg-primary-hover',
		accent:
			'border border-primary bg-accent text-accent-content hover:bg-accent hover:text-primary-background',
		muted:
			'border border-primary-hover bg-base text-base-content hover:bg-primary-soft active:bg-base'
	};

	const base =
		'inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base';

	const classes = $derived(`${base} ${variantClasses[variant]} ${className}`.trim());
</script>

{#if onclick}
	<button type="button" class={classes} {onclick}>{@render children()}</button>
{:else}
	<span class={classes}>{@render children()}</span>
{/if}
