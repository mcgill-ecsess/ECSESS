<script lang="ts">
	import { page } from '$app/state';
	import { ChevronDown } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	interface NavItem {
		href: string;
		label: string;
	}

	let { label, items }: { label: string; items: NavItem[] } = $props();

	let open = $state(false);
	let containerEl = $state<HTMLDivElement | null>(null);

	const isActive = $derived(items.some((item: NavItem) => page.url.pathname === item.href));

	function handleOutsideClick(e: MouseEvent) {
		if (containerEl && !containerEl.contains(e.target as Node)) {
			open = false;
		}
	}
</script>

<svelte:document onclick={handleOutsideClick} />

<div class="mx-1" bind:this={containerEl}>
	<button
		type="button"
		onclick={() => (open = !open)}
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

	{#if open}
		<div
			class="bg-ecsess-900 border-ecsess-700 absolute top-full left-0 right-0 z-50 flex w-full justify-center gap-2 border-y-2 px-8 py-3 shadow-lg"
			transition:fly={{ y: -6, duration: 150 }}
		>
			{#each items as item}
				<a
					href={item.href}
					onclick={() => (open = false)}
					class="hover:bg-ecsess-800 text-ecsess-200 hover:text-ecsess-100 rounded-md px-6 py-2.5 text-sm font-semibold transition-colors
						{page.url.pathname === item.href ? 'text-ecsess-100 bg-ecsess-800' : ''}"
				>
					{item.label}
				</a>
			{/each}
		</div>
	{/if}
</div>
