<script lang="ts">
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import { alumniByYear } from '$lib/mockData/alumni';
	import { page } from '$app/state';

	let sortedYears = $derived(
		[...alumniByYear].sort((a, b) => b.year.localeCompare(a.year))
	);
</script>

<SeoMetaTags
	title="ECSESS Alumni"
	description="A wall of everyone who has been part of ECSESS over the years."
	canonical={page.url.href}
/>

<Section
	from="from-ecsess-black"
	to="to-ecsess-black"
	via="via-ecsess-800"
	direction="to-b"
	contentStart
>
	<div class="w-full max-w-360 px-4">
		<h1 class="page-title text-ecsess-50">ECSESS Alumni</h1>
		<p class="text-ecsess-200 typography mx-auto -mt-4 mb-12 max-w-2xl">
			A mural of everyone who has served on ECSESS, year by year.
		</p>

		{#each sortedYears as { year, names }}
			<section class="mb-14 w-full">
				<div class="flex w-full items-center gap-4">
					<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
					<h2 class="text-ecsess-100 text-2xl font-semibold tracking-wider uppercase">
						{year}
					</h2>
					<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
				</div>
				<div class="mt-6 flex flex-wrap justify-center gap-2">
					{#each names as name}
						<span
							class="bg-ecsess-800 text-ecsess-100 hover:bg-ecsess-700 hover:text-ecsess-50 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
						>
							{name}
						</span>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</Section>
