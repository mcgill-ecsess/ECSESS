<script lang="ts">
	import NavButton from './NavButton.svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	interface NavItem {
		href: string;
		label: string;
	}

	let { label, items }: { label: string; items: NavItem[] } = $props();

	let open = $state(false);
</script>

<button
	type="button"
	class="hover:text-ecsess-100 hover:bg-ecsess-800 text-ecsess-200 flex w-full items-center justify-center rounded-md px-6 py-2 font-semibold transition-colors hover:cursor-pointer"
	onclick={() => (open = !open)}
>
	{label}
	<ChevronDown
		class="size-4 transition-transform duration-200 ease-in-out {open ? 'rotate-180' : ''}"
	/>
</button>

{#if open}
	<div class="border-ecsess-700 ml-3 flex flex-col gap-1 border-l-2 pl-2" transition:slide>
		{#each items as item}
			<NavButton href={item.href}>{item.label}</NavButton>
		{/each}
	</div>
{/if}
