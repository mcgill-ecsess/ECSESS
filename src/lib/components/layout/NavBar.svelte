<script lang="ts">
	import NavButton from './NavButton.svelte';
	import NavExpansion from './NavExpansion.svelte';
	import NavMobileExpansion from './NavMobileExpansion.svelte';
	import ECSESS from 'assets/ECSESS.png';
	import { Menu } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	import RichText from '$lib/components/RichText.svelte';
	import type { InputValue } from '@portabletext/svelte';

	let { notification = null }: { notification?: InputValue | null } = $props();


	let menuHidden = $state(true);

	const teamItems = [
		{href: '/council', label: 'Council' },
		{ href: '/socialcom', label: 'Social Committee' },
		{ href: '/externalcom', label: 'External Committee' },
		{ href: '/devteam', label: 'Dev Team' },
		{ href: '/bits', label: 'ECSESS Bits' },
		{ href: '/alumni', label: 'ECSESS Alumni' }
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
	const hasNotification = $derived(Array.isArray(notification) && notification.length > 0);
	const announcementIntro = 'ECSESS Election: Voting period is happening! Vote now: ';
	const announcementLinkUrl = 'https://ssmu.simplyvoting.com';
	const announcementLinkText = 'ssmu.simplyvoting.com';
</script>

<div class="sticky top-0 z-40 w-full" id="NavBar" data-component="NavBar">
	<nav
		class="bg-ecsess-black/75 text-ecsess-100 border-ecsess-800/60 w-full border-b py-1 backdrop-blur-md"
	>
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
					<NavButton href="/partnership">Partnership</NavButton>
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
				<!-- <NavButton href="/council">Council</NavButton> -->
				<NavExpansion label="Council" items={teamItems} />
				<NavButton href="/join">Join ECSESS</NavButton>
				<NavButton href="/partnership">Partnership</NavButton>
				<NavExpansion label="Sponsor" items={sponsorItems} />
				<NavExpansion label="Resources" items={resourcesItems} />
			</div>
		</div>
	</nav>


	{#if hasNotification}
		<div
			class="nav-notification border-ecsess-700/40 bg-ecsess-800/45 border-b px-4 py-2.5 backdrop-blur-sm"
			role="alert"
		>
			<RichText value={notification} />
		</div>
	{/if}
</div>
