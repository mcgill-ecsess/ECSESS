<script lang="ts">
	import { onMount, tick } from 'svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import {
		codejamTiers,
		factoryTierThresholds,
		modules,
		tierThresholds
	} from '$lib/partnership/data';
	import type { Module, TierId } from '$lib/partnership/types';
	import { calculateTier, formatCurrency, nextTierInfo, tierLabel } from '$lib/partnership/logic';
	import { slide, fade } from 'svelte/transition';

	let { data } = $props();

	const steps = [
		{ id: 1, label: 'Sponsor Info' },
		{ id: 2, label: 'Module Selection' },
		{ id: 3, label: 'Proposal Summary' }
	];

	const STORAGE_KEY = 'ecsess-partnership-builder-v1';

	let step = $state(1);
	let validationMessage = $state('');
	let validationStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let summaryGeneratedAt = $state<string | null>(null);

	let state = $state({
		sponsorInfo: {
			companyName: '',
			primaryContactName: '',
			primaryContactEmail: '',
			sector: ''
		},
		selectedModules: [] as string[],
		codejamTierId: '' as string,
		totalValue: 0,
		ecsessTotal: 0,
		codejamTotal: 0,
		factoryTotal: 0,
		ecsessTier: 'none' as TierId,
		factoryTier: 'none' as TierId,
		codejamTier: null as string | null
	});

	const progress = $derived.by(() => {
		if (steps.length <= 1) return 0;
		return (step - 1) / (steps.length - 1);
	});

	const selectedModules = $derived.by(() =>
		modules.filter((module) => state.selectedModules.includes(module.id))
	);
	const ecsessSelected = $derived.by(() =>
		selectedModules.filter((module) => module.category === 'networking' || module.category === 'media')
	);
	const factorySelected = $derived.by(() =>
		selectedModules.filter((module) => module.category === 'factory')
	);

	const selectedCodejamTier = $derived.by(
		() => codejamTiers.find((tier) => tier.id === state.codejamTierId) ?? null
	);
	const codejamMaxValue = $derived.by(() =>
		codejamTiers.reduce((max, tier) => (tier.price > max ? tier.price : max), 0)
	);

	const ecsessTotal = $derived.by(() => {
		const moduleTotal = selectedModules
			.filter((module) => module.category !== 'factory' && module.category !== 'codejam')
			.reduce((sum, module) => sum + module.price, 0);
		return moduleTotal;
	});

	const factoryTotal = $derived.by(() => {
		const moduleTotal = selectedModules
			.filter((module) => module.category === 'factory')
			.reduce((sum, module) => sum + module.price, 0);
		return moduleTotal;
	});

	const calculatedTotal = $derived.by(() => {
		return ecsessTotal + (selectedCodejamTier?.price ?? 0) + factoryTotal;
	});

	const ecsessEngagementValue = $derived.by(() => ecsessTotal + (selectedCodejamTier?.price ?? 0));

	const calculatedTier = $derived.by(() => calculateTier(ecsessTotal, tierThresholds));
	const calculatedFactoryTier = $derived.by(() =>
		calculateTier(factoryTotal, {
			silver: factoryTierThresholds.silver,
			gold: factoryTierThresholds.gold,
			platinum: factoryTierThresholds.platinum,
			strategic: Number.POSITIVE_INFINITY
		})
	);
	const factoryNextTier = $derived.by(() => nextFactoryTierInfo(factoryTotal));

	function progressPercent(total: number, next: { threshold: number } | null): number {
		if (!next) return 100;
		if (next.threshold <= 0) return 0;
		const pct = Math.min(100, Math.max(0, (total / next.threshold) * 100));
		return pct;
	}

	const displayTier = $derived.by(() => {
		if (calculatedTier === 'platinum' && !data.availability.platinumAvailable) {
			return 'gold' as TierId;
		}
		return calculatedTier;
	});

	const platinumReserved = $derived.by(
		() => !data.availability.platinumAvailable && ecsessTotal >= tierThresholds.platinum
	);

	const nextTier = $derived.by(() => nextTierInfo(ecsessTotal, tierThresholds));

	$effect(() => {
		state.totalValue = calculatedTotal;
		state.ecsessTotal = ecsessTotal;
		state.codejamTotal = selectedCodejamTier?.price ?? 0;
		state.factoryTotal = factoryTotal;
		state.ecsessTier = displayTier;
		state.factoryTier = calculatedFactoryTier;
		state.codejamTier = selectedCodejamTier?.name ?? null;
	});

	const emailValid = $derived.by(() => {
		const email = state.sponsorInfo.primaryContactEmail.trim();
		if (email.length === 0) return false;
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	});

	const canProceed = $derived.by(() => true);

	$effect(() => {
		state.selectedModules;
		state.codejamTierId;
		if (validationStatus === 'success') {
			validationStatus = 'idle';
			summaryGeneratedAt = null;
		}
	});

	$effect(() => {
		if (typeof window === 'undefined') return;
		const payload = {
			step,
			sponsorInfo: state.sponsorInfo,
			selectedModules: state.selectedModules,
			codejamTierId: state.codejamTierId
		};
		try {
			window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
		} catch {
			// Ignore storage errors
		}
	});

	onMount(() => {
		try {
			const stored = window.sessionStorage.getItem(STORAGE_KEY);
			if (!stored) return;
			const parsed = JSON.parse(stored);
			if (parsed?.sponsorInfo) state.sponsorInfo = parsed.sponsorInfo;
			if (Array.isArray(parsed?.selectedModules)) state.selectedModules = parsed.selectedModules;
			if (typeof parsed?.codejamTierId === 'string') state.codejamTierId = parsed.codejamTierId;
			if (typeof parsed?.step === 'number' && parsed.step >= 1 && parsed.step <= steps.length) {
				step = parsed.step;
			}
		} catch {
			// Ignore parsing errors
		}
	});

	function setStep(target: number) {
		if (target < 1 || target > steps.length) return;
		step = target;
	}

	async function jumpToSection(targetStep: number, targetId: string) {
		setStep(targetStep);
		await tick();
		const el = document.getElementById(targetId);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	function toggleModule(moduleId: string) {
		if (state.selectedModules.includes(moduleId)) {
			state.selectedModules = state.selectedModules.filter((id) => id !== moduleId);
			return;
		}
		state.selectedModules = [...state.selectedModules, moduleId];
	}

	function modulesByCategory(category: string): Module[] {
		return modules.filter((module) => module.category === category);
	}

	const sectionPanels = $derived.by(() => ({
		wrapper: step === 2 ? 'bg-ecsess-black/70 border-ecsess-700' : 'bg-ecsess-900/70 border-ecsess-800',
		center: step === 2 ? 'bg-ecsess-black/70 border-ecsess-600/70' : 'bg-ecsess-900/70 border-ecsess-700/70'
	}));

	const leftMenuSections = $derived.by(() => [
		{ id: 'ecsess', label: 'ECSESS Modules' },
		{ id: 'codejam', label: 'CodeJam Sponsorship Tiers' },
		{ id: 'factory', label: 'Factory Modules' }
	]);

	const networkingModules = $derived.by(() => modulesByCategory('networking'));
	const mediaModules = $derived.by(() => modulesByCategory('media'));
	const factoryModules = $derived.by(() => modulesByCategory('factory'));
	const sortedCodejam = $derived.by(() => [...codejamTiers].sort((a, b) => b.price - a.price));

	let flippedCards = $state(new Set<string>());

	function isFlipped(id: string) {
		return flippedCards.has(id);
	}

	function toggleFlip(id: string) {
		const next = new Set(flippedCards);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		flippedCards = next;
	}

	function handleFlipKey(e: KeyboardEvent, id: string) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggleFlip(id);
		}
	}

	function codejamDescription(name: string) {
		return `${name} CodeJam sponsorship tier with hackathon visibility and on-site recognition.`;
	}

	function sectionToneClass(categoryId: string): string {
		if (categoryId === 'codejam') {
			return 'bg-[#0b1a2e]/70 border-[#1e3a5c]';
		}
		if (categoryId === 'factory') {
			return 'bg-[#0e2b2b]/70 border-[#1f6b6b]';
		}
		return 'bg-ecsess-950/60 border-ecsess-700';
	}

	function tagToneClass(categoryId: string): string {
		if (categoryId === 'factory') return 'bg-[#1f6b6b]/80';
		if (categoryId === 'codejam') return 'bg-[#1d4f8b]/80';
		return 'bg-ecsess-500/80';
	}

	function nextFactoryTierInfo(total: number) {
		const ordered = [
			{ id: 'silver', label: 'Silver', threshold: factoryTierThresholds.silver },
			{ id: 'gold', label: 'Gold', threshold: factoryTierThresholds.gold },
			{ id: 'platinum', label: 'Platinum', threshold: factoryTierThresholds.platinum }
		];

		const next = ordered.find((tier) => total < tier.threshold);
		if (!next) return null;
		return { id: next.id, label: next.label, amount: next.threshold - total, threshold: next.threshold };
	}

	function priceToneClass(categoryId: string): string {
		if (categoryId === 'factory') return 'text-[#7fcfcf]';
		if (categoryId === 'codejam') return 'text-[#7fb0ff]';
		return 'text-ecsess-200';
	}

	function actionToneClass(categoryId: string): string {
		if (categoryId === 'factory') {
			return 'bg-[#1f6b6b] hover:bg-[#2b8c8c] border-[#2b8c8c]';
		}
		if (categoryId === 'codejam') {
			return 'bg-[#1d4f8b] hover:bg-[#2b5c92] border-[#2b5c92]';
		}
		return 'bg-ecsess-500 hover:bg-ecsess-600 border-ecsess-600';
	}

	const categoryImages: Record<string, string> = {
		networking: '/Social.jpg',
		codejam: '/Technical.jpg',
		factory: '/Academic.jpg',
		media: '/Professional.jpg'
	};

	function moduleTags(category: string): string[] {
		switch (category) {
			case 'networking':
				return ['Networking', 'Recruiting'];
			case 'codejam':
				return ['CodeJam', 'Hackathon'];
			case 'factory':
				return ['Hardware', 'Lab'];
			case 'media':
				return ['Exposure', 'Brand'];
			default:
			return ['Module'];
		}
	}

	function toggleCodejamTier(tierId: string) {
		if (state.codejamTierId === tierId) {
			state.codejamTierId = '';
			return;
		}
		state.codejamTierId = tierId;
	}

	async function handleGenerateSummary() {
		validationStatus = 'loading';
		validationMessage = '';
		summaryGeneratedAt = null;

		try {
			const res = await fetch('/sponsor/partnership-builder/validate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					selectedModules: state.selectedModules,
					codejamTierId: state.codejamTierId
				})
			});

			const payload = await res.json().catch(() => null);
			if (!res.ok || !payload?.ok) {
				validationStatus = 'error';
				validationMessage = payload?.reason || 'Unable to validate selections.';
				return;
			}

			state.totalValue = payload.total ?? state.totalValue;
			state.ecsessTotal = payload.ecsessTotal ?? state.ecsessTotal;
			state.codejamTotal = payload.codejamTotal ?? state.codejamTotal;
			state.factoryTotal = payload.factoryTotal ?? state.factoryTotal;
			state.ecsessTier = payload.tier ?? state.ecsessTier;
			state.factoryTier = payload.factoryTier ?? state.factoryTier;
			validationStatus = 'success';
			summaryGeneratedAt = new Date().toISOString();
		} catch {
			validationStatus = 'error';
			validationMessage = 'Unable to validate selections.';
		}
	}

	function printSummary() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}
</script>

<SeoMetaTags
	title="ECSESS Partnership Builder"
	description="Configure sponsorship modules and track ECSESS tier alignment."
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b" contentStart>
	<div class="builder-shell w-full max-w-none px-4 pb-12 text-ecsess-100 md:px-6 lg:px-10">
		<h1 class="page-title text-ecsess-50">Partnership Builder</h1>
		<p class="text-ecsess-200 max-w-3xl text-base leading-relaxed md:text-lg">
			A guided configuration tool for structuring ECSESS partnership packages. This builder
			supports leadership decisions, but does not approve or finalize sponsorship agreements.
		</p>

		<div class="mt-6 no-print">
			<div class="h-1 w-full rounded-full bg-ecsess-800">
				<div
					class="h-1 rounded-full bg-ecsess-500 transition-all"
					style:width={`${progress * 100}%`}
				></div>
			</div>
			<div class="mt-2 flex flex-col items-center gap-1 text-center text-xs font-semibold uppercase tracking-widest text-ecsess-300">
				<span>Step {step} of {steps.length}</span>
				<span>{steps[step - 1]?.label}</span>
			</div>
		</div>

		<div class="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
			<div class="relative">
				{#if step > 1}
					<div class="sticky top-16 self-start space-y-4">
						<div class="rounded-2xl border p-4 {sectionPanels.wrapper}">
							<p class="text-xs uppercase tracking-widest text-ecsess-300">Module Categories</p>
								<div class="mt-3 space-y-2 text-sm">
									{#if step === 2}
										{#each leftMenuSections as category}
											<button
												type="button"
												onclick={() => jumpToSection(2, `section-${category.id}`)}
												class="w-full rounded-md border border-transparent px-3 py-2 text-left text-ecsess-200 transition hover:border-ecsess-600 hover:text-ecsess-50 bg-ecsess-900/40"
											>
												{category.label}
											</button>
										{/each}
									{:else}
									<p class="text-ecsess-300 text-sm">
										Module shortcuts are available during module selection.
									</p>
									{/if}
								</div>
							</div>
						<div class="rounded-2xl border p-4 {sectionPanels.wrapper}">
							<p class="text-xs uppercase tracking-widest text-ecsess-300">Annual Engagement Summary</p>
							<div class="mt-3 space-y-4 text-sm text-ecsess-100">
								<div>
									<p class="text-[11px] uppercase tracking-widest text-ecsess-300">ECSESS Modules</p>
									<div class="mt-2 max-h-24 overflow-y-scroll snap-y snap-mandatory section-scrollbar-ecsess always-scrollbar-y">
										{#if ecsessSelected.length === 0}
											<div class="flex h-8 items-center text-ecsess-300">No selections yet.</div>
										{:else}
											{#each ecsessSelected as module}
												<div class="flex h-8 snap-start items-center border-b border-ecsess-800/60 last:border-b-0">
													✓ {module.name}
												</div>
											{/each}
										{/if}
									</div>
								</div>
								<div class="border-t border-ecsess-800 pt-3">
									<p class="text-[11px] uppercase tracking-widest text-ecsess-300">CodeJam Tiers</p>
									<div class="mt-2 max-h-24 overflow-y-scroll snap-y snap-mandatory section-scrollbar-ecsess always-scrollbar-y">
										{#if selectedCodejamTier}
											<div class="flex h-8 snap-start items-center border-b border-ecsess-800/60 last:border-b-0">
												✓ {selectedCodejamTier.name}
											</div>
										{:else}
											<div class="flex h-8 items-center text-ecsess-300">No selections yet.</div>
										{/if}
									</div>
								</div>
								<div class="border-t border-ecsess-800 pt-3">
									<p class="text-[11px] uppercase tracking-widest text-ecsess-300">Factory Modules</p>
									<div class="mt-2 max-h-24 overflow-y-scroll snap-y snap-mandatory section-scrollbar-ecsess always-scrollbar-y">
										{#if factorySelected.length === 0}
											<div class="flex h-8 items-center text-ecsess-300">No selections yet.</div>
										{:else}
											{#each factorySelected as module}
												<div class="flex h-8 snap-start items-center border-b border-ecsess-800/60 last:border-b-0">
													✓ {module.name}
												</div>
											{/each}
										{/if}
									</div>
								</div>
							</div>
						</div>
					</div>

				{/if}
			</div>

			<div class="space-y-6">
				{#if step === 1}
					<section
						id="section-sponsor-info"
						class="rounded-2xl border border-ecsess-700/70 bg-ecsess-900/70 p-6 shadow-sm no-print"
					>
						<h2 class="text-ecsess-50">Step 1 — Sponsor Identification</h2>
						<p class="text-ecsess-200 mb-6 text-sm md:text-base">
							Capture sponsor details to anchor future module planning and CRM entry.
						</p>
						<div class="grid gap-4 md:grid-cols-2">
							<label class="flex flex-col gap-2 text-sm text-ecsess-200">
								Company Name
								<input
									class="rounded-md border border-ecsess-700 bg-ecsess-950 px-3 py-2 text-ecsess-50"
									bind:value={state.sponsorInfo.companyName}
									placeholder="Company"
								/>
							</label>
							<label class="flex flex-col gap-2 text-sm text-ecsess-200">
								Primary Contact Name
								<input
									class="rounded-md border border-ecsess-700 bg-ecsess-950 px-3 py-2 text-ecsess-50"
									bind:value={state.sponsorInfo.primaryContactName}
									placeholder="Full name"
								/>
							</label>
							<label class="flex flex-col gap-2 text-sm text-ecsess-200">
								Primary Contact Email
								<input
									class="rounded-md border border-ecsess-700 bg-ecsess-950 px-3 py-2 text-ecsess-50"
									bind:value={state.sponsorInfo.primaryContactEmail}
									placeholder="name@company.com"
									aria-invalid={!emailValid && state.sponsorInfo.primaryContactEmail.trim().length > 0}
								/>
								{#if state.sponsorInfo.primaryContactEmail.trim().length > 0 && !emailValid}
									<span class="text-ecsess-300 text-xs">Enter a valid email format.</span>
								{/if}
							</label>
							<label class="flex flex-col gap-2 text-sm text-ecsess-200">
								Sector
								<input
									class="rounded-md border border-ecsess-700 bg-ecsess-950 px-3 py-2 text-ecsess-50"
									bind:value={state.sponsorInfo.sector}
									placeholder="Industry focus"
								/>
							</label>
						</div>
					</section>
				{/if}

				{#if step === 2}
					<section
						id="section-modules"
						class="space-y-6 rounded-2xl border p-6 shadow-sm no-print {sectionPanels.center}"
					>
						<h2 class="text-ecsess-50">Step 2 — Module Selection</h2>
						<p class="text-ecsess-200 text-sm md:text-base">
							Select modules to build an annual engagement plan. Pricing updates in real time.
						</p>

						<div
							id="section-ecsess"
							class="rounded-xl border p-4 overflow-visible {sectionToneClass('networking')}"
						>
							<div class="mb-4">
								<h3 class="text-ecsess-50 text-lg font-semibold">ECSESS Modules</h3>
								<p class="text-ecsess-300 text-xs uppercase tracking-widest">Networking Modules</p>
							</div>
							{#if networkingModules.length === 0}
								<p class="text-ecsess-300 text-sm">No modules configured for networking yet.</p>
							{:else}
								<div class="flex gap-6 overflow-x-auto overflow-y-visible px-4 py-8 section-scrollbar-ecsess always-scrollbar-x">
									{#each networkingModules as module}
										{@const isSelected = state.selectedModules.includes(module.id)}
										{@const flipId = `module:${module.id}`}
										<div
											class="group min-w-[260px] max-w-[320px] flex-1 rounded-xl perspective-[1000px] transition-transform duration-300 transform-gpu {isSelected
												? 'scale-[1.03] ring-2 ring-white/80 shadow-[0_0_22px_rgba(255,255,255,0.35)]'
												: 'scale-100'}"
										>
											<div
												class="grid h-full w-full rounded-xl transition-transform duration-500 transform-3d {isFlipped(flipId)
													? 'transform-[rotateY(180deg)]'
													: 'transform-[rotateY(0deg)]'}"
											>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-ecsess-700 bg-ecsess-900/70 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-ecsess-500 hover:shadow-ecsess-500/20 backface-hidden {isFlipped(flipId)
														? 'pointer-events-none opacity-0'
														: 'opacity-100'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="relative">
														<img
															src={categoryImages[module.category]}
															alt={`${module.name} preview`}
															class="h-32 w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100"
														/>
														<div
															class="absolute inset-0 bg-gradient-to-t from-ecsess-950/80 via-ecsess-950/10 to-transparent"
														></div>
														{#if isSelected}
															<div class="absolute inset-0 flex items-center justify-center">
																<span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/40 backdrop-blur">
																	Module selected
																</span>
															</div>
														{/if}
														<div class="absolute left-3 bottom-3 flex flex-wrap gap-2 text-[10px]">
															{#each moduleTags(module.category) as tag}
																<span class="rounded-full px-2 py-0.5 text-ecsess-50 {tagToneClass(module.category)}">
																	{tag}
																</span>
															{/each}
														</div>
													</div>
													<div class="p-4">
														<div class="flex items-center justify-between gap-2">
															<p class="text-ecsess-50 text-sm font-semibold">{module.name}</p>
															<span class="text-xs font-semibold {priceToneClass(module.category)}">
																{formatCurrency(module.price)}
															</span>
														</div>
														<button
															type="button"
															onclick={(e) => { e.stopPropagation(); toggleModule(module.id); }}
															class="mt-4 w-full rounded-md border px-3 py-2 text-xs font-semibold text-ecsess-50 transition {actionToneClass(module.category)}"
														>
															{isSelected ? 'Remove module from plan' : 'Add module to plan'}
														</button>
													</div>
												</div>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col justify-between rounded-xl border border-ecsess-700 bg-ecsess-950/90 p-4 text-left shadow-sm transition-opacity duration-500 backface-hidden transform-[rotateY(180deg)] {isFlipped(flipId)
														? 'opacity-100'
														: 'pointer-events-none opacity-0'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="space-y-2">
														<p class="text-ecsess-50 text-sm font-semibold">{module.name}</p>
														<p class="text-xs text-ecsess-200">{module.description}</p>
														{#if module.deliverables?.length}
															<p class="text-xs text-ecsess-300">
																Includes: {module.deliverables.join(' · ')}
															</p>
														{/if}
													</div>
													<div class="flex items-center justify-between pt-3 text-xs">
														<span class="font-semibold {priceToneClass(module.category)}">
															{formatCurrency(module.price)}
														</span>
														<span class="text-ecsess-300">Click to return</span>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}

							<div class="mt-6">
								<p class="text-ecsess-300 text-xs uppercase tracking-widest">Media Modules</p>
								{#if mediaModules.length === 0}
									<p class="text-ecsess-300 text-sm">No modules configured for media yet.</p>
								{:else}
									<div class="flex gap-6 overflow-x-auto overflow-y-visible px-4 py-8 section-scrollbar-ecsess always-scrollbar-x">
									{#each mediaModules as module}
										{@const isSelected = state.selectedModules.includes(module.id)}
										{@const flipId = `module:${module.id}`}
										<div
											class="group min-w-[260px] max-w-[320px] flex-1 rounded-xl perspective-[1000px] transition-transform duration-300 transform-gpu {isSelected
												? 'scale-[1.03] ring-2 ring-white/80 shadow-[0_0_22px_rgba(255,255,255,0.35)]'
												: 'scale-100'}"
										>
											<div
												class="grid h-full w-full rounded-xl transition-transform duration-500 transform-3d {isFlipped(flipId)
													? 'transform-[rotateY(180deg)]'
													: 'transform-[rotateY(0deg)]'}"
											>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-ecsess-700 bg-ecsess-900/70 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-ecsess-500 hover:shadow-ecsess-500/20 backface-hidden {isFlipped(flipId)
														? 'pointer-events-none opacity-0'
														: 'opacity-100'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="relative">
														<img
															src={categoryImages[module.category]}
															alt={`${module.name} preview`}
															class="h-32 w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100"
														/>
														<div
															class="absolute inset-0 bg-gradient-to-t from-ecsess-950/80 via-ecsess-950/10 to-transparent"
														></div>
														{#if isSelected}
															<div class="absolute inset-0 flex items-center justify-center">
																<span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/40 backdrop-blur">
																	Module selected
																</span>
															</div>
														{/if}
														<div class="absolute left-3 bottom-3 flex flex-wrap gap-2 text-[10px]">
															{#each moduleTags(module.category) as tag}
																<span class="rounded-full px-2 py-0.5 text-ecsess-50 {tagToneClass(module.category)}">
																	{tag}
																</span>
															{/each}
														</div>
													</div>
													<div class="p-4">
														<div class="flex items-center justify-between gap-2">
															<p class="text-ecsess-50 text-sm font-semibold">{module.name}</p>
															<span class="text-xs font-semibold {priceToneClass(module.category)}">
																{formatCurrency(module.price)}
															</span>
														</div>
														<button
															type="button"
															onclick={(e) => { e.stopPropagation(); toggleModule(module.id); }}
															class="mt-4 w-full rounded-md border px-3 py-2 text-xs font-semibold text-ecsess-50 transition {actionToneClass(module.category)}"
														>
															{isSelected ? 'Remove module from plan' : 'Add module to plan'}
														</button>
													</div>
												</div>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col justify-between rounded-xl border border-ecsess-700 bg-ecsess-950/90 p-4 text-left shadow-sm transition-opacity duration-500 backface-hidden transform-[rotateY(180deg)] {isFlipped(flipId)
														? 'opacity-100'
														: 'pointer-events-none opacity-0'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="space-y-2">
														<p class="text-ecsess-50 text-sm font-semibold">{module.name}</p>
														<p class="text-xs text-ecsess-200">{module.description}</p>
														{#if module.deliverables?.length}
															<p class="text-xs text-ecsess-300">
																Includes: {module.deliverables.join(' · ')}
															</p>
														{/if}
													</div>
													<div class="flex items-center justify-between pt-3 text-xs">
														<span class="font-semibold {priceToneClass(module.category)}">
															{formatCurrency(module.price)}
														</span>
														<span class="text-ecsess-300">Click to return</span>
													</div>
												</div>
											</div>
										</div>
									{/each}
									</div>
								{/if}
							</div>
						</div>

						<div
							id="section-codejam"
							class="rounded-xl border p-4 overflow-visible {sectionToneClass('codejam')}"
						>
							<div class="mb-4">
								<h3 class="text-ecsess-50 text-lg font-semibold">CodeJam Sponsorship Tiers</h3>
							</div>
							<div class="flex gap-6 overflow-x-auto overflow-y-visible px-4 py-8 section-scrollbar-codejam always-scrollbar-x">
								{#each sortedCodejam as tier}
									{@const isSelected = state.codejamTierId === tier.id}
									{@const flipId = `codejam:${tier.id}`}
									<div
										class="group min-w-[360px] max-w-[400px] flex-1 rounded-xl perspective-[1000px] transition-transform duration-300 transform-gpu {isSelected
											? 'scale-[1.03] ring-2 ring-white/80 shadow-[0_0_22px_rgba(255,255,255,0.35)]'
											: 'scale-100'}"
									>
										<div
											class="grid h-full w-full rounded-xl transition-transform duration-500 transform-3d {isFlipped(flipId)
												? 'transform-[rotateY(180deg)]'
												: 'transform-[rotateY(0deg)]'}"
										>
											<div
												class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#1e3a5c] bg-[#0f1f34]/85 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#2b5c92] hover:shadow-[#2b5c92]/30 backface-hidden {isFlipped(flipId)
													? 'pointer-events-none opacity-0'
													: 'opacity-100'}"
												role="button"
												tabindex="0"
												onclick={() => toggleFlip(flipId)}
												onkeydown={(e) => handleFlipKey(e, flipId)}
											>
												<div class="relative">
													<img
														src={categoryImages.codejam}
														alt="CodeJam tier"
														class="h-56 w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100"
													/>
													<div
														class="absolute inset-0 bg-gradient-to-t from-ecsess-950/80 via-ecsess-950/10 to-transparent"
													></div>
													{#if isSelected}
														<div class="absolute inset-0 flex items-center justify-center">
															<span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/40 backdrop-blur">
																Module selected
															</span>
														</div>
													{/if}
													<div class="absolute left-3 bottom-3 flex flex-wrap gap-2 text-[10px]">
														{#each moduleTags('codejam') as tag}
															<span class="rounded-full bg-[#1d4f8b]/80 px-2 py-0.5 text-ecsess-50">
																{tag}
															</span>
														{/each}
													</div>
												</div>
												<div class="p-6">
													<div class="flex flex-col gap-1">
														<p class="text-ecsess-50 text-sm font-semibold">
															{tier.name}
															{#if tier.id === 'name_partner' && !data.availability.codejamNamePartnerAvailable}
																<span class="text-ecsess-300 ml-2 text-xs uppercase">
																	Currently Reserved
																</span>
															{/if}
														</p>
														<span class="text-xs font-semibold {priceToneClass('codejam')}">
															{formatCurrency(tier.price)}
														</span>
													</div>
													<button
														type="button"
														onclick={(e) => { e.stopPropagation(); toggleCodejamTier(tier.id); }}
														disabled={
															tier.id === 'name_partner' && !data.availability.codejamNamePartnerAvailable
														}
														class="mt-4 w-full rounded-md border px-3 py-2 text-xs font-semibold text-ecsess-50 transition disabled:border-ecsess-800 disabled:text-ecsess-300 {actionToneClass('codejam')}"
													>
														{isSelected ? 'Remove module from plan' : 'Add module to plan'}
													</button>
												</div>
											</div>
											<div
												class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col justify-between rounded-xl border border-[#1e3a5c] bg-[#0b1a2e]/90 p-6 text-left shadow-sm transition-opacity duration-500 backface-hidden transform-[rotateY(180deg)] {isFlipped(flipId)
													? 'opacity-100'
													: 'pointer-events-none opacity-0'}"
												role="button"
												tabindex="0"
												onclick={() => toggleFlip(flipId)}
												onkeydown={(e) => handleFlipKey(e, flipId)}
											>
												<div class="space-y-2">
													<p class="text-ecsess-50 text-sm font-semibold">{tier.name}</p>
													<p class="text-xs text-ecsess-200">{codejamDescription(tier.name)}</p>
													<p class="text-xs text-ecsess-300">
														Exclusivity: {tier.exclusivity ? 'Yes' : 'No'}
													</p>
												</div>
												<div class="flex items-center justify-between pt-3 text-xs">
													<span class="font-semibold {priceToneClass('codejam')}">
														{formatCurrency(tier.price)}
													</span>
													<span class="text-ecsess-300">Click to return</span>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<div
							id="section-factory"
							class="rounded-xl border p-4 overflow-visible {sectionToneClass('factory')}"
						>
							<div class="mb-4">
								<h3 class="text-ecsess-50 text-lg font-semibold">Factory Modules</h3>
							</div>
							{#if factoryModules.length === 0}
								<p class="text-ecsess-300 text-sm">No modules configured for this category yet.</p>
							{:else}
								<div class="grid gap-6 py-6 md:grid-cols-2">
								{#each factoryModules as module}
										{@const isSelected = state.selectedModules.includes(module.id)}
										{@const flipId = `module:${module.id}`}
										<div
											class="group rounded-xl perspective-[1000px] transition-transform duration-300 transform-gpu {isSelected
												? 'scale-[1.03] ring-2 ring-white/80 shadow-[0_0_22px_rgba(255,255,255,0.35)]'
												: 'scale-100'}"
										>
											<div
												class="grid h-full w-full rounded-xl transition-transform duration-500 transform-3d {isFlipped(flipId)
													? 'transform-[rotateY(180deg)]'
													: 'transform-[rotateY(0deg)]'}"
											>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#1f6b6b] bg-[#0e2b2b]/80 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#2b8c8c] hover:shadow-[#2b8c8c]/30 backface-hidden {isFlipped(flipId)
														? 'pointer-events-none opacity-0'
														: 'opacity-100'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="relative">
														<img
															src={categoryImages[module.category]}
															alt={`${module.name} preview`}
															class="h-28 w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100"
														/>
														<div
															class="absolute inset-0 bg-gradient-to-t from-ecsess-950/80 via-ecsess-950/10 to-transparent"
														></div>
														{#if isSelected}
															<div class="absolute inset-0 flex items-center justify-center">
																<span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/40 backdrop-blur">
																	Module selected
																</span>
															</div>
														{/if}
														<div class="absolute left-3 bottom-3 flex flex-wrap gap-2 text-[10px]">
															{#each moduleTags(module.category) as tag}
																<span class="rounded-full px-2 py-0.5 text-ecsess-50 {tagToneClass(module.category)}">
																	{tag}
																</span>
															{/each}
														</div>
													</div>
													<div class="p-4">
														<div class="flex items-center justify-between gap-2">
															<p class="text-ecsess-50 text-sm font-semibold">{module.name}</p>
															<span class="text-xs font-semibold {priceToneClass(module.category)}">
																{formatCurrency(module.price)}
															</span>
														</div>
														<button
															type="button"
															onclick={(e) => { e.stopPropagation(); toggleModule(module.id); }}
															class="mt-4 w-full rounded-md border px-3 py-2 text-xs font-semibold text-ecsess-50 transition {actionToneClass(module.category)}"
														>
															{isSelected ? 'Remove module from plan' : 'Add module to plan'}
														</button>
													</div>
												</div>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col justify-between rounded-xl border border-[#1f6b6b] bg-[#0e2b2b]/90 p-4 text-left shadow-sm transition-opacity duration-500 backface-hidden transform-[rotateY(180deg)] {isFlipped(flipId)
														? 'opacity-100'
														: 'pointer-events-none opacity-0'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="space-y-2">
														<p class="text-ecsess-50 text-sm font-semibold">{module.name}</p>
														<p class="text-xs text-ecsess-200">{module.description}</p>
														{#if module.deliverables?.length}
															<p class="text-xs text-ecsess-300">
																Includes: {module.deliverables.join(' · ')}
															</p>
														{/if}
													</div>
													<div class="flex items-center justify-between pt-3 text-xs">
														<span class="font-semibold {priceToneClass(module.category)}">
															{formatCurrency(module.price)}
														</span>
														<span class="text-ecsess-300">Click to return</span>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</section>
				{/if}

				{#if step === 3}
					<section
						id="section-summary"
						class="rounded-2xl border border-ecsess-700/70 bg-ecsess-900/70 p-6 shadow-sm"
					>
						<div class="no-print">
							<h2 class="text-ecsess-50">Step 3 — Proposal Summary</h2>
							<p class="text-ecsess-200 mb-6 text-sm md:text-base">
								Generate a printable summary of selected modules, total engagement value, and tier
								status.
							</p>
							<div class="flex flex-wrap items-center gap-3">
								<button
									type="button"
									onclick={handleGenerateSummary}
									class="bg-ecsess-500 hover:bg-ecsess-600 rounded-md px-4 py-2 text-sm font-semibold text-ecsess-50"
									disabled={validationStatus === 'loading'}
								>
									{validationStatus === 'loading' ? 'Validating...' : 'Generate Summary'}
								</button>
								{#if validationStatus === 'success'}
									<button
										type="button"
										onclick={printSummary}
										class="bg-ecsess-800 hover:bg-ecsess-700 rounded-md px-4 py-2 text-sm font-semibold text-ecsess-50"
									>
										Print / Save as PDF
									</button>
								{/if}
							</div>

							{#if validationStatus === 'error'}
								<p class="text-ecsess-300 mt-3 text-sm">{validationMessage}</p>
							{/if}
						</div>

						{#if validationStatus === 'success'}
							<div class="printable mt-8 rounded-xl border border-ecsess-200 bg-ecsess-50 p-6">
								<div class="flex flex-wrap items-start justify-between gap-4">
									<div>
										<h3 class="text-xl font-semibold text-ecsess-900">
											ECSESS Partnership Proposal Summary
										</h3>
										<p class="text-sm text-ecsess-600">
											Generated {summaryGeneratedAt
												? new Date(summaryGeneratedAt).toLocaleString('en-US')
												: ''}
										</p>
									</div>
									<div class="text-right">
										<p class="text-xs uppercase tracking-widest text-ecsess-600">Total Value</p>
										<p class="text-lg font-semibold text-ecsess-900">
											{formatCurrency(state.totalValue)}
										</p>
									</div>
								</div>

								<div class="mt-6 grid gap-6 md:grid-cols-2">
									<div>
										<p class="text-xs uppercase tracking-widest text-ecsess-600">Sponsor</p>
										<p class="text-sm font-semibold text-ecsess-900">
											{state.sponsorInfo.companyName || '—'}
										</p>
										<p class="text-sm text-ecsess-700">
											{state.sponsorInfo.primaryContactName || '—'}
										</p>
										<p class="text-sm text-ecsess-700">
											{state.sponsorInfo.primaryContactEmail || '—'}
										</p>
										<p class="text-sm text-ecsess-700">{state.sponsorInfo.sector || '—'}</p>
									</div>
							<div>
								<p class="text-xs uppercase tracking-widest text-ecsess-600">Tier Status</p>
								<p class="text-sm font-semibold text-ecsess-900">
									ECSESS Tier: {tierLabel(state.ecsessTier)}
								</p>
								<p class="text-sm text-ecsess-700">
									CodeJam Tier: {state.codejamTier ?? 'None selected'}
								</p>
								<p class="text-sm text-ecsess-700">
									Factory Tier: {tierLabel(state.factoryTier)}
								</p>
								<p class="text-sm text-ecsess-700">
									Factory Engagement Value: {formatCurrency(state.factoryTotal)}
								</p>
								{#if platinumReserved}
									<p class="text-xs text-ecsess-500">
										Platinum designation is currently reserved.
									</p>
								{/if}
									</div>
								</div>

								<div class="mt-6">
									<p class="text-xs uppercase tracking-widest text-ecsess-600">Selected Modules</p>
									{#if selectedModules.length === 0 && !selectedCodejamTier}
										<p class="text-sm text-ecsess-700">No modules selected.</p>
									{:else}
										<div class="mt-3 space-y-3">
											{#if selectedCodejamTier}
												<div class="rounded-md border border-ecsess-200 p-3">
													<p class="text-sm font-semibold text-ecsess-900">
														CodeJam {selectedCodejamTier.name}
													</p>
													<p class="text-xs text-ecsess-700">
														{formatCurrency(selectedCodejamTier.price)}
													</p>
												</div>
											{/if}
											{#each selectedModules as module}
												<div class="rounded-md border border-ecsess-200 p-3">
													<p class="text-sm font-semibold text-ecsess-900">{module.name}</p>
													<p class="text-xs text-ecsess-700">
														{formatCurrency(module.price)}
													</p>
												</div>
											{/each}
										</div>
									{/if}
								</div>

								<div class="mt-6 border-t border-ecsess-200 pt-4 text-xs text-ecsess-600">
									<p>
										This summary supports proposal discussion. Final approval and contract execution are
										handled by ECSESS leadership.
									</p>
								</div>
							</div>
						{/if}
					</section>
				{/if}

				{#if step === 1}
					<div class="flex items-center justify-end no-print">
						<button
							type="button"
							onclick={() => setStep(step + 1)}
							disabled={step === steps.length || !canProceed}
							class="bg-ecsess-500 hover:bg-ecsess-600 rounded-md px-4 py-2 text-sm font-semibold text-ecsess-50 disabled:bg-ecsess-800 disabled:text-ecsess-300"
						>
							Move to module selection
						</button>
					</div>
				{/if}
			</div>

			<div class="relative flex flex-col">
				{#if step > 1}
					<div class="sticky top-8 self-start">
						<div class="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border p-6 shadow-sm {sectionPanels.wrapper} section-scrollbar-factory">
							<p class="text-xs uppercase tracking-widest text-ecsess-300 text-center">
								ECSESS Networking Events Engagement Value
							</p>
							<p class="text-2xl font-semibold text-ecsess-50 text-center">
								{formatCurrency(ecsessEngagementValue)}
							</p>
							<div class="mt-4 border-t border-ecsess-800 pt-4">
								<p class="text-xs uppercase tracking-widest text-ecsess-300">
									Current Tier — ECSESS Networking Events
								</p>
								<p class="text-lg font-semibold text-ecsess-50">{tierLabel(displayTier)}</p>
								{#if platinumReserved}
									<p class="text-xs text-ecsess-300 mt-2">
										Platinum designation is currently reserved.
									</p>
								{/if}
								{#if nextTier}
									{#if nextTier.id === 'platinum' && !data.availability.platinumAvailable}
										<p class="text-sm text-ecsess-200 mt-2">
											Platinum Partner status is currently reserved.
										</p>
									{:else}
										<p class="text-sm text-ecsess-200 mt-2">
											{formatCurrency(nextTier.amount)} to {nextTier.label} Partner status.
										</p>
									{/if}
								{:else}
									<p class="text-sm text-ecsess-200 mt-2">Strategic Partner tier achieved.</p>
								{/if}
								<div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-ecsess-800">
									<div
										class="progress-bar-xs h-full rounded-full bg-ecsess-600 transition-all"
										style:width={`${progressPercent(state.ecsessTotal, nextTier)}%`}
									></div>
								</div>
							</div>

							<div class="mt-4 border-t border-ecsess-800 pt-4 text-sm text-ecsess-200">
								{#if state.codejamTotal > 0 || selectedCodejamTier}
									<div class="space-y-2" in:slide={{ duration: 220 }}>
										<p class="text-xs uppercase tracking-widest text-ecsess-300 text-center">
											CodeJam Tier
										</p>
										<p class="text-2xl font-semibold text-ecsess-50 text-center">
											{selectedCodejamTier?.name ?? 'None selected'}
										</p>
										<p class="mt-1 text-center text-sm text-ecsess-200">
											CodeJam Engagement Value: {formatCurrency(state.codejamTotal)}
										</p>
										<div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-ecsess-800">
											<div
												class="h-full rounded-full bg-[#2b5c92] transition-all"
												style:width={`${codejamMaxValue ? Math.min(100, (state.codejamTotal / codejamMaxValue) * 100) : 0}%`}
											></div>
										</div>
									</div>
								{/if}

								{#if state.factoryTotal > 0}
									<div class="mt-4 border-t border-ecsess-800 pt-4 space-y-2" in:slide={{ duration: 220 }}>
										<p class="text-xs uppercase tracking-widest text-ecsess-300 text-center">
											Factory Tier
										</p>
										<p class="text-2xl font-semibold text-ecsess-50 text-center">
											{tierLabel(state.factoryTier)}
										</p>
										<p class="mt-1 text-center text-sm text-ecsess-200">
											Factory Engagement Value: {formatCurrency(state.factoryTotal)}
										</p>
										{#if factoryNextTier}
											<p>{formatCurrency(factoryNextTier.amount)} to Factory {factoryNextTier.label}</p>
										{:else if state.factoryTier === 'platinum'}
											<p>Platinum Factory tier achieved.</p>
										{/if}
										<div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-ecsess-800">
											<div
												class="progress-bar-factory h-full rounded-full bg-ecsess-400 transition-all"
												style:width={`${progressPercent(state.factoryTotal, factoryNextTier)}%`}
											></div>
										</div>
									</div>
								{/if}
							</div>
							<div class="no-print mt-6 space-y-3">
								<button
									type="button"
									onclick={() => setStep(step - 1)}
									class="w-full bg-ecsess-500 hover:bg-ecsess-600 rounded-md px-4 py-2 text-sm font-semibold text-ecsess-50"
								>
									← {step === 2 ? 'Go back to sponsor info' : 'Go back to module selection'}
								</button>
								<button
									type="button"
									onclick={() => setStep(step + 1)}
									disabled={step === steps.length || !canProceed}
									class="w-full bg-ecsess-500 hover:bg-ecsess-600 rounded-md px-4 py-2 text-sm font-semibold text-ecsess-50 disabled:bg-ecsess-800 disabled:text-ecsess-300"
								>
									Move to proposal summary →
								</button>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</Section>

<style>
	@media print {
		:global(nav),
		:global(footer) {
			display: none !important;
		}

		.no-print {
			display: none !important;
		}

		.printable {
			display: block !important;
		}

		body {
			background: #ffffff;
		}
	}

	.progress-bar-xs {
		animation: progressPulse 2.4s ease-in-out infinite;
	}

	.progress-bar-factory {
		animation: progressPulse 2.4s ease-in-out infinite;
	}

	@keyframes progressPulse {
		0%,
		100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
		}
	}

	.section-scrollbar-codejam {
		scrollbar-color: #2b5c92 #0b1a2e;
	}

	.section-scrollbar-factory {
		scrollbar-color: #2b8c8c #0e2b2b;
	}

	.section-scrollbar-codejam::-webkit-scrollbar,
	.section-scrollbar-factory::-webkit-scrollbar {
		height: 6px;
		width: 6px;
	}

	.section-scrollbar-codejam::-webkit-scrollbar-track {
		background-color: #0b1a2e;
		border-radius: 999px;
	}

	.section-scrollbar-codejam::-webkit-scrollbar-thumb {
		background-color: #2b5c92;
		border-radius: 999px;
	}

	.section-scrollbar-factory::-webkit-scrollbar-track {
		background-color: #0e2b2b;
		border-radius: 999px;
	}

	.section-scrollbar-factory::-webkit-scrollbar-thumb {
		background-color: #2b8c8c;
		border-radius: 999px;
	}

	.always-scrollbar-x {
		overflow-x: scroll;
		scrollbar-gutter: stable both-edges;
	}

	.always-scrollbar-y {
		overflow-y: scroll;
		scrollbar-gutter: stable;
	}

	.section-scrollbar-ecsess {
		scrollbar-color: #5a8b5a #062c20;
	}

	.section-scrollbar-ecsess::-webkit-scrollbar {
		height: 6px;
		width: 6px;
	}

	.section-scrollbar-ecsess::-webkit-scrollbar-track {
		background-color: #062c20;
		border-radius: 999px;
	}

	.section-scrollbar-ecsess::-webkit-scrollbar-thumb {
		background-color: #5a8b5a;
		border-radius: 999px;
	}
</style>