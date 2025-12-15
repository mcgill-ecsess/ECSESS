<script>
	import ResourceCard from 'components/resource/ResourceCard.svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import { Search, Telescope } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';

	let { data } = $props();

	let searchQuery = $state('');
	let selectedCategory = $state('All');

	// extract Categories dynamically
	let categories = $derived.by(() => {
		const cats = new Set(['All']);
		data.resources.forEach((r) => {
			if (r.category) cats.add(r.category);
		});
		const arr = Array.from(cats).sort();
		return arr.length > 1 ? arr : [];
	});

	// enhanced Search Logic (Title + Desc + Category + TAGS)
	let filteredResources = $derived(
		data.resources.filter((r) => {
			const query = searchQuery.toLowerCase();

			// check Tags
			const tagMatch = r.tags?.some((tag) => tag.toLowerCase().includes(query));

			// check other content
			const contentMatch =
				r.title.toLowerCase().includes(query) ||
				r.description.toLowerCase().includes(query) ||
				(r.category && r.category.toLowerCase().includes(query)) ||
				tagMatch; 

			// check category filter
			const categoryMatch = selectedCategory === 'All' || r.category === selectedCategory;

			return contentMatch && categoryMatch;
		})
	);
</script>

<SeoMetaTags
	title="ECSESS Resources"
	description="Academic, Technical, and Student Life resources."
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-900" direction="to-b">
	<div class="mx-auto mb-10 max-w-3xl space-y-4 text-center">
		<h1 class="page-title text-ecsess-100">Student Resources</h1>
		<p class="text-ecsess-200 text-lg leading-relaxed md:text-xl">
			Everything you need to navigate your engineering journey at McGill.
		</p>
	</div>

	<div class="relative z-10 mx-auto mb-16 flex w-full max-w-2xl flex-col gap-6">
		<div class="group relative w-full">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search for handbooks, forms, or guides..."
				class="bg-ecsess-900/50 border-ecsess-700 text-ecsess-50 placeholder-ecsess-400 focus:border-ecsess-400 focus:ring-ecsess-400/20 peer block w-full rounded-2xl border-2 py-4 pr-4 pl-12 text-lg shadow-lg backdrop-blur-sm transition-all focus:ring-4 focus:outline-none"
			/>
			<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
				<Search
					class="text-ecsess-400 peer-focus:text-ecsess-200 h-6 w-6 transition-colors"
				/>
			</div>
		</div>

		{#if categories.length > 0}
			<div class="flex flex-wrap justify-center gap-2" in:fade>
				{#each categories as cat}
					<button
						onclick={() => (selectedCategory = cat)}
						class="rounded-full border-2 px-4 py-1.5 text-sm font-bold transition-all duration-200
						{selectedCategory === cat
							? 'bg-ecsess-400 border-ecsess-400 text-white shadow-md'
							: 'border-ecsess-800 text-ecsess-300 hover:border-ecsess-600 hover:text-ecsess-100 bg-transparent'}"
					>
						{cat}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	{#if filteredResources.length > 0}
		<div class="grid w-full max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredResources as res, i (res.url + res.title)}
				<div in:fly={{ y: 20, delay: i * 50, duration: 400 }} class="h-full">
					<ResourceCard
						title={res.title}
						link={res.url}
						description={res.description}
					/>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center opacity-80" in:fade>
			<div
				class="bg-ecsess-800/50 border-ecsess-700 mb-6 rounded-full border-2 border-dashed p-6"
			>
				<Telescope class="text-ecsess-300 h-10 w-10" />
			</div>
			<h3 class="text-ecsess-100 mb-2 text-2xl font-bold">No resources found</h3>
			<p class="text-ecsess-300">
				We couldn't find anything matching "<strong>{searchQuery}</strong>".
			</p>
			<button
				class="text-ecsess-300 hover:text-ecsess-100 mt-6 cursor-pointer underline transition-colors"
				onclick={() => {
					searchQuery = '';
					selectedCategory = 'All';
				}}
			>
				Clear search
			</button>
		</div>
	{/if}

	<div class="border-ecsess-800 mx-auto mt-20 w-full max-w-4xl border-t pt-8 text-center">
		<p class="text-ecsess-400 text-sm">
			Can't find what you're looking for?
			<a
				href="mailto:ecsess.vpcomm@mcgilleus.ca"
				class="text-ecsess-200 hover:text-white underline transition-colors"
				>Contact VP Communications</a
			>
		</p>
	</div>
</Section>