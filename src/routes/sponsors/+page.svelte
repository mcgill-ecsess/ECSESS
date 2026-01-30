<script lang="ts">
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Link from 'components/Link.svelte';
	import type { Benefits, Sponsors } from '$lib/schemas';

	let { data } = $props();

	const tiers = ['platinum', 'gold', 'silver', 'custom'] as const;
	const tierConfig: Record<
		(typeof tiers)[number],
		{ label: string; color: string; bgColor: string; borderColor: string }
	> = {
		platinum: {
			label: 'Platinum',
			color: 'text-purple-300',
			bgColor: 'bg-purple-900/20',
			borderColor: 'border-purple-500/30'
		},
		gold: {
			label: 'Gold',
			color: 'text-yellow-400',
			bgColor: 'bg-yellow-900/20',
			borderColor: 'border-yellow-500/30'
		},
		silver: {
			label: 'Silver',
			color: 'text-gray-300',
			bgColor: 'bg-gray-700/20',
			borderColor: 'border-gray-500/30'
		},
		custom: {
			label: 'Custom',
			color: 'text-ecsess-400',
			bgColor: 'bg-ecsess-800/20',
			borderColor: 'border-ecsess-500/30'
		}
	};

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
	description="Explore sponsorship opportunities with ECSESS. Connect with McGill's Engineering and Computer Science students through events, branding, and recruitment."
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="w-full max-w-7xl px-4 py-8">
		<!-- Hero Section -->
		<div class="mb-16 text-center">
			<p class="page-title">Become a Sponsor</p>
			<p class="text-ecsess-200 mx-auto max-w-3xl text-lg leading-relaxed">
				Partner with ECSESS to connect with McGill's talented Engineering and Computer Science
				students. We offer flexible sponsorship packages designed to meet your organization's
				recruitment, branding, and engagement goals.
			</p>
		</div>

		<!-- Tier Cards Header -->
		<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
			{#each tiers as tier}
				{@const config = tierConfig[tier]}
				<div
					class="rounded-xl border {config.borderColor} {config.bgColor} p-6 text-center backdrop-blur-sm"
				>
					<h3 class="text-2xl font-bold {config.color}">{config.label}</h3>
					<p class="text-ecsess-300 mt-2 text-sm">Tier</p>
				</div>
			{/each}
		</div>

		<!-- Benefits Table -->
		<div
			class="border-ecsess-700/50 bg-ecsess-900/80 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-sm"
		>
			<div class="overflow-x-auto">
				<table class="w-full border-collapse text-left">
					<thead>
						<tr class="border-ecsess-700 bg-ecsess-800/50 border-b">
							<th class="text-ecsess-300 p-5 text-sm font-semibold tracking-wider uppercase">
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
							<tr class="bg-ecsess-800/70">
								<td
									colspan="5"
									class="text-ecsess-100 px-5 py-4 text-base font-bold tracking-wide uppercase"
								>
									{category}
								</td>
							</tr>
							{#each getBenefitsByCategory(category) as benefit, i}
								<tr
									class="border-ecsess-700/30 hover:bg-ecsess-800/40 border-b transition-colors
									{i % 2 === 0 ? 'bg-ecsess-900/50' : 'bg-ecsess-900/30'}"
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
												<span class="bg-ecsess-700/50 inline-block rounded-full px-3 py-1">
													{benefit[tier]}
												</span>
											{:else}
												<span class="text-ecsess-600">—</span>
											{/if}
										</td>
									{/each}
								</tr>
							{/each}
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Current Sponsors Section -->
		{#if data.sponsors && data.sponsors.length > 0}
			<div class="mt-20">
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
						<div class="mb-8">
							<h3 class="mb-4 text-center text-xl font-semibold {config.color}">
								{config.label} Sponsors
							</h3>
							<div class="flex flex-wrap justify-center gap-4">
								{#each sponsorsInTier as sponsor}
									<Link
										href={sponsor.url}
										external
										class="group flex w-full max-w-[280px] justify-center rounded-xl focus-visible:outline-none"
									>
										<div
											class="flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border {config.borderColor} {config.bgColor} p-4 shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl"
										>
											<img
												src={sponsor.logo}
												alt={sponsor.name}
												class="max-h-14 w-full object-contain opacity-90 transition-opacity duration-150 group-hover:opacity-100"
											/>
										</div>
									</Link>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</Section>
