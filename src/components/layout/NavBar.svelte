<script>
	import NavButton from './NavButton.svelte';
	import ECSESS from 'assets/ECSESS.png';
	import { Menu, X } from '@lucide/svelte';
	import { slide } from 'svelte/transition';
	let menuHidden = $state(true);

	const announcementIntro = 'ECSESS Election results are out! Check them out here: ';
	const announcementLinkUrl = 'https://ssmu.simplyvoting.com/voting/guest/elections/286648/results';
	const announcementLinkText = 'ssmu.simplyvoting.com';
</script>

<div class="sticky top-0 z-40 w-full">
	<nav class="border-border bg-primary-background w-full border-b" aria-label="Main navigation">
		<!-- Small screens -->
		<div class="block md:hidden">
			<div class="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2">
				<a
					href="/"
					class="focus-visible:ring-ring focus-visible:ring-offset-primary-background shrink-0 rounded-(--radius-control) p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
				>
					<img src={ECSESS} alt="ECSESS home" class="w-18" width="72" height="72" />
				</a>

				<button
					type="button"
					class="text-primary-content hover:bg-primary-soft focus-visible:ring-ring focus-visible:ring-offset-primary-background grid size-10 shrink-0 place-items-center rounded-(--radius-control) transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
					onclick={() => {
						menuHidden = !menuHidden;
					}}
					aria-expanded={!menuHidden}
					aria-controls="mobile-nav-menu"
					aria-label={menuHidden ? 'Open menu' : 'Close menu'}
				>
					{#if menuHidden}
						<Menu class="size-6" strokeWidth={2} />
					{:else}
						<X class="size-6" strokeWidth={2} />
					{/if}
				</button>
			</div>

			{#if !menuHidden}
				<div
					id="mobile-nav-menu"
					class="border-border bg-primary-background mx-3 mb-3 flex flex-col overflow-hidden rounded-(--radius-panel) border px-0 py-0"
					transition:slide={{ duration: 200 }}
				>
					<NavButton href="/">Home</NavButton>
					<NavButton href="/council">Meet the council</NavButton>
					<NavButton href="/events">Events</NavButton>
					<NavButton href="/resources">Resources</NavButton>
					<NavButton href="/devteam">Dev Team</NavButton>
					<NavButton href="/join">Join ECSESS</NavButton>
					<NavButton href="/branding">Branding</NavButton>
				</div>
			{/if}
		</div>

		<!-- Medium and larger -->
		<div class="hidden md:block">
			<div class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-0 lg:px-6">
				<a
					href="/"
					class="focus-visible:ring-ring focus-visible:ring-offset-primary-background flex shrink-0 py-2 focus:outline-none focus-visible:rounded-(--radius-control) focus-visible:ring-2 focus-visible:ring-offset-2"
				>
					<img src={ECSESS} alt="ECSESS home" class="h-10 w-auto" height="40" />
				</a>
				<div
					class="flex min-w-0 flex-1 flex-wrap items-end justify-end gap-x-0.5 gap-y-0 lg:gap-x-1"
				>
					<NavButton href="/">Home</NavButton>
					<NavButton href="/council">Meet the council</NavButton>
					<NavButton href="/events">Events</NavButton>
					<NavButton href="/resources">Resources</NavButton>
					<NavButton href="/devteam">Dev Team</NavButton>
					<NavButton href="/join">Join ECSESS</NavButton>
					<NavButton href="/branding">Branding</NavButton>
				</div>
			</div>
		</div>
	</nav>

	<div class="border-border bg-primary-background border-b px-4 py-2.5" role="alert">
		<p class="text-primary-content text-center text-lg leading-snug font-medium">
			{announcementIntro}<a
				href={announcementLinkUrl}
				class="text-accent decoration-accent hover:text-primary-content font-semibold underline underline-offset-2 transition-colors"
			>
				{announcementLinkText}
			</a>
		</p>
	</div>
</div>
