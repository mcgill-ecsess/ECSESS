<script lang="ts">
	import Section from '$lib/components/layout/Section.svelte';
	import SeoMetaTags from '$lib/components/layout/SeoMetaTags.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import Link from '$lib/components/Link.svelte';

	let { data } = $props();
</script>

<SeoMetaTags
	title="Redirect not found — ECSESS"
	description="The requested ECSESS short link could not be found."
	canonical={data.canonical}
/>

<Section contentStart={true}>
	<div class="w-full max-w-7xl pb-16">
		<PageHeader
			title="Link not found"
			description={'The redirect r/' + data.shortname + ' does not exist.'}
		/>

		{#if data.availableShortnames.length > 0}
			<div class="text-ecsess-200 text-left">
				<p class="mb-4 text-lg">Available short links:</p>
				<ul class="space-y-2">
					{#each data.availableShortnames as redirect}
						<li class="list-inside list-disc text-lg">
							{redirect.name} —
							<Link href={'/r/' + redirect.shortname} class="text-ecsess-50 underline">
								/r/{redirect.shortname}
							</Link>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</Section>
