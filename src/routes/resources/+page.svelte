<script lang="ts">
	import type { Resource } from '$lib/schemas';
	import ResourceCard from './components/ResourceCard.svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import EventTabsTrigger from 'components/event/EventTabsTrigger.svelte';

	let { data } = $props();

	let resources = $derived<Resource[]>(data.resources ?? []);
	let activeCategory = $state<string>('all');

	type CategoryTab = { value: string; count: number };

	/** Unique categories present in the data, sorted by value. */
	let categories = $derived.by((): CategoryTab[] => {
		const counts: Record<string, number> = {};
		for (const resource of resources) {
			for (const value of resource.category ?? []) {
				counts[value] = (counts[value] ?? 0) + 1;
			}
		}

		const tabs = Object.entries(counts)
			.map(([value, count]) => ({ value, count }))
			.sort((a, b) => a.value.localeCompare(b.value, undefined, { sensitivity: 'base' }));

		return [{ value: 'all', count: resources.length }, ...tabs];
	});

	let filtered = $derived.by((): Resource[] => {
		const list =
			activeCategory === 'all'
				? resources
				: resources.filter((r) => (r.category ?? []).includes(activeCategory));

		return [...list].sort((a, b) => {
			const aCat = (a.category ?? [])[0] ?? '';
			const bCat = (b.category ?? [])[0] ?? '';
			const catCmp = aCat.localeCompare(bCat, undefined, { sensitivity: 'base' });
			if (catCmp !== 0) return catCmp;
			return (a.title ?? '').localeCompare(b.title ?? '', undefined, { sensitivity: 'base' });
		});
	});

	function setCategory(cat: string) {
		activeCategory = cat;
	}
</script>

<SeoMetaTags
	title="ECSESS Resources - Academic, Technical, Involvement, etc."
	description="ECSESS resource hub for everything relating to academic, technical, involvement, sustainability, equity, ECSESS/EUS, feedback, and more!"
	canonical={data.canonical}
/>

<Section
	from="from-ecsess-black"
	to="to-ecsess-black"
	via="via-ecsess-800"
	direction="to-b"
	contentStart={true}
>
	<!-- Page header -->
	<div class="w-full max-w-7xl pt-6 text-left">
		<p class="text-ecsess-500 mb-2 text-xs font-bold tracking-[0.2em] uppercase">ECSESS</p>
		<h1 class="text-ecsess-50 mb-2 py-0 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
			Resources
		</h1>
		<p class="text-ecsess-400 mb-8 max-w-xl text-base leading-relaxed">
			Your hub for academic support, technical tools, campus involvement, and more.
		</p>

		<!-- Category filter pills -->
		<ul class="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter resources by category">
			{#each categories as cat (cat.value)}
				<EventTabsTrigger
					value={cat.value}
					selected={activeCategory === cat.value}
					onclick={setCategory}
				>
					<span class="flex items-center gap-1.5">
						{cat.value === 'all' ? 'All' : cat.value}
						<span
							class="rounded-full px-1.5 py-0.5 text-[10px] leading-none font-bold
							{activeCategory === cat.value
								? 'bg-ecsess-400/30 text-ecsess-50'
								: 'bg-ecsess-800 text-ecsess-400'}"
						>
							{cat.count}
						</span>
					</span>
				</EventTabsTrigger>
			{/each}
		</ul>
	</div>

	<!-- Resource grid -->
	<div class="w-full max-w-7xl pb-16">
		{#if filtered.length === 0}
			<div class="border-ecsess-800 rounded-xl border border-dashed py-16 text-center">
				<p class="text-ecsess-500 text-lg font-semibold">No resources in this category yet.</p>
				<p class="text-ecsess-600 mt-1 text-sm">Check back soon or explore another category.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each filtered as resource (resource.url + resource.title)}
					<ResourceCard
						title={resource.title}
						link={resource.url}
						description={resource.description}
						category={resource.category}
					/>
				{/each}
			</div>
		{/if}
	</div>
</Section>
