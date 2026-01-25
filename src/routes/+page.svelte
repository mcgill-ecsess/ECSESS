<script>
	import FaqAccordion from 'components/homepage/FAQAccordion.svelte';
	import Section from 'components/layout/Section.svelte';
	import RichText from 'components/RichText.svelte';
	import OhSchedule from 'components/officehour/OHSchedule.svelte';
	import Link from 'components/Link.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import AffiliatedGroups from 'components/homepage/AffiliatedGroups.svelte';
	import { fade } from 'svelte/transition';
	import QuickLinks from 'components/QuickLinks.svelte';

	/** loading things from the server side */
	let { data } = $props();
</script>

<!-- SEO Meta header tags. Root page can use default values -->
<SeoMetaTags canonical={data.canonical} />

<!-- ECSESS Introduction -->
<Section from="from-ecsess-black" to="to-ecsess-800">
	<div
		class="mx-auto grid w-full max-w-[84dvw] grid-cols-1 place-items-center gap-16 py-6 lg:min-h-[75vh] lg:grid-cols-[1fr_2fr]"
	>
		<!-- Left: Description and Quick Links -->
		<div class="ml-4 flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
			<h1 class="mb-2">
				{#each 'We are ECSESS!'.split('') as char, i}
					<span class="page-title" in:fade|global={{ delay: 150 + i * 60, duration: 800 }}>
						{char}
					</span>
				{/each}
			</h1>
			<p
				class="text-ecsess-200/90 max-w-xl text-base leading-relaxed md:text-lg lg:max-w-lg lg:leading-8"
			>
				<span class="text-ecsess-50 font-bold"
					>Electrical, Computer & Software Engineering Students' Society at McGill (ECSESS)</span
				>
				is the student council which helps McGill ECSE students in their
				<span class="text-ecsess-50 font-bold">academic</span>,
				<span class="text-ecsess-50 font-bold">technical</span>,
				<span class="text-ecsess-50 font-bold">social</span> and
				<span class="text-ecsess-50 font-bold">professional</span> progression.
			</p>

			<div class="mt-8 w-full max-w-xl lg:max-w-none">
				<QuickLinks />
			</div>
		</div>

		<!-- Right: Council Photo -->
		<div class="relative flex w-full items-center justify-center lg:max-w-none">
			<div
				class="ring-ecsess-400/20 ring-offset-ecsess-900/50 relative flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl ring-1 ring-offset-2"
			>
				<div
					class="from-ecsess-500/10 absolute inset-0 rounded-2xl bg-linear-to-br to-transparent"
					aria-hidden="true"
				></div>
				<img
					src={data.councilPhoto}
					alt="ECSESS Council"
					class="relative h-full w-full object-contain object-center"
				/>
			</div>
		</div>
	</div>
</Section>

<!-- Office Hours Calendar -->
<Section from="from-ecsess-800" to="to-ecsess-900">
	<div class="w-full">
		<h2 class="text-2xl font-bold" id="office-hours">Lounge Office Hours</h2>
		<p class="text-ecsess-200 mb-8">
			Come visit us in our student lounge at ENGTR 1060 to grab a coffee (free), play Mario Kart, or
			just chat about anything!
		</p>
		<OhSchedule allOhs={data.allOHs} />
	</div>
</Section>

<!-- Affiliated Clubs -->
<Section from="from-ecsess-900" to="to-ecsess-black">
	<AffiliatedGroups />
</Section>

<!-- FAQs and Sponsors -->
<!-- <Section from="from-ecsess-950" to="to-ecsess-black">
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
</Section> -->
