<script>
	import FaqAccordion from 'components/homepage/FAQAccordion.svelte';
	import Section from 'components/layout/Section.svelte';
	import RichText from 'components/RichText.svelte';
	import OhSchedule from 'components/officehour/OHSchedule.svelte';
	import Link from 'components/Link.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import { fade } from 'svelte/transition';

	/** loading things from the server side */
	let { data } = $props();

	// Temporary progress bar. Update the value below!
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	let progress = 80;
</script>

<!-- SEO Meta header tags. Root page can use default values -->
<SeoMetaTags canonical={data.canonical} />

<!-- ECSESS Introduction -->
<Section>
	<div class="place-self-center md:grid md:grid-cols-1 md:gap-6 lg:grid-cols-3">
		<div class="place-self-center md:place-content-around lg:col-span-1 lg:m-8">
			<div class="flex h-1/2 flex-col place-content-center text-center">
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

				<div class="animate-pulse">
					<p class="italic">
						Development progress: {progress}%
					</p>
					<div id="progress" class="my-2 border-2">
						<Progress value={progress} max={100} meterBg="bg-ecsess-200" height="h-4"></Progress>
					</div>
				</div>
			</div>
		</div>
		<div class="m-2 place-content-around lg:col-span-2 lg:mx-12 lg:my-0">
			<img
				src={data.councilPhoto}
				alt="ECSESS Council"
				class="ring-ecsess-600 shadow-ecsess-400 rounded-2xl shadow-md ring-4"
			/>
		</div>
	</div>
</Section>

<!-- Picture, FAQ -->
<!-- Office Hours Calendar -->
<Section black>
	<div class="w-full">
		<h1 id="office-hours">Office Hours</h1>
		<OhSchedule allOhs={data.allOHs} />
	</div>
</Section>

<Section>
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
