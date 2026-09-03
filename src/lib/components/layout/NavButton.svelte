<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	type NavButtonVariant = 'desktop-primary' | 'mobile-primary' | 'mobile-secondary';

	let {
		href,
		children,
		variant = 'desktop-primary',
		dropdown = false,
		onclick = null,
		class: className = ''
	}: {
		href: string;
		children: Snippet;
		variant?: NavButtonVariant;
		dropdown?: boolean;
		onclick?: ((e: MouseEvent) => void) | null;
		class?: string;
	} = $props();

	const resolvedVariant = $derived<NavButtonVariant>(dropdown ? 'mobile-secondary' : variant);

	const isActive = $derived(page.url.pathname === href);
</script>

{#if resolvedVariant === 'desktop-primary'}
	<a
		{href}
		{onclick}
		data-component="NavButton"
		class="mx-0.5 inline-flex items-center rounded-none border-b-4 px-6 py-2 text-sm font-semibold transition-all duration-150 hover:cursor-pointer
			{isActive
			? 'border-ecsess-300 text-ecsess-50'
			: 'text-ecsess-200 hover:border-ecsess-300 hover:text-ecsess-100 border-transparent'} {className}"
	>
		{@render children()}
	</a>
{:else if resolvedVariant === 'mobile-primary'}
	<a
		{href}
		{onclick}
		data-component="NavButton"
		class="flex w-full items-center rounded-md px-4 py-2.5 text-base font-semibold transition-colors duration-150 hover:cursor-pointer
			{isActive
			? 'bg-ecsess-800/80 text-ecsess-50 font-bold'
			: 'text-ecsess-200 hover:bg-ecsess-800/50 hover:text-ecsess-50'} {className}"
	>
		{@render children()}
	</a>
{:else}
	<a
		{href}
		{onclick}
		data-component="NavButton"
		class="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 hover:cursor-pointer
			{isActive
			? 'bg-ecsess-600/40 text-ecsess-50 font-semibold'
			: 'text-ecsess-300 hover:bg-ecsess-800/40 hover:text-ecsess-50'} {className}"
	>
		{@render children()}
	</a>
{/if}
