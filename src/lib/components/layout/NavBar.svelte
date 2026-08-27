<script lang="ts">
	import NavButton from './NavButton.svelte';
	import NavExpansion from './NavExpansion.svelte';
	import NavMobileExpansion from './NavMobileExpansion.svelte';
	import ECSESS from 'assets/ECSESS.png';
	import { Menu, X } from '@lucide/svelte';
	import RichText from '$lib/components/RichText.svelte';
	import { navConfig, type NavGroup } from '$lib/nav';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import type { InputValue } from '@portabletext/svelte';

	let { notification = null }: { notification?: InputValue | null } = $props();

	let menuHidden = $state(true);
	let openGroupLabel = $state<string | null>(null);
	let desktopNavEl = $state<HTMLDivElement | null>(null);

	const hasNotification = $derived(Array.isArray(notification) && notification.length > 0);
	const openGroup = $derived(
		navConfig.find(
			(entry): entry is NavGroup => entry.type === 'group' && entry.label === openGroupLabel
		) ?? null
	);

	afterNavigate(() => {
		menuHidden = true;
		openGroupLabel = null;
	});

	function toggleGroup(label: string) {
		openGroupLabel = openGroupLabel === label ? null : label;
	}

	function handleDocumentClick(event: MouseEvent) {
		if (desktopNavEl && !desktopNavEl.contains(event.target as Node)) {
			openGroupLabel = null;
		}
	}

	$effect(() => {
		if (menuHidden) return;
		const mql = window.matchMedia('(min-width: 1024px)');
		const closeIfDesktop = () => {
			if (mql.matches) menuHidden = true;
		};
		closeIfDesktop();
		mql.addEventListener('change', closeIfDesktop);
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
			mql.removeEventListener('change', closeIfDesktop);
		};
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		menuHidden = true;
		openGroupLabel = null;
	}
</script>

<svelte:window onkeydown={handleKeydown} />
<svelte:document onclick={handleDocumentClick} />

<div class="sticky top-0 z-40 w-full" id="NavBar" data-component="NavBar">
	<nav
		class="bg-ecsess-black/75 text-ecsess-100 border-ecsess-800/60 relative z-10 w-full border-b py-1 backdrop-blur-md"
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
					aria-expanded={!menuHidden}
					aria-controls="mobile-nav-overlay"
					onclick={() => {
						menuHidden = !menuHidden;
					}}
				>
					<Menu class="size-6 transition-transform duration-300 ease-in-out" />
					<span class="sr-only">Open menu</span>
				</button>
			</div>
		</div>

		<!-- Medium and larger screens -->
		<div class="z-100 hidden lg:block" bind:this={desktopNavEl}>
			<div class="flex place-content-center items-end">
				<a href="/">
					<img src={ECSESS} alt="ECSESS Logo" class="h-12 p-2" />
				</a>
				{#each navConfig as entry}
					{#if entry.type === 'link'}
						<NavButton href={entry.href}>{entry.label}</NavButton>
					{:else}
						<NavExpansion
							label={entry.label}
							items={entry.items}
							open={openGroupLabel === entry.label}
							onToggle={() => toggleGroup(entry.label)}
						/>
					{/if}
				{/each}
			</div>
			{#if openGroup}
				<div
					class="border-ecsess-800/60 bg-ecsess-black/40 flex w-full justify-center gap-2 border-t px-4 py-3"
					transition:slide={{ duration: 180 }}
				>
					{#each openGroup.items as item}
						<a
							href={item.href}
							onclick={() => (openGroupLabel = null)}
							class="text-ecsess-200 hover:text-ecsess-100 hover:bg-ecsess-800/50 rounded-md px-6 py-2.5 text-sm font-semibold transition-colors
								{page.url.pathname === item.href ? 'text-ecsess-100 bg-ecsess-800/50' : ''}"
						>
							{item.label}
						</a>
					{/each}
				</div>
			{/if}
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

{#if !menuHidden}
	<div
		id="mobile-nav-overlay"
		data-component="NavMobileOverlay"
		class="bg-ecsess-black text-ecsess-100 fixed inset-0 z-50 flex flex-col lg:hidden"
	>
		<div class="border-ecsess-800/60 flex shrink-0 items-center justify-between border-b px-4 py-1">
			<a href="/" onclick={() => (menuHidden = true)}>
				<img src={ECSESS} alt="ECSESS Logo" class="w-20 p-2" />
			</a>
			<button
				type="button"
				class="bg-ecsess-black-hover hover:bg-ecsess-800 active:bg-ecsess-900 grid size-10 place-items-center rounded-md transition-colors ease-in-out"
				aria-expanded="true"
				aria-controls="mobile-nav-overlay"
				onclick={() => (menuHidden = true)}
			>
				<X class="size-6" />
				<span class="sr-only">Close menu</span>
			</button>
		</div>
		<nav class="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-4">
			<div class="flex flex-col gap-1">
				{#each navConfig as entry}
					{#if entry.type === 'link'}
						<NavButton href={entry.href}>{entry.label}</NavButton>
					{:else}
						<NavMobileExpansion label={entry.label} items={entry.items} />
					{/if}
				{/each}
			</div>
		</nav>
	</div>
{/if}
