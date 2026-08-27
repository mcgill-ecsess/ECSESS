<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown } from '@lucide/svelte';
	import type { NavItem } from '$lib/nav';

	let {
		label,
		items,
		open = false,
		onToggle
	}: {
		label: string;
		items: NavItem[];
		open?: boolean;
		onToggle: () => void;
	} = $props();

	const isActive = $derived(items.some((item: NavItem) => page.url.pathname === item.href));
</script>

<div class="mx-1">
	<button
		type="button"
		onclick={onToggle}
		aria-expanded={open}
		class="hover:text-ecsess-100 hover:border-ecsess-100 text-ecsess-200 active:text-ecsess-500 active:border-ecsess-500
			mx-0.5 flex items-center gap-1 rounded-none border-b-4 px-6 py-2 font-semibold
			transition-all hover:cursor-pointer active:scale-99
			{isActive ? 'border-ecsess-300' : 'border-transparent'}"
	>
		{label}
		<ChevronDown
			class="size-4 transition-transform duration-200 ease-in-out {open ? 'rotate-180' : ''}"
		/>
	</button>
</div>
