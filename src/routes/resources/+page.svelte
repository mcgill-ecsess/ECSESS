<script>
	import ResourceCard from 'components/resource/ResourceCard.svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import { Search, Telescope } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';

	let { data } = $props();

	// Search State
	let searchQuery = $state('');

	// Derived filtered list based on search query
	let filteredResources = $derived(
		data.resources.filter((r) => {
			const query = searchQuery.toLowerCase();
			return (
				r.title.toLowerCase().includes(query) || 
				r.description.toLowerCase().includes(query)
			);
		})
	);
</script>

<SeoMetaTags
	title="ECSESS Resources - Academic, Technical, Involvement & More"
	description="The central hub for all ECSESS student resources including academic rights, building access, financial bursaries, and student handbooks."
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-900" direction="to-b">
	
	<div class="mb-12 text-center max-w-3xl mx-auto space-y-4">
		<h1 class="page-title text-ecsess-100">Student Resources</h1>
		<p class="text-ecsess-200 text-lg md:text-xl leading-relaxed">
			Everything you need to navigate your engineering journey at McGill, curated by ECSESS.
		</p>
	</div>

	<div class="w-full max-w-2xl mx-auto mb-12 relative z-10">
		<div class="relative group">
			<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
				<Search class="h-6 w-6 text-ecsess-400 group-focus-within:text-ecsess-200 transition-colors" />
			</div>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search for handbooks, forms, or guides..."
				class="block w-full pl-12 pr-4 py-4 bg-ecsess-900/50 border-2 border-ecsess-700 rounded-2xl 
					   text-ecsess-50 placeholder-ecsess-400 focus:outline-none focus:border-ecsess-400 
					   focus:ring-4 focus:ring-ecsess-400/20 transition-all text-lg shadow-lg backdrop-blur-sm"
			/>
		</div>
	</div>

	{#if filteredResources.length > 0}
		<div 
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4"
			in:fade={{ duration: 300 }}
		>
			{#each filteredResources as res, i (res.url + res.title)}
				<div 
					in:fly={{ y: 20, delay: i * 50, duration: 400 }}
					class="h-full"
				>
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
			<div class="bg-ecsess-800 p-6 rounded-full mb-6">
				<Telescope class="h-12 w-12 text-ecsess-300" />
			</div>
			<h3 class="text-2xl font-bold text-ecsess-100 mb-2">No resources found</h3>
			<p class="text-ecsess-300">
				We couldn't find anything matching "<strong>{searchQuery}</strong>". <br/>
				Try searching for keywords like <em>Rights</em>, <em>Room</em>, or <em>Fund</em>.
			</p>
			<button 
				class="mt-6 text-ecsess-300 underline hover:text-ecsess-100 transition-colors cursor-pointer"
				onclick={() => searchQuery = ''}
			>
				Clear search
			</button>
		</div>
	{/if}

	<div class="mt-20 border-t border-ecsess-800 pt-8 w-full max-w-4xl text-center">
		<p class="text-ecsess-400 text-sm">
			Can't find what you're looking for? 
			<a href="mailto:ecsess.vpcomm@mcgilleus.ca" class="text-ecsess-200 hover:text-white underline transition-colors">Contact VP Communications</a>
		</p>
	</div>
</Section>