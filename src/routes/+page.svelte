<script>
	import OhSchedule from 'components/officehour/OHSchedule.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import AffiliatedGroups from 'components/homepage/AffiliatedGroups.svelte';
	import Sponsors from 'components/homepage/Sponsors.svelte';
	import QuickLinks from 'components/QuickLinks.svelte';

	/** loading things from the server side */
	let { data } = $props();

	// Win2k window state
	let introMinimized = $state(false);
	let ohMinimized = $state(false);
	let sponsorsMinimized = $state(false);
	let clubsMinimized = $state(false);

	const year = new Date().getFullYear();
</script>

<!-- SEO Meta header tags -->
<SeoMetaTags canonical={data.canonical} />

<!-- Win2k Desktop background with windows -->
<div style="background: #008080; min-height: 100vh; padding: 8px 8px 80px 8px;">

	<!-- ══════════════════════════════════════ -->
	<!--  Window 1: ECSESS Introduction        -->
	<!-- ══════════════════════════════════════ -->
	<div class="win-window" style="margin-bottom: 8px;">
		<!-- Title bar -->
		<div class="win-titlebar">
			<!-- Win2k IE globe icon -->
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;" aria-hidden="true">
				<circle cx="12" cy="12" r="10" stroke="#a6caf0" stroke-width="2" fill="#0a246a"/>
				<path d="M2 12h20M12 2c-3 4-3 16 0 20M12 2c3 4 3 16 0 20" stroke="#a6caf0" stroke-width="1.5"/>
			</svg>
			<span class="flex-1">Welcome to ECSESS - Microsoft Internet Explorer</span>
			<div class="flex gap-0.5">
				<button
					class="win-titlebar-btn"
					onclick={() => { introMinimized = !introMinimized; }}
					aria-label={introMinimized ? 'Restore' : 'Minimize'}
					title={introMinimized ? 'Restore' : 'Minimize'}
				>_</button>
				<button class="win-titlebar-btn" aria-label="Maximize" title="Maximize">□</button>
				<button class="win-titlebar-btn" style="background:#c0392b; color:#fff; font-weight:bold;" aria-label="Close" title="Close">✕</button>
			</div>
		</div>

		<!-- Win2k menu bar -->
		<div class="win-menu-bar hidden md:flex text-xs">
			<span class="win-menu-item"><u>F</u>ile</span>
			<span class="win-menu-item"><u>E</u>dit</span>
			<span class="win-menu-item"><u>V</u>iew</span>
			<span class="win-menu-item">F<u>a</u>vorites</span>
			<span class="win-menu-item"><u>T</u>ools</span>
			<span class="win-menu-item"><u>H</u>elp</span>
		</div>

		<!-- Win2k toolbar (address bar) -->
		<div
			class="hidden md:flex items-center gap-2 px-2 py-1"
			style="background: #d4d0c8; border-bottom: 1px solid #808080;"
		>
			<span style="font-size:11px; color:#000;">Address</span>
			<div class="win-input flex-1 flex items-center gap-1" style="padding: 1px 4px;">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<circle cx="12" cy="12" r="10" stroke="#0a246a" stroke-width="2" fill="#dbeafe"/>
					<path d="M2 12h20M12 2c-3 4-3 16 0 20" stroke="#0a246a" stroke-width="1.5"/>
				</svg>
				<span style="font-size:12px; color:#0000ff;">https://ecsess.mcgilleus.ca/</span>
			</div>
			<button class="win-btn" style="font-size:11px; min-width:auto; padding: 2px 8px;">Go</button>
		</div>

		{#if !introMinimized}
			<!-- Window content -->
			<div style="background: #ffffff; padding: 16px;">
				<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start;">
					<!-- Left: About -->
					<div>
						<!-- Win2k group box -->
						<fieldset class="win-groupbox" style="margin-bottom: 12px;">
							<legend style="font-weight: bold; font-size: 12px; padding: 0 4px;">About ECSESS</legend>

							<h1 style="font-size: 18px; font-weight: bold; color: #000080; margin-bottom: 8px;">
								We are probably ECSESS!
							</h1>

							<p style="font-size: 12px; line-height: 1.6; color: #000; margin-bottom: 12px;">
								<strong>Electrical, Computer &amp; Software Engineering Students&apos; Society at McGill (ECSESS)</strong>
								is the student council which helps McGill ECSE students in their
								<strong>academic</strong>,
								<strong>technical</strong>,
								<strong>social</strong> and
								<strong>professional</strong> progression.
							</p>

							<!-- Win2k progress/status bar decoration -->
							<div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
								{#each ['Academic', 'Technical', 'Social', 'Professional'] as tag}
									<span
										style="background: #0a246a; color: #fff; font-size: 10px; padding: 1px 6px; border-top: 1px solid #a6caf0; border-left: 1px solid #a6caf0; border-right: 1px solid #000; border-bottom: 1px solid #000;"
									>{tag}</span>
								{/each}
							</div>
						</fieldset>

						<!-- Quick Links -->
						<QuickLinks />
					</div>

					<!-- Right: Featured video in a nested window -->
					<div class="win-window" style="margin: 0;">
						<div class="win-titlebar" style="font-size: 11px;">
							<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<rect x="2" y="5" width="20" height="14" rx="2" fill="#a6caf0" stroke="#fff" stroke-width="1"/>
								<polygon points="10,9 10,15 16,12" fill="#0a246a"/>
							</svg>
							<span class="flex-1">Windows Media Player - Featured Content</span>
							<div class="flex gap-0.5">
								<button class="win-titlebar-btn">_</button>
								<button class="win-titlebar-btn">□</button>
								<button class="win-titlebar-btn" style="background:#c0392b; color:#fff;">✕</button>
							</div>
						</div>
						<div style="background: #000; aspect-ratio: 16/9;">
							<iframe
								class="block w-full h-full"
								style="width: 100%; aspect-ratio: 16/9; display: block;"
								src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&playsinline=1&rel=0"
								title="Rick Astley - Never Gonna Give You Up"
								allow="autoplay; encrypted-media; picture-in-picture"
								allowfullscreen
							></iframe>
						</div>
						<!-- Media player controls bar -->
						<div
							class="win-menu-bar flex items-center gap-2 px-2 py-1"
							style="font-size: 11px;"
						>
							<button class="win-btn" style="min-width:auto; padding: 1px 6px; font-size:10px;">⏮</button>
							<button class="win-btn" style="min-width:auto; padding: 1px 6px; font-size:10px;">⏪</button>
							<button class="win-btn" style="min-width:auto; padding: 1px 10px; font-size:10px;">▶</button>
							<button class="win-btn" style="min-width:auto; padding: 1px 6px; font-size:10px;">⏩</button>
							<button class="win-btn" style="min-width:auto; padding: 1px 6px; font-size:10px;">⏭</button>
							<div class="win-sunken flex-1 h-3 mx-1" style="background: #fff;">
								<div style="width: 30%; height: 100%; background: #0a246a;"></div>
							</div>
							<span style="font-size:10px; color:#000;">0:00 / ∞</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Status bar -->
			<div class="win-statusbar flex gap-4 text-xs">
				<div class="win-sunken px-2" style="flex: 1; font-size: 11px;">Done</div>
				<div class="win-sunken px-2" style="font-size: 11px;">Internet</div>
			</div>
		{/if}
	</div>

	<!-- ══════════════════════════════════════ -->
	<!--  Window 2: Office Hours               -->
	<!-- ══════════════════════════════════════ -->
	<div class="win-window" style="margin-bottom: 8px;">
		<div class="win-titlebar">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;" aria-hidden="true">
				<rect x="3" y="4" width="18" height="17" rx="1" fill="#0a246a" stroke="#a6caf0" stroke-width="1.5"/>
				<rect x="3" y="4" width="18" height="5" rx="1" fill="#c0392b"/>
				<line x1="8" y1="2" x2="8" y2="6" stroke="#fff" stroke-width="2"/>
				<line x1="16" y1="2" x2="16" y2="6" stroke="#fff" stroke-width="2"/>
				<line x1="7" y1="12" x2="17" y2="12" stroke="#a6caf0" stroke-width="1"/>
				<line x1="7" y1="16" x2="14" y2="16" stroke="#a6caf0" stroke-width="1"/>
			</svg>
			<span class="flex-1">Lounge Office Hours - Calendar</span>
			<div class="flex gap-0.5">
				<button
					class="win-titlebar-btn"
					onclick={() => { ohMinimized = !ohMinimized; }}
					aria-label={ohMinimized ? 'Restore' : 'Minimize'}
				>_</button>
				<button class="win-titlebar-btn">□</button>
				<button class="win-titlebar-btn" style="background:#c0392b; color:#fff;">✕</button>
			</div>
		</div>

		{#if !ohMinimized}
			<div style="background: #ffffff; padding: 16px;">
				<div style="display:flex; align-items:baseline; gap: 12px; margin-bottom: 8px;">
					<h2 id="office-hours" style="font-size: 15px; font-weight: bold; color: #000080;">
						Lounge Office Hours
					</h2>
					{#if data.ohLastUpdated}
						<span style="font-size: 11px; color: #808080; font-style: italic;">Semester: {data.ohLastUpdated}</span>
					{/if}
				</div>

				<fieldset class="win-groupbox" style="margin-bottom: 12px;">
					<legend style="font-weight: bold; font-size: 11px; padding: 0 4px; color: #0a246a;">Location Info</legend>
					<p style="font-size: 12px; color: #000; line-height: 1.5;">
						Come visit us in our student lounge at <strong>ENGTR 1060</strong> to grab a coffee (free!), play Mario Kart, or just chat about anything!
					</p>
				</fieldset>

				<OhSchedule allOhs={data.allOHs} />
			</div>
			<div class="win-statusbar text-xs">
				<div class="win-sunken px-2" style="flex: 1; font-size: 11px;">ENGTR 1060 · Open {data.allOHs?.length ?? 0} slots</div>
			</div>
		{/if}
	</div>

	<!-- ══════════════════════════════════════ -->
	<!--  Window 3: Sponsors                   -->
	<!-- ══════════════════════════════════════ -->
	<div class="win-window" style="margin-bottom: 8px;">
		<div class="win-titlebar">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;" aria-hidden="true">
				<rect x="2" y="6" width="20" height="12" rx="2" fill="#0a246a" stroke="#a6caf0" stroke-width="1.5"/>
				<circle cx="12" cy="12" r="3" fill="#ffd700" stroke="#a6caf0" stroke-width="1"/>
				<line x1="5" y1="12" x2="9" y2="12" stroke="#a6caf0" stroke-width="1.5"/>
				<line x1="15" y1="12" x2="19" y2="12" stroke="#a6caf0" stroke-width="1.5"/>
			</svg>
			<span class="flex-1">ECSESS Sponsors - Partnerships</span>
			<div class="flex gap-0.5">
				<button
					class="win-titlebar-btn"
					onclick={() => { sponsorsMinimized = !sponsorsMinimized; }}
					aria-label={sponsorsMinimized ? 'Restore' : 'Minimize'}
				>_</button>
				<button class="win-titlebar-btn">□</button>
				<button class="win-titlebar-btn" style="background:#c0392b; color:#fff;">✕</button>
			</div>
		</div>

		{#if !sponsorsMinimized}
			<div style="background: #ffffff; padding: 16px;">
				<Sponsors sponsors={data.sponsors} lastUpdated={data.sponsorsLastUpdated} />
			</div>
		{/if}
	</div>

	<!-- ══════════════════════════════════════ -->
	<!--  Window 4: Affiliated Groups          -->
	<!-- ══════════════════════════════════════ -->
	<div class="win-window" style="margin-bottom: 8px;">
		<div class="win-titlebar">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;" aria-hidden="true">
				<circle cx="9" cy="7" r="3" fill="#a6caf0" stroke="#fff" stroke-width="1"/>
				<circle cx="17" cy="7" r="3" fill="#a6caf0" stroke="#fff" stroke-width="1"/>
				<path d="M3 20c0-4 3-6 6-6h6c3 0 6 2 6 6" fill="#0a246a" stroke="#a6caf0" stroke-width="1"/>
			</svg>
			<span class="flex-1">Subcommittees &amp; Affiliated Groups - My Computer</span>
			<div class="flex gap-0.5">
				<button
					class="win-titlebar-btn"
					onclick={() => { clubsMinimized = !clubsMinimized; }}
					aria-label={clubsMinimized ? 'Restore' : 'Minimize'}
				>_</button>
				<button class="win-titlebar-btn">□</button>
				<button class="win-titlebar-btn" style="background:#c0392b; color:#fff;">✕</button>
			</div>
		</div>

		{#if !clubsMinimized}
			<div style="background: #ffffff; padding: 16px;">
				<AffiliatedGroups />
			</div>
		{/if}
	</div>

	<!-- ══════════════════════════════════════════════════ -->
	<!--  Win2k Marquee ticker (classic IE/Geocities feel)  -->
	<!-- ══════════════════════════════════════════════════ -->
	<div
		class="win-window"
		style="margin-bottom: 8px; overflow: hidden;"
	>
		<div
			style="background: #000080; color: #ffff00; padding: 3px 8px; font-size: 11px; font-weight: bold; overflow: hidden; white-space: nowrap;"
		>
			<span style="display: inline-block; animation: marquee 18s linear infinite;">
				★ ECSESS Website v2.0 — Best viewed in Internet Explorer 6.0 at 800×600 resolution ★ &nbsp;&nbsp;&nbsp;
				Free coffee at ENGTR 1060! ★ &nbsp;&nbsp;&nbsp;
				Election results are out — visit ssmu.simplyvoting.com ★ &nbsp;&nbsp;&nbsp;
				© ECSESS {year} — Designed with &lt;3 &nbsp;&nbsp;&nbsp;
			</span>
		</div>
	</div>

</div>
