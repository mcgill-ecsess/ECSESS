<script lang="ts">
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
		}
	];
</script>

<footer class="bg-ecsess-black text-ecsess-100 mx-auto min-w-fit px-4 py-8">
	<div class="mx-auto max-w-7xl">
		<!-- Business Card Layout -->
		<div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
			<!-- Left: ECSESS Lounge -->
			<div class="border-ecsess-800 border-b-1 pb-4 text-center md:border-0 md:text-left">
				<p class="text-ecsess-300 mb-3 text-lg">
					Visit the ECSESS lounge!
				</p>
				<a
					href="https://maps.app.goo.gl/m9ZqjTrPM7pcBzhbA"
					target="_blank"
					rel="noopener noreferrer"
					class="text-ecsess-300 hover:text-ecsess-100 border-b-1 border-b-transparent hover:border-b-ecsess-100 inline-flex items-center gap-2 justify-baseline transition-all pb-0.5"
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
				<h3 class="text-ecsess-150 mb-3 text-lg font-semibold">Connect With Us</h3>
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
								<svg
									class="h-5 w-5 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
										clip-rule="evenodd"
									/>
								</svg>
							{:else if link.icon === 'facebook'}
								<svg
									class="h-5 w-5 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clip-rule="evenodd"
									/>
								</svg>
							{:else if link.icon === 'linkedin'}
								<svg
									class="h-5 w-5 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
									/>
								</svg>
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
								<svg
									class="h-5 w-5 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
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
					href="https://github.com/mcgill-ecsess/ECSESS"
					target="_blank"
					rel="noopener noreferrer"
					class="bg-ecsess-800 hover:bg-ecsess-600 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clip-rule="evenodd"
						/>
					</svg>
					<span>ECSESS on GitHub</span>
				</a>
			</div>
		</div>

		<!-- Divider -->
		<div class="border-ecsess-800 my-6 border-t"></div>

		<!-- Copyright -->
		<div>
			<p class="text-ecsess-150 text-center text-sm">
				🄯 ECSESS {year} under GNU General Public License v3.0. <br />
				Designed with love {'<3'}.
			</p>
		</div>
	</div>
</footer>
