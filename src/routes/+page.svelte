<script>
	import FaqAccordion from 'components/FAQAccordion.svelte';
	import Section from 'components/Section.svelte';
	import { PortableText } from '@portabletext/svelte';
	import OhSchedule from 'components/OHSchedule.svelte';

	/** loading things from the server side */
	let { data } = $props();

	// Temporary progress bar. Update the value below!
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	let progress = 63.33;
</script>

<title> McGill ECSESS </title>

<!-- ECSESS Introduction -->
<Section>
	<div class="place-self-center-safe md:grid md:gap-6 lg:grid-cols-3">
		<div class="m-8 w-full place-self-center md:place-content-around lg:col-span-1">
			<div class="flex h-1/2 flex-col items-center justify-center text-center">
				<p class="page-title">What is ECSESS?</p>
				<div class="p-4">
					<PortableText value={data.description} />
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
		<div class="m-4 place-content-around lg:col-span-2 lg:mx-12 lg:my-0">
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
		<div class="">
			<h1 id="office-hours">Office Hours</h1>
			<OhSchedule allOhs={data.allOHs} />
		</div>
	</div>
</Section>

<Section>
	<div class="col-span-1">
		<h1>FAQ</h1>
		<FaqAccordion entries={data.faqs} />
	</div>
	<div id="sponsors">
		<h1>Sponsors</h1>
		{'<Insert companies & brands/>'}
	</div>
</Section>
