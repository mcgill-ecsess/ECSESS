<script lang="ts">
	import type { Partnership } from '$lib/schemas';
	import Link from '$lib/components/Link.svelte';
	import Button from '$lib/components/Button.svelte';

	let { partnerships = [] } = $props<{
		partnerships: Partnership[];
	}>();

	const tierOrder = ['platinum', 'gold', 'silver', 'bronze', 'partner'];

	const partnersByTier = $derived.by(() => {
		const groups: Record<string, Partnership[]> = {};
		for (const partner of partnerships) {
			const tier = partner.tier?.trim() || 'Partner';
			(groups[tier] ??= []).push(partner);
		}

		return Object.entries(groups).sort(([a], [b]) => {
			const ai = tierOrder.indexOf(a.toLowerCase());
			const bi = tierOrder.indexOf(b.toLowerCase());
			if (ai === -1 && bi === -1) return a.localeCompare(b);
			if (ai === -1) return 1;
			if (bi === -1) return -1;
			return ai - bi;
		});
	});

	function tierKey(tier: string) {
		return tier.trim().toLowerCase();
	}

	function linkSizeClass(tier: string) {
		switch (tierKey(tier)) {
			case 'platinum':
				return 'w-full max-w-[300px] sm:max-w-[320px]';
			case 'gold':
				return 'w-full max-w-[240px] sm:max-w-[260px]';
			case 'silver':
				return 'w-full max-w-[190px] sm:max-w-[200px]';
			default:
				return 'w-full max-w-[170px]';
		}
	}

	function ringWidthClass(tier: string) {
		switch (tierKey(tier)) {
			case 'platinum':
				return 'p-[4px]';
			case 'gold':
				return 'p-[3px]';
			case 'silver':
				return 'p-[2px]';
			default:
				return 'p-[2px]';
		}
	}

	function cardSizeClass(tier: string) {
		switch (tierKey(tier)) {
			case 'platinum':
				return 'aspect-[2/1] p-3 sm:p-4';
			case 'gold':
				return 'aspect-[5/3] p-3 sm:p-4';
			case 'silver':
				return 'aspect-[5/3] p-4';
			default:
				return 'aspect-[5/3] p-3';
		}
	}

	function logoSizeClass(tier: string) {
		switch (tierKey(tier)) {
			case 'platinum':
				return 'max-h-14 sm:max-h-16';
			case 'gold':
				return 'max-h-14 sm:max-h-16';
			case 'silver':
				return 'max-h-10 sm:max-h-12';
			default:
				return 'max-h-9';
		}
	}

	function cardSurfaceClass(tier: string) {
		switch (tierKey(tier)) {
			case 'platinum':
				return 'bg-blue-950/90 group-hover:bg-blue-950';
			case 'gold':
				return 'bg-amber-950/85 group-hover:bg-amber-950/95';
			case 'silver':
				return 'bg-zinc-700 group-hover:bg-zinc-600';
			default:
				return 'bg-ecsess-950/90 group-hover:bg-ecsess-950';
		}
	}

	function ringClass(tier: string) {
		switch (tierKey(tier)) {
			case 'platinum':
				return 'partner-ring-border partner-ring-border--platinum';
			case 'gold':
				return 'partner-ring-border partner-ring-border--gold';
			case 'silver':
				return 'partner-ring-border partner-ring-border--silver';
			default:
				return 'partner-ring-border partner-ring-border--default';
		}
	}
</script>

<div class="container mx-auto px-4" id="Partners" data-component="Partners">
	<!-- Section Header -->
	<div class="my-12 text-center">
		<h2 id="partners-title" class="text-ecsess-50 mb-2 text-4xl font-bold md:text-5xl">
			Our Partners
		</h2>
		<p class="text-ecsess-100 mx-auto max-w-2xl text-base leading-relaxed md:text-lg">
			We're grateful to our partners for their continued support of ECSESS, our events, activities,
			and our community.
		</p>
		<div
			class="via-ecsess-150/40 mx-auto mt-2 h-px w-32 bg-linear-to-r from-transparent to-transparent"
			aria-hidden="true"
		></div>
		<div class="mt-6">
			<Link href="/partnership">
				<Button>Become a Partner</Button>
			</Link>
		</div>
	</div>

	<!-- Partnerships -->
	{#if partnerships.length > 0}
		<div class="mx-auto max-w-6xl space-y-12" aria-labelledby="partners-title">
			{#each partnersByTier as [tier, partners] (tier)}
				<div>
					<h3 class="text-ecsess-200 mb-5 text-center text-xs font-bold tracking-[0.2em] uppercase">
						{tier}
					</h3>
					<div class="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
						{#each partners as partner (partner.name)}
							<Link
								href={partner.url}
								external
								class="group flex justify-center rounded-2xl focus-visible:outline-none {linkSizeClass(
									tier
								)}"
							>
								<div class="relative w-full {ringWidthClass(tier)}">
									<!-- Ring-only layer (masked); does not paint under the face -->
									<div
										class="absolute inset-0 rounded-2xl {ringClass(tier)}"
										aria-hidden="true"
									></div>
									<div
										class="relative z-10 flex w-full items-center justify-center overflow-hidden rounded-[0.9rem] shadow-md transition-colors duration-150 {cardSizeClass(
											tier
										)} {cardSurfaceClass(tier)}"
									>
										<img
											src={partner.logo}
											alt={partner.name}
											class="w-full object-contain opacity-95 transition-opacity duration-150 group-hover:opacity-100 {logoSizeClass(
												tier
											)}"
										/>
									</div>
								</div>
							</Link>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-ecsess-300 py-12 text-center">
			<p>You can be our next partner!</p>
		</div>
	{/if}
</div>

<style>
	/*
	  Border-only paint: gradient fills the element, then the content-box is punched out
	  via mask so only the ring (padding band) remains visible.
	*/
	.partner-ring-border {
		pointer-events: none;
		padding: inherit;
		background-clip: border-box;
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
	}

	.partner-ring-border--platinum {
		background: conic-gradient(
			from var(--partner-lapis-angle, 0deg),
			#0b1f4a,
			#1e3a8a,
			#3b82f6,
			#93c5fd,
			#26619c,
			#172554,
			#60a5fa,
			#1e3a8a,
			#0b1f4a
		);
		animation: partner-lapis-shine 4s linear infinite;
		filter: drop-shadow(0 0 10px color-mix(in oklab, #3b82f6 45%, transparent));
	}

	.partner-ring-border--gold {
		background: linear-gradient(135deg, #f8e7a1 0%, #d4af37 35%, #a67c00 70%, #f5d76e 100%);
		filter: drop-shadow(0 0 10px color-mix(in oklab, #d4af37 35%, transparent));
	}

	.partner-ring-border--silver {
		background: linear-gradient(135deg, #f3f4f6 0%, #c0c0c0 40%, #8a8a8a 75%, #e5e7eb 100%);
		filter: drop-shadow(0 0 8px color-mix(in oklab, #c0c0c0 25%, transparent));
	}

	.partner-ring-border--default {
		background: color-mix(in oklab, var(--color-ecsess-150) 35%, transparent);
	}

	@property --partner-lapis-angle {
		syntax: '<angle>';
		inherits: false;
		initial-value: 0deg;
	}

	@keyframes partner-lapis-shine {
		to {
			--partner-lapis-angle: 360deg;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.partner-ring-border--platinum {
			animation: none;
		}
	}
</style>
