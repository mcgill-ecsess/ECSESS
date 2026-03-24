<script>
	import NavButton from './NavButton.svelte';
	import ECSESS from 'assets/ECSESS.png';
	import { Menu } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	let menuHidden = $state(true);

	const announcementIntro = 'ECSESS Election: Voting period is happening! Vote now: ';
	const announcementLinkUrl = 'https://ssmu.simplyvoting.com';
	const announcementLinkText = 'ssmu.simplyvoting.com';
</script>

<div class="sticky top-0 z-40 w-full">
	<nav class="bg-ecsess-black text-ecsess-100 w-full py-1">
		<!-- Small screens -->
		<div class="block md:hidden">
			<div class="mx-4 flex items-center-safe justify-between">
				<a href="/">
					<img src={ECSESS} alt="ECSESS Logo" class="w-20 p-2" />
				</a>

				<button
					type="button"
					class="bg-ecsess-black-hover hover:bg-ecsess-800 active:bg-ecsess-900 grid size-10 place-items-center rounded-md transition-colors ease-in-out"
					onclick={() => {
						menuHidden = !menuHidden;
					}}
				>
					<Menu class="size-6 transition-transform duration-300 ease-in-out" />
				</button>
			</div>

			{#if !menuHidden}
				<div
					class="bg-ecsess-900 border-ecsess-700 mx-2 mb-2 flex w-auto flex-col gap-1 rounded-lg border-2 px-2 py-2 shadow-lg"
					transition:slide
				>
					<NavButton href="/">Home</NavButton>
					<NavButton href="/council">Meet the council</NavButton>
					<NavButton href="/events">Events</NavButton>
					<NavButton href="/resources">Resources</NavButton>
					<NavButton href="/devteam">Dev Team</NavButton>
					<NavButton href="/join">Join ECSESS</NavButton>
				</div>
			{/if}
		</div>

		<!-- Medium and larger screens -->
		<div class="hidden md:block">
			<div class="flex place-content-center items-end">
				<a href="/">
					<img src={ECSESS} alt="ECSESS Logo" class="h-12 p-2" />
				</a>
				<NavButton href="/">Home</NavButton>
				<NavButton href="/council">Meet the council</NavButton>
				<NavButton href="/events">Events</NavButton>
				<NavButton href="/resources">Resources</NavButton>
				<NavButton href="/devteam">Dev Team</NavButton>
				<NavButton href="/join">Join ECSESS</NavButton>
			</div>
		</div>
	</nav>
	<!-- Small announcement underneath navbar -->
	<div class="border-ecsess-black bg-ecsess-800 border-b px-4 py-2 shadow-sm" role="alert">
		<p class="text-ecsess-100 text-center text-sm font-medium md:text-base">
			{announcementIntro}<a
				href={announcementLinkUrl}
				class="text-ecsess-50 decoration-ecsess-400 hover:decoration-ecsess-300 underline underline-offset-2"
			>
				{announcementLinkText}
			</a>
		</p>
	</div>
</div>
