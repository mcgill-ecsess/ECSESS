<script lang="ts">
	import { ResourceCategory, type Resource } from '$lib/schemas';
	import ResourceCard from 'components/resource/ResourceCard.svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import EventTabsTrigger from 'components/event/EventTabsTrigger.svelte';

	let { data } = $props();

	let resources = $derived<Resource[]>(data.resources ?? []);
	let activeCategory = $state<ResourceCategory | 'all'>('all');

	type CategoryConfig = { value: ResourceCategory | 'all'; label: string; icon: string };

	const categories: CategoryConfig[] = [
		{ value: 'all', label: 'All', icon: '◈' },
		{ value: ResourceCategory.ACADEMIC, label: 'Academic', icon: '📖' },
		{ value: ResourceCategory.TECHNICAL, label: 'Technical', icon: '⚙' },
		{ value: ResourceCategory.INVOLVEMENT, label: 'Involvement', icon: '🤝' },
		{ value: ResourceCategory.SUSTAINABILITY, label: 'Sustainability', icon: '🌱' },
		{ value: ResourceCategory.EQUITY, label: 'Equity', icon: '⚖' },
		{ value: ResourceCategory.CAMPUS_LIFE, label: 'Campus Life', icon: '🎓' }
	];

	let filtered = $derived<Resource[]>(
		activeCategory === 'all'
			? resources
			: resources.filter((r) => r.category === activeCategory)
	);

	function setCategory(cat: ResourceCategory | 'all') {
		activeCategory = cat;
	}

	// Count per category for badge display
	function countFor(cat: ResourceCategory | 'all'): number {
		if (cat === 'all') return resources.length;
		return resources.filter((r) => r.category === cat).length;
	}
</script>

<SeoMetaTags
	title="ECSESS Resources - Academic, Technical, Involvement, etc."
	description="ECSESS resource hub for everything relating to academic, technical, involvement, sustainability, equity, campus life, and more!"
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
		<ul class="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter resources by category">
			{#each categories as cat}
				{#if countFor(cat.value) > 0 || cat.value === 'all'}
					<EventTabsTrigger
						value={cat.value}
						selected={activeCategory === cat.value}
						onclick={setCategory}
					>
						<span class="flex items-center gap-1.5">
							{cat.label}
							<span
								class="rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none
								{activeCategory === cat.value
									? 'bg-ecsess-400/30 text-ecsess-50'
									: 'bg-ecsess-800 text-ecsess-400'}"
							>
								{countFor(cat.value)}
							</span>
						</span>
					</EventTabsTrigger>
				{/if}
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
					/>
				{/each}
			</div>
		{/if}
	</div>
</Section>
