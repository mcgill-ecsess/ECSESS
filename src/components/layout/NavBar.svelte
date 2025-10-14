<script>
	import NavButton from './NavButton.svelte';
	import ECSESS from 'assets/ECSESS.png';
	import { Menu } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	let isElectionTime = $state(false);
	let menuHidden = $state(true);
</script>

<nav class="bg-ecsess-black text-ecsess-200 sticky w-full py-1">
	<div class="block md:hidden">
		<div class="mx-4 flex items-center-safe justify-between">
			<a href="/">
				<img src={ECSESS} alt="ECSESS Logo" class="w-20 p-2" />
			</a>

			<button
				type="button"
				class="bg-ecsess-black-hover hover:bg-ecsess-800 grid size-10 place-items-center rounded-lg transition-colors ease-in-out active:bg-green-900"
				onclick={() => {
					menuHidden = !menuHidden;
				}}
			>
				<Menu class="size-6 transition-transform duration-300 ease-in-out" />
			</button>
		</div>

		{#if !menuHidden}
			<div class="flex flex-col place-items-center gap-1" transition:slide>
				<NavButton href="/">Home</NavButton>
				<NavButton href="/council">Meet the council</NavButton>
				<NavButton href="/events">Events</NavButton>
				<NavButton href="/resources">Resources</NavButton>
				{#if isElectionTime}
				<NavButton href="/join">Join ECSESS</NavButton>
				{/if}
			</div>
		{/if}
	</div>

	<div class="hidden md:block">
		<div class="flex place-content-center items-end">
			<a href="/">
				<img src={ECSESS} alt="ECSESS Logo" class="h-12 p-2" />
			</a>
			<NavButton href="/">Home</NavButton>
			<NavButton href="/council">Meet the council</NavButton>
			<NavButton href="/events">Events</NavButton>
			<NavButton href="/resources">Resources</NavButton>
			{#if isElectionTime}
				<NavButton href="/join">Join ECSESS</NavButton>
			{/if}
		</div>
	</div>
</nav>
