<script lang="ts">
	import Button from '#lib/components/Button.svelte';
	import Link from '#lib/components/Link.svelte';
	import Section from '#lib/components/layout/Section.svelte';
	import SeoMetaTags from '#lib/components/layout/SeoMetaTags.svelte';

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
			<p class="mb-2 text-center text-3xl text-ecsess-200">
				<Link href={candidatePackage.url} external>
					<Button
						class="text-bold rounded-md border-2 border-ecsess-400/50 bg-ecsess-800 text-lg text-ecsess-50 shadow-md transition-all hover:cursor-pointer hover:bg-ecsess-700"
					>
						View the full <span class="underline underline-offset-4">candidate package</span>
						<br /><span class="text-sm text-ecsess-200"
							>{candidatePackage.url.replace(/^https?:\/\//, '')}</span
						>
					</Button>
				</Link>
			</p>
		{/if}
		{#if nominationGuidelines}
			<p class="mb-2 text-center text-3xl text-ecsess-200">
				<Link href={nominationGuidelines.url} external>
					<Button
						class="text-bold rounded-md border-2 border-ecsess-400/50 bg-ecsess-800 text-base text-ecsess-50 shadow-md transition-all hover:cursor-pointer hover:bg-ecsess-700"
					>
						{nominationGuidelines.title}
					</Button>
				</Link>
			</p>
		{/if}

		{#if data.keyDates.length > 0}
			<!-- File explorer - style timeline -->
			<div
				class="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-ecsess-700 bg-ecsess-800 shadow-xl"
			>
				<!-- Title bar -->
				<div class="flex items-center gap-2 border-b border-ecsess-700 bg-ecsess-850 px-4 py-2.5">
					<div class="flex gap-1.5">
						<span class="h-3 w-3 rounded-full bg-ecsess-150"></span>
						<span class="h-3 w-3 rounded-full bg-ecsess-500"></span>
						<span class="h-3 w-3 rounded-full bg-ecsess-300"></span>
					</div>
					<span class="ml-2 font-mono text-xs text-ecsess-300">ecsess / election / key-dates</span>
				</div>
				<!-- File list -->
				<div class="divide-y divide-ecsess-700 font-mono">
					{#each data.keyDates as date}
						<div class="flex items-center gap-3 px-4 py-3.5">
							<div class="min-w-0 flex-1 text-left">
								<p class="text-base font-medium text-ecsess-100">{date.title}</p>
								<p class="mt-0.5 text-sm text-ecsess-200">{date.period}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{:else}
		<p class="mx-auto mb-8 max-w-2xl text-center text-lg leading-relaxed text-ecsess-100">
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
				<p class="my-4 text-3xl font-extrabold text-ecsess-100">Important documents</p>
				<div class="mx-auto flex flex-col flex-wrap items-center justify-center gap-3">
					{#each importantDocuments as doc}
						<Link href={doc.url} external>
							<Button
								class="inline-flex items-center gap-2 rounded-lg border border-ecsess-600 bg-ecsess-800 px-4 py-2.5 text-sm font-medium text-ecsess-100 hover:bg-ecsess-700"
							>
								<svg
									class="h-4 w-4 shrink-0 text-ecsess-400"
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
			<p class="mb-4 text-3xl font-bold text-ecsess-100">Available positions</p>

			<div class="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
				{#if electedPositions.length > 0}
					<div class="rounded-xl border border-ecsess-700 bg-ecsess-400/20 p-6 text-left">
						<h2 class="text-xl font-bold text-ecsess-100">Elected positions</h2>
						<p class="mb-4 border-b border-ecsess-700 pb-4 text-sm text-ecsess-200">
							Positions that are elected by the student body via voting.
						</p>
						<ul class="space-y-2 text-ecsess-200">
							{#each electedPositions as position}
								<li>{position}</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if selectedPositions.length > 0}
					<div class="rounded-xl border border-ecsess-700 bg-ecsess-400/20 p-6 text-left">
						<h2 class="text-xl font-bold text-ecsess-100">Selected positions</h2>
						<p class="mb-4 border-b border-ecsess-700 pb-4 text-sm text-ecsess-200">
							Positions that are selected by the ECSESS Council, via selection committee process.
						</p>
						<ul class="space-y-2 text-ecsess-200">
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
				<h2 class="mb-4 border-b border-ecsess-700 pb-4 text-xl font-bold text-ecsess-100">
					Contact
				</h2>
				<p class="mb-4 text-base text-ecsess-200">Please direct any questions to:</p>
				<div class="flex flex-col items-center justify-start">
					{#if contact.name}
						<p class="text-lg font-semibold text-ecsess-100">{contact.name}</p>
					{/if}
					{#if contact.email}
						<Link
							href={`mailto:${contact.email}`}
							external
							class="text-ecsess-200 underline underline-offset-3 transition-colors hover:cursor-pointer hover:text-ecsess-100"
						>
							{contact.email}
						</Link>
					{/if}
					<p class="my-2 text-xs font-medium tracking-wider text-ecsess-200 uppercase">
						ECSESS Deputy Returning Officer (DRO)
					</p>
				</div>
			</div>
		{/if}
	</Section>
{/if}
