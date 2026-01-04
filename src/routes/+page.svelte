<script>
	import FaqAccordion from 'components/homepage/FAQAccordion.svelte';
	import Section from 'components/layout/Section.svelte';
	import RichText from 'components/RichText.svelte';
	import OhSchedule from 'components/officehour/OHSchedule.svelte';
	import Link from 'components/Link.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import AffiliatedClubs from 'components/homepage/AffiliatedClubs.svelte';
	import { fade } from 'svelte/transition';

	/** loading things from the server side */
	let { data } = $props();
</script>

<!-- SEO Meta header tags. Root page can use default values -->
<SeoMetaTags canonical={data.canonical} />

<!-- ECSESS Introduction -->
<Section from="from-ecsess-black" to="to-ecsess-900">
	<div class="place-self-center grid min-h-screen grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 lg:items-stretch">
		<!-- Description + Title -->
		<div class="order-1 place-self-center lg:order-1 lg:col-span-1 lg:m-8 lg:self-stretch">
			<div class="flex flex-col text-center lg:pt-2">
				<p>
					{#each 'We are ECSESS!' as char, i}
						<span class="page-title" in:fade|global={{ delay: 200 + i * 100, duration: 800 }}
							>{char}</span
						>
					{/each}
				</p>

				<div class="p-4">
					<RichText value={data.description} />
				</div>

				<!-- Quick Links (Desktop only) -->
				<div class="hidden lg:block p-4">
					<!-- Quick Links -->
					<div class="mt-6">
						<p
							class="mt-8 mb-4 text-center text-base font-bold tracking-wide
								text-ecsess-50
								underline decoration-ecsess-200 decoration-2 underline-offset-8
								drop-shadow-[0_6px_24px_rgba(0,0,0,0.75)]"
						>Commonly searched for
						</p>

						<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<a
								href="/events"
								class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
									text-center text-sm font-semibold text-ecsess-50 transition-colors
									hover:bg-ecsess-600/50 hover:border-ecsess-300"
							>ECSESS Events
							</a>

							<a
								href="/r/trot5th"
								target="_blank"
								rel="noopener noreferrer"
								class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
									text-center text-sm font-semibold text-ecsess-50 transition-colors
									hover:bg-ecsess-600/50 hover:border-ecsess-300"
							>Trottier 5th booking
							</a>

							<a
								href="/r/ctrlz"
								target="_blank"
								rel="noopener noreferrer"
								class="rounded-md border border-ecsess-200 bg-ecsess-500 px-2 py-2
									text-center text-sm font-semibold text-ecsess-50 transition-colors
									hover:bg-ecsess-600/50 hover:border-ecsess-300"
							>Ctrl+Z (feedback) form
							</a>

							<a
								aria-disabled="true"
								tabindex="-1"
								class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
									text-center text-sm font-semibold text-ecsess-50 transition-colors
									hover:bg-ecsess-600/50 hover:border-ecsess-300"
							>Sponsorship
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Image -->
		<div class="order-2 m-2 lg:order-2 lg:col-span-2 lg:mx-12 lg:my-0">
			<div class="lg:sticky lg:top-16 lg:h-[calc(100vh-7rem)] lg:flex lg:items-center lg:justify-center">
				<img
					src={data.councilPhoto}
					alt="ECSESS Council"
					class="ring-ecsess-500 shadow-ecsess-400 hover:ring-ecsess-400 rounded-md shadow-md ring-4 transition-all"
				/>
			</div>
		</div>

		<!-- Quick Links -->
		<div class="order-3 p-4 lg:hidden">
			<!-- Quick Links -->
			<div class="mt-6">
				<p
					class="mt-8 mb-4 text-center text-base font-bold tracking-wide
						text-ecsess-50
						underline decoration-ecsess-200 decoration-2 underline-offset-8
						drop-shadow-[0_6px_24px_rgba(0,0,0,0.75)]"
				>Commonly searched for
				</p>

				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					<a
						href="/events"
						class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
							text-center text-sm font-semibold text-ecsess-50 transition-colors
							hover:bg-ecsess-600/50 hover:border-ecsess-300"
					>ECSESS Events
					</a>

					<a
						href="/r/trot5th"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
							text-center text-sm font-semibold text-ecsess-50 transition-colors
							hover:bg-ecsess-600/50 hover:border-ecsess-300"
					>Trottier 5th booking
					</a>

					<a
						href="/r/ctrlz"
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-md border border-ecsess-200 bg-ecsess-500 px-2 py-2
							text-center text-sm font-semibold text-ecsess-50 transition-colors
							hover:bg-ecsess-600/50 hover:border-ecsess-300"
					>Ctrl+Z (feedback) form
					</a>

					<a
						aria-disabled="true"
						tabindex="-1"
						class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
							text-center text-sm font-semibold text-ecsess-50 transition-colors
							hover:bg-ecsess-600/50 hover:border-ecsess-300"
					>Sponsorship
					</a>
				</div>
			</div>
		</div>
	</div>
</Section>

<!-- Office Hours Calendar -->
<Section from="from-ecsess-900" to="to-ecsess-800">
	<div class="w-full">
		<h1 id="office-hours">Office Hours</h1>
		<OhSchedule allOhs={data.allOHs} />
	</div>
</Section>

<!-- Affiliated Clubs -->
<Section from="from-ecsess-800" to="to-ecsess-950">
	<AffiliatedClubs />
</Section>

<!-- FAQs and Sponsors -->
<Section from="from-ecsess-950" to="to-ecsess-black">
	<div class="grid w-full max-w-[80vw] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
		<div>
			<h1>FAQs</h1>
			<hr class="hr w-full border-dashed py-4" />
			<FaqAccordion entries={data.faqs} />
		</div>
		<div id="sponsors" class="mb-24">
			<h1>Sponsors</h1>
			<hr class="hr w-full border-dashed py-4" />

			<div class="flex gap-12">
				{#each data.sponsors as sponsor}
					<div class="max-h-20">
						<Link href={sponsor.url}>
							<img src={sponsor.logo} alt="{sponsor.name} Logo" class="max-h-24" />
						</Link>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Section>
