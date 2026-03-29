<script>
	import NavButton from './NavButton.svelte';
	import NavExpansion from './NavExpansion.svelte';
	import NavMobileExpansion from './NavMobileExpansion.svelte';
	import ECSESS from 'assets/ECSESS.png';
	import { Menu } from '@lucide/svelte';
	import { slide } from 'svelte/transition';

	let menuHidden = $state(true);

	const teamItems = [
		{ href: '/socialcom', label: 'Social Committee' },
		{ href: '/externalcom', label: 'External Committee' },
		{ href: '/devteam', label: 'Dev Team' },
		{ href: '/bits', label: 'ECSESS Bits' }
	];

	const sponsorItems = [
		{ href: '/sponsor', label: 'Package' },
		{ href: '/sponsorCal', label: 'Sponsor Calculator' }
	];

	const resourcesItems = [
		{ href: '/information', label: 'ECSESS Information' },
		{ href: '/academic', label: 'Academic' },
		{ href: '/resources', label: 'Extra Resources' }
	];

	const announcementIntro = 'ECSESS Election: Voting period is happening! Vote now: ';
	const announcementLinkUrl = 'https://ssmu.simplyvoting.com';
	const announcementLinkText = 'ssmu.simplyvoting.com';
</script>

<div class="sticky top-0 z-40 w-full">
	<nav class="bg-ecsess-black text-ecsess-100 relative w-full py-1">
		<!-- Small screens -->
		<div class="block lg:hidden">
			<div class="mx-4 flex items-center-safe justify-between">
				<a href="/">
					<img src={ECSESS} alt="ECSESS Logo" class="w-20 p-2" />
				</a>

				<button
					type="button"
					class="bg-ecsess-black-hover hover:bg-ecsess-800 active:bg-ecsess-900 grid size-10 place-items-center rounded-md transition-colors ease-in-out"
					onclick={() => { menuHidden = !menuHidden; }}
				>
					<Menu class="size-6 transition-transform duration-300 ease-in-out" />
				</button>
			</div>

			{#if !menuHidden}
				<div
					class="bg-ecsess-900 border-ecsess-700 mx-2 mb-2 flex w-auto flex-col gap-1 rounded-lg border-2 px-2 py-2 shadow-lg"
					transition:slide
				>
					<NavButton href="/events">Events</NavButton>
					<NavButton href="/council">Meet the Council</NavButton>
					<NavButton href="/join">Join ECSESS</NavButton>
					<NavMobileExpansion label="SubTeam" items={teamItems} />
					<NavMobileExpansion label="Sponsor" items={sponsorItems} />
					<NavMobileExpansion label="Resources" items={resourcesItems} />
				</div>
			{/if}
		</div>

		<!-- Medium and larger screens -->
		<div class="hidden lg:block">
			<div class="flex place-content-center items-end">
				<a href="/">
					<img src={ECSESS} alt="ECSESS Logo" class="h-12 p-2" />
				</a>
				<NavButton href="/events">Events</NavButton>
				<NavButton href="/council">Meet the Council</NavButton>
				<NavExpansion label="SubTeam" items={teamItems} />
				<NavButton href="/join">Join ECSESS</NavButton>
				<NavExpansion label="Sponsor" items={sponsorItems} />
				<NavExpansion label="Resources" items={resourcesItems} />
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
