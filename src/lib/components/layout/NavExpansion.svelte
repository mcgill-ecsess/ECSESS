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

	const isChildActive = $derived(items.some((item: NavItem) => page.url.pathname === item.href));
</script>

<div class="inline-flex">
	<button
		type="button"
		onclick={onToggle}
		aria-expanded={open}
		data-component="NavExpansion"
		class="group mx-0.5 inline-flex items-center gap-1 rounded-none border-b-4 px-6 py-2 text-sm font-semibold transition-all duration-150 hover:cursor-pointer
			{open || isChildActive
			? 'border-ecsess-300 text-ecsess-50'
			: 'text-ecsess-200 hover:border-ecsess-300 hover:text-ecsess-100 border-transparent'}"
	>
		<span>{label}</span>
		<ChevronDown
			class="size-4 transition-transform duration-200 ease-in-out {open
				? 'text-ecsess-50 rotate-180'
				: 'text-ecsess-300 group-hover:text-ecsess-100'}"
		/>
	</button>
</div>
