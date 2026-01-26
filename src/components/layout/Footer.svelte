<script lang="ts">
	import ECSESS from 'assets/ECSESS.png';
	import { FacebookIcon, Github, InstagramIcon, LinkedinIcon, Mail } from '@lucide/svelte';
	const year = new Date().getFullYear();

	// Social links data
	const socialLinks = [
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/mcgill_ecsess/',
			icon: 'instagram',
			ariaLabel: 'Follow us on Instagram'
		},
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/ECSESS',
			icon: 'facebook',
			ariaLabel: 'Follow us on Facebook'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/company/ecsess/',
			icon: 'linkedin',
			ariaLabel: 'Connect with us on LinkedIn'
		},
		{
			name: 'Linktree',
			url: 'https://linktr.ee/ecsess',
			icon: 'linktree',
			ariaLabel: 'Visit our Linktree'
		},
		{
			name: 'Contact Us',
			url: 'mailto:ecsess.president@mcgilleus.ca',
			icon: 'email',
			ariaLabel: 'Send us an email'
		},
		{
			name: 'GitHub',
			url: 'https://github.com/mcgill-ecsess/ECSESS',
			icon: 'github',
			ariaLabel: 'Visit our open source website'
		}
	];
</script>

<footer class="bg-ecsess-black text-ecsess-100 mx-auto min-w-fit px-4 py-8">
	<div class="mx-auto max-w-7xl">
		<!-- Business Card Layout -->
		<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
			<!-- Left: ECSESS Lounge -->
			<div class="border-ecsess-800 border-b-1 pb-4 text-center md:border-0 md:text-left">
				<p class="text-ecsess-300 mb-3 text-lg">Visit the ECSESS lounge!</p>
				<a
					href="https://maps.app.goo.gl/m9ZqjTrPM7pcBzhbA"
					target="_blank"
					rel="noopener noreferrer"
					class="text-ecsess-300 hover:text-ecsess-100 hover:border-b-ecsess-100 inline-flex items-center justify-baseline gap-2 border-b-1 border-b-transparent pb-0.5 transition-all"
				>
					<svg
						class="h-4 w-4 flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					<span class="text-base">ENGTR 1060</span>
				</a>
			</div>

			<!-- Center: Connect With Us -->
			<div class="border-ecsess-800 border-b-1 pb-8 text-center md:border-0">
				<h3 class="text-ecsess-200 mb-3 text-lg font-semibold">Connect With Us</h3>
				<div class="flex flex-wrap items-center justify-center gap-3">
					{#each socialLinks as link}
						<a
							href={link.url}
							target={link.icon === 'email' ? '_self' : '_blank'}
							rel={link.icon === 'email' ? '' : 'noopener noreferrer'}
							aria-label={link.ariaLabel}
							class="bg-ecsess-800 hover:bg-ecsess-600 flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
						>
							{#if link.icon === 'instagram'}
								<InstagramIcon class="text-white" />
							{:else if link.icon === 'facebook'}
								<FacebookIcon class="text-white" fill="white" color="transparent" />
							{:else if link.icon === 'linkedin'}
								<LinkedinIcon class="text-white" fill="white" color="transparent" />
							{:else if link.icon === 'linktree'}
								<svg
									class="h-5 w-5 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										d="M13.5108 5.85343L17.5158 1.73642L19.8404 4.11701L15.6393 8.12199H21.5488V11.4268H15.6113L19.8404 15.5345L17.5158 17.8684L11.7744 12.099L6.03299 17.8684L3.70842 15.5438L7.93745 11.4361H2V8.12199H7.90944L3.70842 4.11701L6.03299 1.73642L10.038 5.85343V0H13.5108V5.85343ZM10.038 16.16H13.5108V24H10.038V16.16Z"
									/>
								</svg>
							{:else if link.icon === 'email'}
								<Mail class="text-white" />
							{:else if link.icon == 'github'}
								<Github class="text-white" />
							{/if}
						</a>
					{/each}
				</div>
			</div>

			<!-- Right: Contribute -->
			<div class="text-center md:text-right">
				<p class="text-ecsess-200 mb-3 text-base">
					Catch a bug or have an idea? <br />
					Let us know!
				</p>
				<a
					href="https://forms.gle/hTA9hZdy3UPNs12R6"
					target="_blank"
					rel="noopener noreferrer"
					class="bg-ecsess-800 hover:bg-ecsess-600 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
				>
					<img src={ECSESS} alt="ECSESS Logo" class="w-8" />
					<span>Bug Report Form</span>
				</a>
			</div>
		</div>

		<!-- Divider -->
		<div class="border-ecsess-800 my-6 border-t"></div>

		<!-- Copyright -->
		<div>
			<p class="text-ecsess-200 text-center text-sm">
				🄯 ECSESS {year} under GNU General Public License v3.0. <br />
				Designed with love {'<3'}.
			</p>
		</div>
	</div>
</footer>
