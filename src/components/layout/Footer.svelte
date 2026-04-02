<script lang="ts">
	import ECSESS from 'assets/ECSESS.png';
	const year = new Date().getFullYear();

	const socialLinks = [
		{ name: 'Instagram', url: 'https://www.instagram.com/mcgill_ecsess/', label: 'Instagram' },
		{ name: 'Facebook', url: 'https://www.facebook.com/ECSESS', label: 'Facebook' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/company/ecsess/', label: 'LinkedIn' },
		{ name: 'Linktree', url: 'https://linktr.ee/ecsess', label: 'Linktree' },
		{ name: 'Email', url: 'mailto:ecsess.president@mcgilleus.ca', label: 'Contact Us' },
		{ name: 'GitHub', url: 'https://github.com/mcgill-ecsess/', label: 'GitHub' },
	];
</script>

<!-- Win2k Taskbar / Status-strip footer -->
<div>
	<!-- Win2k style window panel footer -->
	<div
		class="win-window"
		style="margin: 4px 8px 8px; background: #d4d0c8;"
	>
		<div class="win-titlebar" style="font-size: 11px;">
			<img src={ECSESS} alt="ECSESS Logo" style="height: 14px;" />
			<span class="flex-1">ECSESS Footer — Properties</span>
		</div>

		<div style="padding: 12px; background: #d4d0c8;">
			<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">

				<!-- Left: Location -->
				<fieldset class="win-groupbox">
					<legend style="font-weight: bold; font-size: 11px; padding: 0 4px;">📍 Location</legend>
					<p style="font-size: 11px; margin-bottom: 4px; color: #000;">Visit the ECSESS lounge!</p>
					<a
						href="https://maps.app.goo.gl/m9ZqjTrPM7pcBzhbA"
						target="_blank"
						rel="noopener noreferrer"
						class="win-link"
						style="font-size: 11px;"
					>
						🗺 ENGTR 1060
					</a>
				</fieldset>

				<!-- Center: Social links -->
				<fieldset class="win-groupbox">
					<legend style="font-weight: bold; font-size: 11px; padding: 0 4px;">🌐 Connect With Us</legend>
					<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
						{#each socialLinks as link}
							<a
								href={link.url}
								target={link.name === 'Email' ? '_self' : '_blank'}
								rel={link.name === 'Email' ? '' : 'noopener noreferrer'}
								class="win-btn"
								style="font-size: 10px; min-width: auto; padding: 2px 6px; text-decoration: none; color: #000;"
								aria-label={link.label}
							>
								{link.label}
							</a>
						{/each}
					</div>
				</fieldset>

				<!-- Right: Contribute -->
				<fieldset class="win-groupbox">
					<legend style="font-weight: bold; font-size: 11px; padding: 0 4px;">🐛 Bug Report</legend>
					<p style="font-size: 11px; margin-bottom: 8px;">Catch a bug or have an idea? Let us know!</p>
					<a
						href="https://forms.gle/hTA9hZdy3UPNs12R6"
						target="_blank"
						rel="noopener noreferrer"
						class="win-btn"
						style="font-size: 11px; text-decoration: none; color: #000; display: inline-flex; align-items: center; gap: 4px;"
					>
						<img src={ECSESS} alt="" style="height: 14px;" aria-hidden="true" />
						Bug Report Form
					</a>
				</fieldset>
			</div>
		</div>

		<!-- Win2k status bar at very bottom -->
		<div
			class="win-statusbar"
			style="border-top: 2px solid #808080; justify-content: space-between;"
		>
			<div class="win-sunken" style="flex: 1; padding: 1px 6px; font-size: 10px;">
				© ECSESS {year} under GNU General Public License v3.0 · Designed with &lt;3
			</div>
			<div class="win-sunken" style="padding: 1px 8px; font-size: 10px;">
				800×600
			</div>
			<div class="win-sunken" style="padding: 1px 8px; font-size: 10px;">
				IE 6.0
			</div>
		</div>
	</div>
</div>
