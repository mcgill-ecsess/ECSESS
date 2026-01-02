<script>
	import FaqAccordion from 'components/homepage/FAQAccordion.svelte';
	import Section from 'components/layout/Section.svelte';
	import RichText from 'components/RichText.svelte';
	import OhSchedule from 'components/officehour/OHSchedule.svelte';
	import Link from 'components/Link.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import AffiliatedClubs from 'components/homepage/AffiliatedClubs.svelte';
	import { fade } from 'svelte/transition';
	import Button from 'components/Button.svelte';

	/** loading things from the server side */
	let { data } = $props();
</script>

<!-- SEO Meta header tags. Root page can use default values -->
<SeoMetaTags canonical={data.canonical} />

<!-- ECSESS Introduction -->
<Section from="from-ecsess-black" to="to-ecsess-900">
	<div class="place-self-center md:grid md:grid-cols-1 md:gap-6 lg:grid-cols-3">
		<div class="place-self-center md:place-content-around lg:col-span-1 lg:m-8">
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

	<div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
		<a href="/events"
			class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
				text-center text-sm font-semibold text-ecsess-50 transition-colors
				hover:bg-ecsess-600/50 hover:border-ecsess-300"
		> Events
		</a>
		<a href="/r/trot5th" target="_blank" rel="noopener noreferrer"
			class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
				text-center text-sm font-semibold text-ecsess-50 transition-colors
				hover:bg-ecsess-600/50 hover:border-ecsess-300"
		>Trottier Booking
		</a>
		<a href="/r/ctrlz" target="_blank" rel="noopener noreferrer"
			class="rounded-md border border-ecsess-200 bg-ecsess-500 px-4 py-2
				text-center text-sm font-semibold text-ecsess-50 transition-colors
				hover:bg-ecsess-600/50 hover:border-ecsess-300"
		>Ctrl + Z
		</a>
	</div>
</div>

			</div>
		</div>
		<div class="m-2 place-content-around lg:col-span-2 lg:mx-12 lg:my-0">
			<img
				src={data.councilPhoto}
				alt="ECSESS Council"
				class="ring-ecsess-500 shadow-ecsess-400 hover:ring-ecsess-400 rounded-md shadow-md ring-4 transition-all"
			/>
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
