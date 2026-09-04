<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import SeoMetaTags from '$lib/components/layout/SeoMetaTags.svelte';

	let { data } = $props();

	const candidatePackage = $derived(
		data.resources.find((r) => /candidate package/i.test(r.title)) ?? null
	);
	const nominationGuidelines = $derived(
		data.resources.find((r) => /nomination form guidelines/i.test(r.title)) ?? null
	);
	const importantDocuments = $derived(data.resources);
	const electedPositions = $derived(
		data.positions.filter((p) => p.type?.toLowerCase() === 'elected').map((p) => p.title)
	);
	const selectedPositions = $derived(
		data.positions.filter((p) => p.type?.toLowerCase() === 'selected').map((p) => p.title)
	);
	const contact = $derived(data.contact);
</script>

<SeoMetaTags
	title="Join the ECSESS student council!"
	description="Learn how you can join the ECSESS council and make an impact on the ECSE student community at McGill University!"
	canonical={data.canonical}
/>

<!-- Section 1: Election timeline & documents -->
<Section>
	<p class="page-title text-center">
		{data.isElectionSeason ? 'ECSESS Election' : 'Join ECSESS'}
	</p>

	{#if data.isElectionSeason}
		{#if candidatePackage}
			<p class="text-ecsess-200 mb-2 text-center text-3xl">
				<Link href={candidatePackage.url} external>
					<Button
						class="text-ecsess-50 bg-ecsess-800 text-bold hover:bg-ecsess-700 border-ecsess-400/50 rounded-md border-2 text-lg shadow-md transition-all hover:cursor-pointer"
					>
						View the full <span class="underline underline-offset-4">candidate package</span>
						<br /><span class="text-ecsess-200 text-sm"
							>{candidatePackage.url.replace(/^https?:\/\//, '')}</span
						>
					</Button>
				</Link>
			</p>
		{/if}
		{#if nominationGuidelines}
			<p class="text-ecsess-200 mb-2 text-center text-3xl">
				<Link href={nominationGuidelines.url} external>
					<Button
						class="text-ecsess-50 bg-ecsess-800 text-bold hover:bg-ecsess-700 border-ecsess-400/50 rounded-md border-2 text-base shadow-md transition-all hover:cursor-pointer"
					>
						{nominationGuidelines.title}
					</Button>
				</Link>
			</p>
		{/if}

		{#if data.keyDates.length > 0}
			<!-- File explorer - style timeline -->
			<div
				class="border-ecsess-700 bg-ecsess-800 mx-auto w-full max-w-2xl overflow-hidden rounded-lg border shadow-xl"
			>
				<!-- Title bar -->
				<div class="border-ecsess-700 bg-ecsess-850 flex items-center gap-2 border-b px-4 py-2.5">
					<div class="flex gap-1.5">
						<span class="bg-ecsess-150 h-3 w-3 rounded-full"></span>
						<span class="bg-ecsess-500 h-3 w-3 rounded-full"></span>
						<span class="bg-ecsess-300 h-3 w-3 rounded-full"></span>
					</div>
					<span class="text-ecsess-300 ml-2 font-mono text-xs">ecsess / election / key-dates</span>
				</div>
				<!-- File list -->
				<div class="divide-ecsess-700 divide-y font-mono">
					{#each data.keyDates as date}
						<div class="flex items-center gap-3 px-4 py-3.5">
							<div class="min-w-0 flex-1 text-left">
								<p class="text-ecsess-100 text-base font-medium">{date.title}</p>
								<p class="text-ecsess-200 mt-0.5 text-sm">{date.period}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{:else}
		<p class="text-ecsess-100 mx-auto mb-8 max-w-2xl text-center text-lg leading-relaxed">
			Council elections are not open right now. Check back during election season (around
			Febuary/March) if you want to get involved with ECSESS.
		</p>
	{/if}
</Section>

{#if data.isElectionSeason}
	<!-- Section 2: Positions & contact -->
	<Section>
		{#if importantDocuments.length > 0}
			<div class="mx-auto mb-12 w-full max-w-4xl text-center">
				<p class="text-ecsess-100 my-4 text-3xl font-extrabold">Important documents</p>
				<div class="mx-auto flex flex-col flex-wrap items-center justify-center gap-3">
					{#each importantDocuments as doc}
						<Link href={doc.url} external>
							<Button
								class="border-ecsess-600 bg-ecsess-800 text-ecsess-100 hover:bg-ecsess-700 inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium"
							>
								<svg
									class="text-ecsess-400 h-4 w-4 shrink-0"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								{doc.title}
							</Button>
						</Link>
					{/each}
				</div>
			</div>
		{/if}

		{#if electedPositions.length > 0 || selectedPositions.length > 0}
			<p class="text-ecsess-100 mb-4 text-3xl font-bold">Available positions</p>

			<div class="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
				{#if electedPositions.length > 0}
					<div class="bg-ecsess-400/20 border-ecsess-700 rounded-xl border p-6 text-left">
						<h2 class="text-ecsess-100 text-xl font-bold">Elected positions</h2>
						<p class="text-ecsess-200 border-ecsess-700 mb-4 border-b pb-4 text-sm">
							Positions that are elected by the student body via voting.
						</p>
						<ul class="text-ecsess-200 space-y-2">
							{#each electedPositions as position}
								<li>{position}</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if selectedPositions.length > 0}
					<div class="bg-ecsess-400/20 border-ecsess-700 rounded-xl border p-6 text-left">
						<h2 class="text-ecsess-100 text-xl font-bold">Selected positions</h2>
						<p class="text-ecsess-200 border-ecsess-700 mb-4 border-b pb-4 text-sm">
							Positions that are selected by the ECSESS Council, via selection committee process.
						</p>
						<ul class="text-ecsess-200 space-y-2">
							{#each selectedPositions as position}
								<li>{position}</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Contact (DRO) -->
		{#if contact?.name || contact?.email}
			<div class="mx-auto my-12 w-full max-w-4xl">
				<h2 class="text-ecsess-100 border-ecsess-700 mb-4 border-b pb-4 text-xl font-bold">
					Contact
				</h2>
				<p class="text-ecsess-200 mb-4 text-base">Please direct any questions to:</p>
				<div class="flex flex-col items-center justify-start">
					{#if contact.name}
						<p class="text-ecsess-100 text-lg font-semibold">{contact.name}</p>
					{/if}
					{#if contact.email}
						<Link
							href={`mailto:${contact.email}`}
							external
							class="text-ecsess-200 hover:text-ecsess-100 underline underline-offset-3 transition-colors hover:cursor-pointer"
						>
							{contact.email}
						</Link>
					{/if}
					<p class="text-ecsess-200 my-2 text-xs font-medium tracking-wider uppercase">
						ECSESS Deputy Returning Officer (DRO)
					</p>
				</div>
			</div>
		{/if}
	</Section>
{/if}
