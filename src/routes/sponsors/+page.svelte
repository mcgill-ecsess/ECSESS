<script lang="ts">
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Link from 'components/Link.svelte';
	import type { Benefits, Sponsors } from '$lib/schemas';
	import { slide } from 'svelte/transition';

	let { data } = $props();

	const tiers = ['platinum', 'gold', 'silver', 'custom'] as const;
	const tierConfig: Record<
		(typeof tiers)[number],
		{
			label: string;
			color: string;
			bgColor: string;
			borderColor: string;
			cardH: string;
			logoH: string;
			containerClass: string;
			gridClass: string;
			borderWidth: string;
			shadow: string;
			glowColor: string;
		}
	> = {
		platinum: {
			label: 'Platinum',
			color: 'text-cyan-200',
			bgColor: 'bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900',
			borderColor: 'border-cyan-400/70',
			cardH: 'h-50 md:h-70',
			logoH: 'max-h-32 md:max-h-40',
			containerClass: 'w-full md:max-w-lg',
			gridClass: 'flex justify-center',
			borderWidth: 'border-[3px]',
			shadow: 'shadow-xl shadow-cyan-500/30',
			glowColor: 'hover:shadow-cyan-400/40'
		},
		gold: {
			label: 'Gold',
			color: 'text-amber-300',
			bgColor: 'bg-gradient-to-br from-ecsess-900 via-amber-950/30 to-ecsess-900',
			borderColor: 'border-amber-500/60',
			cardH: 'h-32 md:h-36',
			logoH: 'max-h-20 md:max-h-24',
			containerClass: 'w-full sm:w-[calc(50%-12px)]',
			gridClass: 'flex flex-wrap justify-center gap-6',
			borderWidth: 'border-2',
			shadow: 'shadow-lg shadow-amber-500/20',
			glowColor: 'hover:shadow-amber-400/30'
		},
		silver: {
			label: 'Silver',
			color: 'text-slate-300',
			bgColor: 'bg-gradient-to-br from-ecsess-900 via-slate-800/40 to-ecsess-900',
			borderColor: 'border-slate-400/50',
			cardH: 'h-24 md:h-28',
			logoH: 'max-h-14 md:max-h-16',
			containerClass: 'w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)]',
			gridClass: 'flex flex-wrap justify-center gap-4',
			borderWidth: 'border',
			shadow: 'shadow-md shadow-slate-500/20',
			glowColor: 'hover:shadow-slate-400/30'
		},
		custom: {
			label: 'Custom',
			color: 'text-ecsess-300',
			bgColor: 'bg-gradient-to-br from-ecsess-950 via-ecsess-900/60 to-ecsess-950',
			borderColor: 'border-ecsess-500/50',
			cardH: 'h-20 md:h-24',
			logoH: 'max-h-10 md:max-h-12',
			containerClass: 'w-[calc(50%-8px)] sm:w-[calc(25%-12px)]',
			gridClass: 'flex flex-wrap justify-center gap-3',
			borderWidth: 'border',
			shadow: 'shadow-md shadow-ecsess-500/20',
			glowColor: 'hover:shadow-ecsess-400/30'
		}
	};

	// State for collapsible categories - all expanded by default
	let expandedCategories = $state<Set<string>>(
		new Set(['Events', 'Promotion & Branding', 'Recruitment', 'Extras & Recognition'])
	);

	function toggleCategory(category: string) {
		if (expandedCategories.has(category)) {
			expandedCategories.delete(category);
		} else {
			expandedCategories.add(category);
		}
		expandedCategories = new Set(expandedCategories);
	}

	const events = [
		{
			name: 'ECSESSCapade',
			month: 'September',
			location: 'Ottawa',
			students: '~50',
			description:
				'Our largest industry trip: 3-day trip branding, merchandise bags, and exclusive CV pool.'
		},
		{
			name: 'Speed Networking',
			month: 'November',
			location: 'On Campus',
			students: '~100',
			description:
				'Timed networking sessions with access to 40+ mini-interviews per rep, CV bundle, and speech slot.'
		},
		{
			name: 'ECC Internship Panel',
			month: 'January',
			location: 'On Campus',
			students: '~50',
			description: 'Early-talent Q&A, panel branding, and targeted interns.'
		},
		{
			name: 'Company Crawl',
			month: 'October',
			location: 'Montreal',
			students: '~30',
			description: 'Host on-site tour, top students, showcase culture, and exclusive CV pool.'
		},
		{
			name: 'Wine and Cheese',
			month: 'February',
			location: 'Montreal',
			students: '~100',
			description: 'Casual mingling, branded table, Wine & Cheese access, and speech slot.'
		},
		{
			name: 'Themed Speaker Panel',
			month: 'March',
			location: 'On Campus',
			students: '~70',
			description: 'Thought-leadership talk, brand spotlight, and recruit niche talent.'
		}
	];

	const whySponsorStats = [
		{ number: '40+', label: 'company reps across ECSESS events in 2024–25' },
		{ number: '100+', label: 'students at our largest external events' },
		{ number: '20,000+', label: 'monthly social media impressions' }
	];

	const sponsorBenefits = [
		{
			title: 'Recruit Faster',
			points: [
				'Speed Networking = 40+ mini-interviews per rep',
				'Résumé bundles delivered post-events',
				'Priority access to internship-seeking students',
				'Announce opportunities on our Newsletter'
			]
		},
		{
			title: 'Amplify Your Brand',
			points: [
				'Logo on 15+ event materials, slides, and socials',
				'Product placement options at Banquets, Wine & Cheese, and Speed Networking',
				'Highlights, signage, and post-event thank-you'
			]
		},
		{
			title: 'Build Relationships',
			points: [
				'Host company tours (Company Crawl, ECSESSCapade)',
				'Present at technical panels, speaker series, or sponsor awards',
				'Pull targeted CVs, all year, anytime'
			]
		}
	];

	const categories = [
		'Events',
		'Promotion & Branding',
		'Recruitment',
		'Extras & Recognition'
	] as const;

	function getBenefitsByCategory(category: string): Benefits[] {
		return data.benefits.filter((b: Benefits) => b.category === category);
	}

	function getSponsorsByTier(tier: string): Sponsors[] {
		return data.sponsors.filter((s: Sponsors) => s.tier.toLowerCase() === tier.toLowerCase());
	}
</script>

<SeoMetaTags
	title="ECSESS Sponsorship - Partner with McGill Engineering & CS Students"
	description="Explore sponsorship opportunities with ECSESS. Connect with McGill's Electrical, Computer and Software Engineering students through events, branding, and recruitment."
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="w-full max-w-7xl px-4 py-8">
		<!-- Hero Section -->
		<div class="mb-16 text-center">
			<p class="page-title">Become a Sponsor</p>
			<p class="text-ecsess-200 mx-auto max-w-3xl text-lg leading-relaxed">
				Partner with ECSESS to connect with McGill's talented Electrical, Computer and Software
				Engineering. We offer flexible sponsorship packages designed to meet your organization's
				recruitment, branding, and engagement goals.
			</p>
		</div>

		<!-- External Events -->
		<div class="mb-20">
			<div class="mb-10 text-center">
				<h2 class="text-ecsess-100 text-3xl font-bold md:text-4xl">Our Events</h2>
				<p class="text-ecsess-300 mx-auto mt-3 max-w-2xl text-base">
					From large-scale networking events to intimate industry trips, ECSESS runs a diverse
					lineup of events throughout the year.
				</p>
			</div>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each events as event}
					<div
						class="border-ecsess-700/40 bg-ecsess-900/60 rounded-2xl border p-6 backdrop-blur-sm"
					>
						<h3 class="text-ecsess-100 text-lg font-bold">{event.name}</h3>
						<p class="text-ecsess-400 mt-2 text-sm">
							{event.month} · {event.location} · {event.students} students
						</p>
						<p class="text-ecsess-300 mt-3 text-sm leading-relaxed">{event.description}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Why Sponsor Us? -->
		<div class="mb-20">
			<div class="mb-10 text-center">
				<h2 class="text-ecsess-100 text-3xl font-bold md:text-4xl">Why Sponsor Us?</h2>
			</div>

			<!-- Stats -->
			<div class="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
				{#each whySponsorStats as stat}
					<div
						class="border-ecsess-700/40 bg-ecsess-900/60 rounded-2xl border p-8 text-center backdrop-blur-sm"
					>
						<p class="text-ecsess-100 text-5xl font-bold">{stat.number}</p>
						<p class="text-ecsess-300 mt-2 text-base leading-relaxed">{stat.label}</p>
					</div>
				{/each}
			</div>

			<!-- Benefit Cards -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each sponsorBenefits as card}
					<div
						class="border-ecsess-600/30 bg-ecsess-800/50 rounded-2xl border p-6 text-start backdrop-blur-sm"
					>
						<h3 class="text-ecsess-100 mb-4 text-lg font-bold tracking-wider uppercase">
							{card.title}
						</h3>
						<ul class="space-y-3">
							{#each card.points as point}
								<li class="flex items-start gap-3">
									<span class="bg-ecsess-500 mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full"
									></span>
									<span class="text-ecsess-300 text-sm leading-relaxed">{point}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

			<!-- Closing -->
			<div class="mt-12 text-center">
				<p class="text-ecsess-200 mx-auto max-w-2xl text-lg leading-relaxed italic">
					Whether you're looking to host one event or support our entire year, ECSESS makes it easy.
				</p>
				<p class="text-ecsess-400 mx-auto mt-3 max-w-xl text-sm">
					All logistics are handled by our council. Just show up — we'll bring the students.
				</p>
			</div>
		</div>

		<!-- Divider -->
		<div class="border-ecsess-700/30 mb-16 border-t"></div>

		<!-- Current Sponsors Section - MOVED ABOVE TABLE -->
		{#if data.sponsors && data.sponsors.length > 0}
			<div class="mb-20">
				<div class="mb-10 text-center">
					<h2 class="text-ecsess-100 mb-3 text-4xl font-bold">Our Sponsors</h2>
					<p class="text-ecsess-200/90 mx-auto max-w-2xl text-lg">
						We're grateful to our sponsors for their continued support of ECSESS and our community.
					</p>
				</div>

				{#each tiers as tier}
					{@const sponsorsInTier = getSponsorsByTier(tier)}
					{@const config = tierConfig[tier]}
					{#if sponsorsInTier.length > 0}
						<div class="mb-10">
							<h3 class="mb-6 text-center text-xl font-semibold {config.color}">
								{config.label} Sponsors
							</h3>
							<div class={config.gridClass}>
								{#each sponsorsInTier as sponsor}
									<Link
										href={sponsor.url}
										external
										class="group flex {config.containerClass} justify-center rounded-xl focus-visible:outline-none"
									>
										<div
											class="flex {config.cardH} w-full items-center justify-center overflow-hidden rounded-xl {config.borderWidth} {config.borderColor} {config.bgColor} p-4 {config.shadow} {config.glowColor} transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
										>
											<img
												src={sponsor.logo}
												alt={sponsor.name}
												class="{config.logoH} w-full object-contain opacity-90 transition-opacity duration-150 group-hover:opacity-100"
											/>
										</div>
									</Link>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<!-- Divider -->
			<div class="border-ecsess-700/30 mb-16 border-t"></div>
		{/if}

		<!-- Sponsorship Packages -->
		<div class="mb-8 text-center">
			<h2 class="text-ecsess-100 text-3xl font-bold md:text-4xl">Sponsorship Packages</h2>
			<p class="text-ecsess-300 mx-auto mt-3 max-w-2xl text-base">
				Choose the tier that fits your goals. All packages include core event visibility and student
				access.
			</p>
		</div>

		<!-- Tier Cards Header -->
		<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
			{#each tiers as tier}
				{@const config = tierConfig[tier]}
				<div
					class="rounded-xl {config.borderWidth} {config.borderColor} {config.bgColor} {config.shadow} p-6 text-center backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] {config.glowColor}"
				>
					<h3 class="text-2xl font-bold {config.color}">{config.label}</h3>
					<p class="mt-2 text-sm text-white/60">Tier</p>
				</div>
			{/each}
		</div>

		<!-- Benefits Table - Refactored with collapsible categories and new colors -->
		<div class="border-ecsess-500/40 bg-ecsess-950 overflow-hidden rounded-2xl border-2 shadow-2xl">
			<div class="overflow-x-auto">
				<table class="w-full border-collapse text-left">
					<thead>
						<tr class="border-ecsess-600/50 bg-ecsess-800 border-b">
							<th class="text-ecsess-200 p-5 text-sm font-semibold tracking-wider uppercase">
								Benefit
							</th>
							{#each tiers as tier}
								{@const config = tierConfig[tier]}
								<th
									class="p-5 text-center text-sm font-semibold tracking-wider uppercase {config.color}"
								>
									{config.label}
								</th>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each categories as category}
							<!-- Collapsible Category Header -->
							<tr
								class="bg-ecsess-800/80 hover:bg-ecsess-700/60 cursor-pointer transition-colors"
								onclick={() => toggleCategory(category)}
								onkeydown={(e) => e.key === 'Enter' && toggleCategory(category)}
								tabindex="0"
								role="button"
								aria-expanded={expandedCategories.has(category)}
							>
								<td colspan="5" class="px-5 py-4">
									<div class="flex items-center gap-3">
										<!-- Chevron icon -->
										<svg
											class="text-ecsess-400 h-5 w-5 transition-transform duration-200 {expandedCategories.has(
												category
											)
												? 'rotate-90'
												: 'rotate-0'}"
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
										<span class="text-ecsess-100 text-sm font-bold tracking-widest uppercase"
											>{category}</span
										>
									</div>
								</td>
							</tr>
							<!-- Collapsible Content -->
							{#if expandedCategories.has(category)}
								{#each getBenefitsByCategory(category) as benefit, i}
									<tr
										transition:slide={{ duration: 200 }}
										class="border-ecsess-700/30 hover:bg-ecsess-800/40 border-b transition-colors
										{i % 2 === 0 ? 'bg-ecsess-900/70' : 'bg-ecsess-900/50'}"
									>
										<td class="p-5">
											<div class="text-ecsess-100 font-medium">{benefit.benefit}</div>
											{#if benefit.description}
												<div class="text-ecsess-400 mt-1 text-sm">{benefit.description}</div>
											{/if}
										</td>
										{#each tiers as tier}
											<td class="text-ecsess-200 p-5 text-center text-sm">
												{#if benefit[tier]}
													<span class="font-medium">{benefit[tier]}</span>
												{:else}
													<span class="text-ecsess-600">—</span>
												{/if}
											</td>
										{/each}
									</tr>
								{/each}
							{/if}
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</Section>
