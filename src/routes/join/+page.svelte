<script>
	import Button from 'components/Button.svelte';
	import Link from 'components/Link.svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	let { data } = $props();

	const keyDates = [
		{
			label: 'Nomination period',
			range: 'March 2 - 13',
			instruction: [
				'Review the Electrical, Computer, and Software Engineering Student Society Terms of Reference and EUS and ECSESS Electoral bylaws.',
				'If applicable, prepare a nomination form and gather signatures from peers.',
				'Share nomination Google Form with ecsess.dro@mcgilleus.ca by 5pm March 13th.'
			]
		},
		{
			label: 'Extended nomination period',
			range: 'March 14 - 15',
			instruction: [
				'For positions with one or fewer candidates, the nomination period ends at 5PM.'
			]
		},
		{
			label: 'Campaigning period',
			range: 'March 17 - 23',
			instruction: [
				'The candidate runs their campaign and reaches out to the student body. The campaign ends at 10PM on March 23rd.'
			]
		},
		{
			label: 'Deadline to register a "No" campaign',
			range: 'March 18',
			instruction: [
				'If you are interested in running a "No" campaign against a candidate, you must register by 11:59pm on March 18th.'
			]
		},
		{
			label: 'Submit candidate blurb',
			range: 'March 20',
			instruction: ['Submit a blurb (max 200 words) about yourself to ecsess.dro@mcgilleus.ca by 12pm on March 20th.']
		},
		{
			label: 'Candidate debates',
			range: 'March 23',
			instruction: ['The candidate for elected positions debates are held. The location is TBA.']
		},
		{
			label: 'Voting period',
			range: 'March 24 - 30',
			instruction: ['Cast your vote for your preferred candidates.']
		},
		{
			label: 'Results released',
			range: 'March 31',
			instruction: ['Election results are published.']
		}
	];

	const electedPositions = [
		'President',
		'VP Administration',
		'VP Events',
		'VP Internal',
		'VP External',
		'VP Communications',
		'VP Academic',
		'Year Representatives (U2-U4)'
	];

	const selectedPositions = [
		'VP Finance',
		'VP Technical Development',
		'Equity and Mental Health Officer'
	];

	const importantDocuments = [
		{
			label: 'ECSESS Terms of Reference',
			link: 'https://drive.google.com/file/d/1gK3GwDrz7d-p_JG75-afHbVb_DGHG7YS/view'
		},
		{
			label: 'EUS Constitution',
			link: 'https://drive.google.com/file/d/1_awn7S_WHHtsTPiytyLScnTXmEQ0d0M8/view'
		},
		{
			label: 'EUS Electoral and Referendum Bylaws',
			link: 'https://drive.google.com/file/d/1mCkcwhZ931R3BjSnTmjoitRYpUDZc2iK/view'
		},
		{
			label: 'ECSESS Electoral Bylaws',
			link: ''
		},
		{
			label: 'Nomination Form Guidelines',
			link: 'https://docs.google.com/document/d/1UEvnwzQ4fyLBYDDRpACKPr9zdXcH76UWtYLZ0E1CCBg/edit?tab=t.0'
		}
	];

	const droContact = {
		name: 'Sydney Brajer',
		email: 'ecsess.dro@mcgilleus.ca'
	};
</script>

<SeoMetaTags
	title="Join the ECSESS student council!"
	description="Learn how you can join the ECSESS council and make an impact on the ECSE student community at McGill University!"
	canonical={data.canonical}
/>

<!-- Section 1: Election timeline & documents -->
<Section from="from-ecsess-black" to="to-ecsess-800" direction="to-b">
	<p class="page-title">ECSESS Election 2026</p>

	<p class="text-ecsess-200 mb-2 text-center text-3xl">
		<Link href="https://ecsess.mcgilleus.ca/r/candidate-package" external>
			<Button
				class="text-ecsess-50 bg-ecsess-800 text-bold hover:bg-ecsess-700 border-ecsess-400/50 rounded-md border-2 text-lg shadow-md transition-all hover:cursor-pointer"
			>
				View the full <span class="underline underline-offset-4">candidate package</span>
				<br /><span class="text-ecsess-200 text-sm">ecsess.mcgilleus.ca/r/candidate-package</span>
			</Button>
		</Link>
	</p>
	<p class="text-ecsess-200 mb-2 text-center text-3xl">
		<Link
			href="https://docs.google.com/document/d/1UEvnwzQ4fyLBYDDRpACKPr9zdXcH76UWtYLZ0E1CCBg/edit?usp=sharing
"
			external
		>
			<Button
				class="text-ecsess-50 bg-ecsess-800 text-bold hover:bg-ecsess-700 border-ecsess-400/50 rounded-md border-2 text-base shadow-md transition-all hover:cursor-pointer"
			>
				Nomination Form Guidelines
			</Button>
		</Link>
	</p>

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
			<span class="text-ecsess-300 ml-2 font-mono text-xs">ecsess / election-2026 / key-dates</span>
		</div>
		<!-- File list -->
		<div class="divide-ecsess-700 divide-y font-mono">
			{#each keyDates as date}
				<details
					class="group hover:bg-ecsess-800/80 [[open]]:bg-ecsess-800/80 cursor-pointer transition-colors"
				>
					<summary
						class="flex list-none items-center gap-3 px-4 py-3.5 focus:outline-none [&::-webkit-details-marker]:hidden"
					>
						<div class="min-w-0 flex-1">
							<p class="text-ecsess-100 text-base font-medium">{date.label}</p>
							<p class="text-ecsess-400 mt-0.5 text-sm">{date.range}</p>
						</div>
						<svg
							class="text-ecsess-400 h-5 w-5 shrink-0 transition-transform group-open:rotate-90"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</summary>
					<div class="border-ecsess-700 bg-ecsess-900 border-t px-4 py-3.5 pl-4">
						<p class="text-ecsess-300 text-base leading-relaxed">
							{#each date.instruction as instruction}
								<span class="text-ecsess-300 text-base leading-relaxed">{instruction}</span> <br />
							{/each}
						</p>
					</div>
				</details>
			{/each}
		</div>
	</div>
</Section>

<!-- Section 2: Positions & contact -->
<Section from="from-ecsess-800" to="to-ecsess-black" direction="to-b">
	<div class="mx-auto mb-12 w-full max-w-4xl text-center">
		<p class="text-ecsess-100 my-4 text-3xl font-extrabold">Important documents</p>
		<div class="mx-auto flex flex-col flex-wrap items-center justify-center gap-3">
			{#each importantDocuments.filter((d) => d.link) as doc}
				<Link href={doc.link} external>
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
						{doc.label}
					</Button>
				</Link>
			{/each}
		</div>
	</div>

	<p class="text-ecsess-100 mb-4 text-3xl font-bold">Available positions</p>

	<div class="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
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
	</div>

	<!-- Contact (DRO) -->
	<div class="mx-auto my-12 w-full max-w-4xl">
		<h2 class="text-ecsess-100 border-ecsess-700 mb-4 border-b pb-4 text-xl font-bold">Contact</h2>
		<p class="text-ecsess-200 mb-4 text-base">Please direct any questions to:</p>
		<div class="flex flex-col items-center justify-start">
			<p class="text-ecsess-100 text-lg font-semibold">{droContact.name}</p>
			<Link
				href={`mailto:${droContact.email}`}
				external
				class="text-ecsess-200 hover:text-ecsess-100 underline underline-offset-3 transition-colors hover:cursor-pointer"
			>
				{droContact.email}
			</Link>
			<p class="text-ecsess-200 my-2 text-xs font-medium tracking-wider uppercase">
				ECSESS Deputy Returning Officer (DRO)
			</p>
		</div>
	</div>
</Section>
