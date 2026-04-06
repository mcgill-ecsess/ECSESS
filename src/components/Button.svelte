<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
	type Size = 'sm' | 'md' | 'lg';

	let {
		children,
		variant = 'primary',
		size = 'md',
		href = undefined,
		external = false,
		disabled = false,
		type = 'button',
		class: className = '',
		onclick,
		ariaLabel = undefined
	}: {
		children: Snippet;
		variant?: Variant;
		size?: Size;
		href?: string;
		external?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		onclick?: (e: MouseEvent) => void;
		ariaLabel?: string;
	} = $props();

	const sizeClasses: Record<Size, string> = {
		sm: 'min-h-9 px-3 py-2 text-sm',
		md: 'min-h-11 px-4 py-2.5 text-sm',
		lg: 'min-h-12 px-5 py-3 text-lg'
	};

	const variantClasses: Record<Variant, string> = {
		primary:
			'border border-transparent bg-primary text-primary-content hover:bg-primary-hover active:bg-primary-hover',
		secondary:
			'border border-primary bg-primary-soft text-base-content hover:bg-primary-hover active:bg-primary-soft',
		ghost:
			'border border-transparent bg-transparent text-base-content hover:bg-base active:bg-primary-soft',
		outline:
			'border-2 border-muted bg-primary-soft text-primary-content hover:bg-primary-soft active:bg-base'
	};

	const focusRing =
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:ring-offset-base';

	const base = `inline-flex w-fit max-w-full cursor-pointer items-center justify-center gap-2 rounded-(--radius-control) font-semibold transition-colors ${focusRing} disabled:cursor-not-allowed disabled:bg-primary-soft disabled:text-border`;

	const classes = $derived(
		`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim()
	);
</script>

{#if href && !disabled}
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		class={classes}
		{onclick}
		aria-label={ariaLabel}
	>
		{@render children()}
	</a>
{:else if href && disabled}
	<span class={classes} aria-disabled="true" aria-label={ariaLabel}>{@render children()}</span>
{:else}
	<button {type} {disabled} class={classes} {onclick} aria-label={ariaLabel}>
		{@render children()}
	</button>
{/if}
