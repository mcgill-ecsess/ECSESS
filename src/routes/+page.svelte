<script>
	import FaqAccordion from 'components/homepage/FAQAccordion.svelte';
	import Section from 'components/layout/Section.svelte';
	import RichText from 'components/RichText.svelte';
	import OhSchedule from 'components/officehour/OHSchedule.svelte';
	import Link from 'components/Link.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import AffiliatedClubs from 'components/homepage/AffiliatedClubs.svelte';
	import { fade } from 'svelte/transition';
	import QuickLinks from 'components/QuickLinks.svelte';

	/** loading things from the server side */
	let { data } = $props();
</script>

<!-- SEO Meta header tags. Root page can use default values -->
<SeoMetaTags canonical={data.canonical} />

<!-- ECSESS Introduction -->
<Section from="from-ecsess-black" to="to-ecsess-900">
	<div
		class="grid grid-cols-1 gap-2 place-self-center sm:gap-4 md:gap-6 lg:h-[70vh] lg:grid-cols-3 lg:grid-rows-3 lg:items-center lg:gap-6"
	>
		<!-- Title -->
		<div
			class="order-1 mb-2 flex items-center justify-center lg:col-start-1 lg:row-start-1 lg:mb-6 lg:place-self-center"
		>
			<div class="flex flex-col text-center">
				<p>
					{#each 'We are ECSESS!' as char, i}
						<span class="page-title" in:fade|global={{ delay: 200 + i * 100, duration: 800 }}
							>{char}</span
						>
					{/each}
				</p>
			</div>
		</div>

		<!-- Description -->
		<div
			class="order-2 mb-2 flex items-center justify-center p-4 lg:col-start-1 lg:row-start-2 lg:mb-6 lg:place-self-center"
		>
			<div class="max-w-xl text-center lg:text-center">
				<RichText value={data.description} />
			</div>
		</div>

		<!-- Image -->
		<div class="order-3 m-0 sm:m-2 lg:col-span-2 lg:col-start-2 lg:row-span-3 lg:row-start-1">
			<div class="flex h-auto w-full items-center justify-center sm:h-full">
				<img
					src={data.councilPhoto}
					alt="ECSESS Council"
					class="ring-ecsess-500 max-h-[35vh] max-w-full rounded-md object-contain shadow-md ring-4 transition-all sm:max-h-[45vh] md:max-h-[60vh] lg:max-h-full"
				/>
			</div>
		</div>

		<!-- Quick Links -->
		<div class="order-4 p-3 lg:col-start-1 lg:row-start-3 lg:flex lg:place-self-center lg:p-4">
			<QuickLinks />
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
