<script>
	import FaqAccordion from 'components/FAQAccordion.svelte';
	import Section from 'components/Section.svelte';
	import RichText from 'components/RichText.svelte';
	import OhSchedule from 'components/OHSchedule.svelte';

	/** loading things from the server side */
	let { data } = $props();

	// Temporary progress bar. Update the value below!
	import { Progress } from '@skeletonlabs/skeleton-svelte';
	let progress = 60;
</script>

<title> McGill ECSESS </title>

<!-- ECSESS Introduction -->
<Section>
	<div class="flex h-1/2 flex-col items-center justify-center text-center">
		<p class="page-title">What is ECSESS?</p>
		<RichText value={data.description}/>

		<br />
		<p class="italic">
			Current development progress: {progress}%
		</p>
		<div id="progress" class="w-[80vw] lg:w-1/2 border-2">
			<Progress value={progress} max={100} meterBg="bg-ecsess-200" height="h-4"></Progress>
		</div>
	</div>
</Section>

<!-- Picture, FAQ -->
<Section black>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="col-span-2">
			<h1>Our Student Council</h1>
			<img src={data.councilPhoto} alt="ECSESS Council" />
		</div>
		<div class="col-span-1 place-self-center md:place-content-around m-6 w-full">
			<h1>FAQ</h1>
			<FaqAccordion entries={data.faqs} />
		</div>
	</div>
</Section>
<!-- Office Hours Calendar -->
<Section>
	<div>
		<h1 class="text-2xl">Office Hours</h1>
		<OhSchedule allOhs={data.allOHs}/>
	</div>
</Section>
