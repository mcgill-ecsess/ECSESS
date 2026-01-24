<script>
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Button from 'components/Button.svelte';

	let { data } = $props();

	const timeline = [
		{
			title: 'Nomination Period',
			date: 'March 1st - March 14th',
			description: 'Submit your nomination package to run for a position.'
		},
		{
			title: 'Campaign Period',
			date: 'March 15th - March 21st',
			description: 'Promote your platform and connect with students.'
		},
		{
			title: 'Voting Period',
			date: 'March 22nd - March 25th',
			description: 'Students cast their votes for the new council.'
		}
	];

	const opportunities = [
		{
			role: 'Executive Council',
			description:
				'Lead the society, manage budgets, and represent ECSE students to the faculty.',
			positions: ['President', 'VP Finance', 'VP Academic', 'VP Internal', 'VP External']
		},
		{
			role: 'Representatives',
			description:
				'Represent specific student years and ensure their voices are heard.',
			positions: ['U0 Rep', 'U1 Rep', 'U2 Rep', 'U3 Rep', 'U4 Rep']
		}
	];
</script>

<SeoMetaTags
	title="Join the ECSESS Council"
	description="Become a leader in the ECSE community. Run for council, join committees, and make a difference."
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-8 text-left">
		<!-- Hero Section -->
		<div class="flex flex-col gap-6 text-center">
			<h1 class="text-ecsess-50 text-4xl font-bold md:text-6xl">Join ECSESS Council</h1>
			<p class="text-ecsess-100 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
				Make an impact on the ECSE student community at McGill University. Develop leadership skills, organize events, and represent your peers.
			</p>
			<div class="mt-4 flex justify-center gap-4">
				<Button onclick={() => window.open('https://forms.gle/example', '_blank')}>Apply Now</Button>
				<Button class="!bg-transparent border border-ecsess-300 hover:!bg-ecsess-900" onclick={() => document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' })}>View Roles</Button>
			</div>
		</div>

		<!-- Why Join / Timeline Grid -->
		<div class="grid gap-12 md:grid-cols-2">
			<div class="bg-ecsess-900/50 rounded-xl p-8 border border-ecsess-800">
				<h2 class="text-ecsess-200 mb-6 text-2xl font-bold">Election Timeline</h2>
				<div class="flex flex-col gap-8">
					{#each timeline as item, i}
						<div class="relative flex gap-4">
							<div class="flex flex-col items-center">
								<div class="bg-ecsess-400 h-4 w-4 rounded-full"></div>
								{#if i !== timeline.length - 1}
									<div class="bg-ecsess-800 w-0.5 flex-1 my-1"></div>
								{/if}
							</div>
							<div>
								<h3 class="text-ecsess-100 text-lg font-bold">{item.title}</h3>
								<span class="text-ecsess-300 text-sm font-semibold">{item.date}</span>
								<p class="text-ecsess-200 mt-1 text-sm">{item.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-col justify-center gap-6">
				<h2 class="text-ecsess-200 text-2xl font-bold">Why Join?</h2>
				<ul class="space-y-4">
					{#each ['Build Leadership Skills', 'Network with Peers & Profs', 'Organize Major Events', 'Shape Student Life'] as benefit}
						<li class="flex items-center gap-3">
							<div class="bg-ecsess-600/30 text-ecsess-300 flex h-8 w-8 items-center justify-center rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="h-4 w-4">
									<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
								</svg>
							</div>
							<span class="text-ecsess-100 text-lg">{benefit}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Roles Section -->
		<div id="roles" class="flex flex-col gap-8 pt-8">
			<h2 class="text-ecsess-50 text-center text-3xl font-bold">Available Positions</h2>
			<div class="grid gap-6 md:grid-cols-2">
				{#each opportunities as opp}
					<div class="bg-ecsess-100 text-ecsess-900 flex flex-col gap-4 rounded-xl p-8">
						<div>
							<h3 class="text-2xl font-bold">{opp.role}</h3>
							<p class="text-ecsess-800 mt-2 text-sm">{opp.description}</p>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each opp.positions as pos}
								<span class="bg-ecsess-800 text-ecsess-100 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
									{pos}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Section>
