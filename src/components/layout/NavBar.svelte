<script>
	import ECSESS from 'assets/ECSESS.png';
	import { slide } from 'svelte/transition';
	let menuHidden = $state(true);

	const announcementIntro = 'ECSESS Election results are out! Check them out here: ';
	const announcementLinkUrl = 'https://ssmu.simplyvoting.com/voting/guest/elections/286648/results';
	const announcementLinkText = 'ssmu.simplyvoting.com';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/council', label: 'Meet the council' },
		{ href: '/events', label: 'Events' },
		{ href: '/resources', label: 'Resources' },
		{ href: '/devteam', label: 'Dev Team' },
		{ href: '/join', label: 'Join ECSESS' },
	];
</script>

<!-- Windows 2000 Taskbar / Window chrome nav -->
<div class="sticky top-0 z-40 w-full">
	<!-- Taskbar (Start bar style) -->
	<div
		class="w-full flex items-stretch"
		style="background: linear-gradient(to bottom, #1c5fbd 0%, #0a246a 40%, #0a246a 60%, #1f5bbc 100%); min-height: 30px;"
	>
		<!-- Start button -->
		<a
			href="/"
			class="flex items-center gap-1 px-3 py-1 shrink-0"
			style="background: linear-gradient(to bottom, #5f9ed6, #2a6cb5); border-top: 1px solid #9ac3e8; border-right: 1px solid #08245a; font-weight: bold; font-size: 13px; color: #ffffff; text-shadow: 1px 1px 1px #000; min-width: 100px;"
		>
			<img src={ECSESS} alt="ECSESS Logo" style="height: 20px;" />
			<span style="font-size: 13px; font-weight: bold; color: #fff;">ECSESS</span>
		</a>

		<!-- Separator -->
		<div style="width: 1px; background: #08245a; margin: 2px 0;"></div>
		<div style="width: 1px; background: #3976c5; margin: 2px 0;"></div>

		<!-- Nav buttons (desktop) -->
		<div class="hidden md:flex items-center">
			{#each navItems as item}
				<a
					href={item.href}
					class="px-4 py-1 text-white text-sm hover:underline"
					style="font-size: 12px; color: #ffffff; text-shadow: 1px 1px 1px rgba(0,0,0,0.5); white-space: nowrap;"
				>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- Mobile hamburger -->
		<div class="flex md:hidden items-center ml-2">
			<button
				type="button"
				onclick={() => { menuHidden = !menuHidden; }}
				class="win-btn text-xs px-2 py-0.5"
				style="min-width: auto; font-size: 11px;"
				aria-label="Toggle navigation"
			>
				☰ Menu
			</button>
		</div>

		<!-- Spacer -->
		<div class="flex-1"></div>

		<!-- System tray clock area -->
		<div
			class="hidden md:flex items-center px-3"
			style="background: linear-gradient(to bottom, #1454b3, #0a246a); border-left: 1px solid #08245a; font-size: 11px; color: #ffffff;"
		>
			{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
		</div>
	</div>

	<!-- Mobile dropdown -->
	{#if !menuHidden}
		<div
			class="win-window md:hidden"
			style="margin: 2px 4px;"
			transition:slide
		>
			<div class="win-titlebar text-xs justify-between">
				<span>Navigation</span>
				<button onclick={() => { menuHidden = true; }} class="win-titlebar-btn">✕</button>
			</div>
			<div class="p-1 flex flex-col gap-0.5">
				{#each navItems as item}
					<a href={item.href} class="win-menu-item block" onclick={() => { menuHidden = true; }}>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Announcement bar (IE-style info bar) -->
	<div
		class="w-full flex items-center gap-2 px-3 py-1"
		style="background: #fffacd; border-top: 1px solid #d4d0c8; border-bottom: 2px solid #808080; font-size: 11px; color: #000;"
		role="alert"
	>
		<!-- IE info icon -->
		<span style="color:#0a246a; font-size:13px;" aria-hidden="true">ℹ</span>
		<span>{announcementIntro}</span>
		<a href={announcementLinkUrl} class="win-link" target="_blank" rel="noopener noreferrer">
			{announcementLinkText}
		</a>
	</div>
</div>
