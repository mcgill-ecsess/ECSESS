<script lang="ts">
	import { page } from '$app/state';
	import NavButton from './NavButton.svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import type { NavItem } from '$lib/nav';

	let {
		label,
		items,
		onSelect = null
	}: {
		label: string;
		items: NavItem[];
		onSelect?: (() => void) | null;
	} = $props();

	let open = $state(false);

	const isChildActive = $derived(items.some((item) => page.url.pathname === item.href));
</script>

<div data-component="NavMobileExpansion" class="w-full">
	<button
		type="button"
		class="group flex w-full items-center justify-between rounded-md px-4 py-2.5 text-base font-semibold transition-colors duration-150 hover:cursor-pointer
			{open
			? 'bg-ecsess-800/70 text-ecsess-50'
			: isChildActive
				? 'bg-ecsess-800/40 text-ecsess-50'
				: 'text-ecsess-200 hover:bg-ecsess-800/50 hover:text-ecsess-50'}"
		onclick={() => (open = !open)}
		aria-expanded={open}
	>
		<span>{label}</span>
		<ChevronDown
			class="size-4 transition-transform duration-200 ease-in-out {open
				? 'rotate-180 text-ecsess-50'
				: 'text-ecsess-300 group-hover:text-ecsess-100'}"
		/>
	</button>

	{#if open}
		<div
			class="border-ecsess-700/60 my-1 ml-3 flex flex-col gap-1 border-l-2 py-1 pl-3"
			transition:slide={{ duration: 180 }}
		>
			{#each items as item}
				<NavButton href={item.href} variant="mobile-secondary" onclick={() => onSelect?.()}>
					{item.label}
				</NavButton>
			{/each}
		</div>
	{/if}
</div>
