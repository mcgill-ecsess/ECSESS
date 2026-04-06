<script>
	import Section from 'components/layout/Section.svelte';
	import OhSchedule from 'components/officehour/OHSchedule.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import AffiliatedGroups from 'components/homepage/AffiliatedGroups.svelte';
	import Sponsors from 'components/homepage/Sponsors.svelte';
	import QuickLinks from 'components/QuickLinks.svelte';
	import { fade } from 'svelte/transition';

	/** loading things from the server side */
	let { data } = $props();
</script>

<!-- SEO Meta header tags. Root page can use default values -->
<SeoMetaTags canonical={data.canonical} />

<!-- ECSESS Introduction -->
<Section from="from-primary-background" to="to-base" via="via-primary-background">
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
			<p class="text-base-content max-w-xl text-lg leading-8 lg:max-w-lg">
				<span class="text-primary-content font-bold"
					>Electrical, Computer & Software Engineering Students' Society at McGill (ECSESS)</span
				>
				is the student council which helps McGill ECSE students in their
				<span class="text-primary-content font-bold">academic</span>,
				<span class="text-primary-content font-bold">technical</span>,
				<span class="text-primary-content font-bold">social</span> and
				<span class="text-primary-content font-bold">professional</span> progression.
			</p>

			<div class="mt-8 w-full max-w-xl lg:max-w-none">
				<QuickLinks />
			</div>
		</div>

		<!-- Right: Featured Video for April Fool's Day -->
		<div class="relative flex w-full items-center justify-center lg:max-w-none">
			<div
				class="ring-border ring-offset-base relative flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl ring-1 ring-offset-2"
			>
				<div
					class="from-primary-soft absolute inset-0 rounded-2xl bg-linear-to-br to-transparent"
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
<Section from="from-base" to="to-primary-hover" via="via-primary-hover">
	<div class="w-full">
		<h2 class="text-2xl font-bold" id="office-hours">Lounge Office Hours</h2>
		<p class="text-base-content text-lg">
			Come visit us in our student lounge at ENGTR 1060 to grab a coffee (free), play Mario Kart, or
			just chat about anything!
			{#if data.ohLastUpdated}
				<br />
				<span class="text-primary-content mb-4 inline-block italic">
					Semester: {data.ohLastUpdated}
				</span>
			{/if}
		</p>
		<OhSchedule allOhs={data.allOHs} />
	</div>
</Section>

<!-- Sponsors -->
<Section from="from-primary-hover" to="to-primary-soft" via="via-primary-soft">
	<Sponsors sponsors={data.sponsors} lastUpdated={data.sponsorsLastUpdated} />
</Section>

<!-- Affiliated Clubs -->
<Section from="from-primary-soft" to="to-primary-background" via="via-primary-soft">
	<AffiliatedGroups />
</Section>
