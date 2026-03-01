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
import { slide, fade, fly } from 'svelte/transition';

	let { data } = $props();

	const steps = [
		{ id: 1, label: 'Contact Details' },
		{ id: 2, label: 'Module Selection' },
		{ id: 3, label: 'Proposal Summary' }
	];

	let activeSection = $state<'ecsess' | 'codejam' | 'factory'>('ecsess');

	function goToSection(id: 'ecsess' | 'codejam' | 'factory') {
		activeSection = id;
		if (typeof document !== 'undefined') {
			requestAnimationFrame(() => {
				const container = document.getElementById('section-modules');
				const builderTop = document.querySelector('.builder-shell');
				builderTop?.scrollIntoView({ behavior: 'smooth', block: 'start' });
				if (container) container.scrollTop = 0;
			});
		}
	}

	const STORAGE_KEY = 'ecsess-partnership-builder-v1';

	let step = $state(1);
	let validationMessage = $state('');
	let validationStatus = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let summaryGeneratedAt = $state<string | null>(null);
	const themeMode = $derived.by(() => (step === 2 ? activeSection : 'ecsess'));
	let removeTarget = $state<{ kind: 'module' | 'codejam'; id: string; name: string } | null>(null);

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

	function requestRemoveModule(id: string, name: string) {
		removeTarget = { kind: 'module', id, name };
	}

	function requestRemoveCodejam() {
		if (selectedCodejamTier) {
			removeTarget = { kind: 'codejam', id: selectedCodejamTier.id, name: selectedCodejamTier.name };
		}
	}

	function confirmRemove() {
		if (!removeTarget) return;
		if (removeTarget.kind === 'module') {
			state.selectedModules = state.selectedModules.filter((id) => id !== removeTarget.id);
		} else {
			state.codejamTierId = '';
		}
		removeTarget = null;
	}

	function cancelRemove() {
		removeTarget = null;
	}

	function modulesByCategory(category: string): Module[] {
		return modules.filter((module) => module.category === category);
	}

	const sectionPanels = $derived.by(() => ({
		wrapper: step === 2 ? 'bg-ecsess-black/70 border-ecsess-700' : 'bg-ecsess-900/70 border-white/15',
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
	const codejamTierOrder = [
		'kilobyte',
		'megabyte',
		'gigabyte',
		'terabyte',
		'name_partner'
	] as const;
	const codejamTierSequence = $derived.by(() =>
		codejamTierOrder
			.map((id) => codejamTiers.find((tier) => tier.id === id))
			.filter((tier): tier is typeof codejamTiers[number] => Boolean(tier))
	);
	let codejamIndex = $state(0);
	const currentCodejamTier = $derived.by(() => codejamTierSequence[codejamIndex] ?? codejamTiers[0]);
	const codejamMaxIndex = $derived.by(() => Math.max(0, codejamTierSequence.length - 1));

	const codejamSections = [
		{
			title: 'Promotional',
			rows: [
				{ label: 'Distribution of promotional items', min: 0 },
				{ label: 'Logo hotlink on event website', min: 1 },
				{ label: 'Inclusion on all print marketing', scale: ['Extra Small', 'Small', 'Medium', 'Large', 'Prominent'] },
				{ label: 'Company shout out & thank you on website', min: 2 },
				{ label: 'Social media shoutout & company promo video', min: 3 },
				{ label: 'Logo on registration form & Facebook event page', scale: ['Small', 'Small', 'Medium', 'Large', 'Prominent'] },
				{ label: 'Event naming rights & logo in event logo', min: 4 }
			]
		},
		{
			title: 'Competition',
			rows: [
				{ label: 'Seat(s) at judging panel', min: 1 },
				{ label: 'Access to project submissions', min: 2 },
				{ label: 'Sponsor challenge prize', min: 2 },
				{ label: 'Host a workshop during event', min: 3 },
				{ label: 'Dedicated company announcement channel on Discord', min: 4 }
			]
		},
		{
			title: 'Recruitment',
			rows: [
				{ label: 'Tech/career fair booth to kick off CodeJam', min: 1 },
				{ label: 'Sponsor booth throughout event', min: 2 },
				{ label: 'Send recruiters and engineers (mentors)', min: 2 },
				{ label: 'Access to resume list and mailing list', min: 3 },
				{ label: 'Lightning networking sessions', min: 4 }
			]
		},
		{
			title: 'Ceremonies',
			rows: [
				{ label: 'Opening & closing ceremonies mention', min: 0 },
				{ label: 'Logo during ceremonies', scale: ['Extra Small', 'Small', 'Medium', 'Large', 'Prominent'] },
				{ label: 'Present sponsor challenge at opening ceremony', min: 2 },
				{ label: 'Promotional video / speech at opening ceremony', min: 3 },
				{ label: 'Keynote speech at closing ceremony', min: 4 }
			]
		}
	] as const;
	const flagshipModuleIds = [
		'flagship_industry_tour',
		'flagship_company_crawl',
		'flagship_speed_networking',
		'flagship_wine_cheese'
	];
	const flagshipModules = $derived.by(() =>
		modules.filter((module) => flagshipModuleIds.includes(module.id))
	);
	const networkingModulesList = $derived.by(() =>
		networkingModules.filter((module) => !flagshipModuleIds.includes(module.id))
	);

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
			return 'bg-transparent border-transparent';
		}
		if (categoryId === 'factory') {
			return 'bg-[#0e2b2b]/70 border-[#1f6b6b]';
		}
		return 'bg-ecsess-950/60 border-ecsess-700';
	}

	function tagToneClass(categoryId: string): string {
		return 'theme-tag';
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

	function factoryTierLabel(tier: TierId): string {
		switch (tier) {
			case 'silver':
				return 'Supporter';
			case 'gold':
				return 'Builder';
			case 'platinum':
				return 'Foundry Partner';
			default:
				return 'None';
		}
	}

	function priceToneClass(categoryId: string): string {
		return 'theme-accent';
	}

	function actionToneClass(categoryId: string): string {
		return 'theme-button';
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
		const idx = codejamTierSequence.findIndex((tier) => tier.id === tierId);
		if (idx !== -1) {
			codejamIndex = idx;
		}
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
	<div
		class="builder-shell w-screen min-h-[90vh] max-w-none -mx-4 px-4 pb-12 text-white/90 md:-mx-6 md:px-6 lg:-mx-10 lg:px-10"
		class:theme-ecsess={themeMode === 'ecsess'}
		class:theme-codejam={themeMode === 'codejam'}
		class:theme-factory={themeMode === 'factory'}
	>
		<h1 class="page-title text-white">Partnership Builder</h1>

		<div class="mt-6 no-print">
			<div class="h-1 w-full rounded-full bg-white/20">
				<div
					class="h-1 rounded-full bg-white/90 transition-all"
					style:width={`${progress * 100}%`}
				></div>
			</div>
			<div class="mt-2 flex flex-col items-center gap-1 text-center text-xs font-semibold uppercase tracking-widest text-white/70">
				<span>Step {step} of {steps.length}</span>
				<span>{steps[step - 1]?.label}</span>
			</div>
		</div>

		<div class="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_280px]">
			<div class="relative">
				{#if step > 1}
					<div class="sticky top-16 self-start space-y-4" in:fly={{ x: -40, opacity: 0, duration: 700 }}>
						<div class="rounded-2xl border p-4 theme-panel {sectionPanels.wrapper}">
							<p class="text-xs uppercase tracking-widest text-white/70">Module Categories</p>
								<div class="mt-3 space-y-2 text-sm">
									{#if step === 2}
										{#each leftMenuSections as category}
											<button
												type="button"
												onclick={() => goToSection(category.id as 'ecsess' | 'codejam' | 'factory')}
												class="w-full rounded-md border px-3 py-2 text-left text-white/80 transition theme-outline"
											>
												{category.label}
											</button>
										{/each}
									{:else}
									<p class="text-white/70 text-sm">
										Module shortcuts are available during module selection.
									</p>
									{/if}
								</div>
							</div>
						<div class="rounded-2xl border p-4 theme-panel {sectionPanels.wrapper}">
							<p class="text-xs uppercase tracking-widest text-white/70">Annual Engagement Summary</p>
							<div class="mt-3 space-y-4 text-sm text-white/90">
								<div>
									<p class="text-[11px] uppercase tracking-widest text-white/70">ECSESS Modules</p>
									<div class="mt-2 max-h-24 overflow-y-scroll snap-y snap-mandatory section-scrollbar-neutral always-scrollbar-y">
										{#if ecsessSelected.length === 0}
											<div class="flex h-8 items-center text-white/70">No selections yet.</div>
										{:else}
											{#each ecsessSelected as module}
												<div class="flex snap-start items-start justify-between gap-2 border-b border-transparent last:border-b-0 hover:bg-white/10 hover:border-white/20/60 py-1 rounded-md pr-2 text-left">
													<span class="leading-5 text-left">✓ {module.name}</span>
													<button
														type="button"
														class="shrink-0 items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-red-600/80"
														onclick={() => requestRemoveModule(module.id, module.name)}
													>
														✕
													</button>
												</div>
											{/each}
										{/if}
									</div>
								</div>
								<div class="border-t border-white/15 pt-3">
									<p class="text-[11px] uppercase tracking-widest text-white/70">CodeJam Tiers</p>
									<div class="mt-2 max-h-24 overflow-y-scroll snap-y snap-mandatory section-scrollbar-neutral always-scrollbar-y">
										{#if selectedCodejamTier}
											<div class="flex snap-start items-start justify-between gap-2 border-b border-transparent last:border-b-0 hover:bg-white/10 hover:border-white/20/60 py-1 rounded-md pr-2 text-left">
												<span class="leading-5 text-left">✓ {selectedCodejamTier.name}</span>
												<button
													type="button"
													class="shrink-0 items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-red-600/80"
													onclick={requestRemoveCodejam}
												>
													✕
												</button>
											</div>
										{:else}
											<div class="flex h-8 items-center text-white/70">No selections yet.</div>
										{/if}
									</div>
								</div>
								<div class="border-t border-white/15 pt-3">
									<p class="text-[11px] uppercase tracking-widest text-white/70">Factory Modules</p>
									<div class="mt-2 max-h-24 overflow-y-scroll snap-y snap-mandatory section-scrollbar-neutral always-scrollbar-y">
										{#if factorySelected.length === 0}
											<div class="flex h-8 items-center text-white/70">No selections yet.</div>
										{:else}
											{#each factorySelected as module}
												<div class="flex snap-start items-start justify-between gap-2 border-b border-transparent last:border-b-0 hover:bg-white/10 hover:border-white/20/60 py-1 rounded-md pr-2 text-left">
													<span class="leading-5 text-left">✓ {module.name}</span>
													<button
														type="button"
														class="shrink-0 items-center rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white hover:bg-red-600/80"
														onclick={() => requestRemoveModule(module.id, module.name)}
													>
														✕
													</button>
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
						<h2 class="text-white">Step 1 — Sponsor Identification</h2>
						<p class="text-white/80 mb-6 text-sm md:text-base">
							
						</p>
						<div class="grid gap-4 md:grid-cols-2">
							<label class="flex flex-col gap-2 text-sm text-white/80">
								Company Name
								<input
									class="rounded-md border border-ecsess-700 bg-ecsess-950 px-3 py-2 text-white"
									bind:value={state.sponsorInfo.companyName}
									placeholder="Company"
								/>
							</label>
							<label class="flex flex-col gap-2 text-sm text-white/80">
								Primary Contact Name
								<input
									class="rounded-md border border-ecsess-700 bg-ecsess-950 px-3 py-2 text-white"
									bind:value={state.sponsorInfo.primaryContactName}
									placeholder="Full name"
								/>
							</label>
							<label class="flex flex-col gap-2 text-sm text-white/80">
								Primary Contact Email
								<input
									class="rounded-md border border-ecsess-700 bg-ecsess-950 px-3 py-2 text-white"
									bind:value={state.sponsorInfo.primaryContactEmail}
									placeholder="name@company.com"
									aria-invalid={!emailValid && state.sponsorInfo.primaryContactEmail.trim().length > 0}
								/>
								{#if state.sponsorInfo.primaryContactEmail.trim().length > 0 && !emailValid}
									<span class="text-white/70 text-xs">Enter a valid email format.</span>
								{/if}
							</label>
							<label class="flex flex-col gap-2 text-sm text-white/80">
								Sector
								<input
									class="rounded-md border border-ecsess-700 bg-ecsess-950 px-3 py-2 text-white"
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
						class="space-y-6 rounded-2xl border p-6 shadow-sm no-print theme-panel {sectionPanels.center}"
					>
						<h2 class="text-white">Step 2 — Module Selection</h2>
						<p class="text-white/80 text-sm md:text-base">
							Select modules to build an annual engagement plan. Pricing updates in real time.
						</p>
						<div class="mt-2 flex items-center justify-between gap-4">
							{#if activeSection !== 'ecsess'}
								<button
									type="button"
									onclick={() => goToSection(activeSection === 'factory' ? 'codejam' : 'ecsess')}
									class="rounded-full border px-4 py-2 text-xs font-semibold text-white theme-button"
								>
									Head back to {activeSection === 'factory' ? 'CodeJam modules' : 'ECSESS modules'}
								</button>
							{:else}
								<button
									type="button"
									onclick={() => setStep(1)}
									class="rounded-full border px-4 py-2 text-xs font-semibold text-white theme-button"
								>
									Head back to Contact Details
								</button>
							{/if}
							{#if activeSection !== 'factory'}
								<button
									type="button"
									onclick={() => goToSection(activeSection === 'ecsess' ? 'codejam' : 'factory')}
									class="rounded-full border px-4 py-2 text-xs font-semibold text-white theme-button"
								>
									Move to {activeSection === 'ecsess' ? 'CodeJam modules' : 'Factory modules'}
								</button>
							{:else}
								<span></span>
							{/if}
						</div>

						{#key activeSection}
						{#if activeSection === 'ecsess'}
						<div
							id="section-ecsess"
							class="panel-enter rounded-xl border p-4 overflow-visible {sectionToneClass('networking')}"
						>
							<div class="mb-4">
								<h3 class="text-white text-lg font-semibold">ECSESS Modules</h3>
								<p class="text-white/70 text-xs uppercase tracking-widest">Networking Modules</p>
							</div>
							<div class="mb-8">
								<p class="text-white/70 text-xs uppercase tracking-widest">Flagship Events</p>
								<div class="mt-4 grid gap-6 md:grid-cols-2">
									{#each flagshipModules as module, idx (module.id)}
										{@const isSelected = state.selectedModules.includes(module.id)}
										{@const flipId = `flagship:${module.id}`}
										<div
											class="card-enter group rounded-xl perspective-[1000px] transition-transform duration-300 transform-gpu hover:-translate-y-2 aspect-square {isSelected
												? 'scale-[1.03] ring-2 ring-white/80 shadow-[0_0_22px_rgba(255,255,255,0.35)]'
												: 'scale-100'}"
										>
											<div
												class="grid h-full w-full rounded-xl transition-transform duration-500 transform-3d {isFlipped(flipId)
													? 'transform-[rotateY(180deg)]'
													: 'transform-[rotateY(0deg)]'}"
											>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-ecsess-700 bg-ecsess-900/70 shadow-sm transition duration-300 hover:border-ecsess-500 hover:shadow-ecsess-500/20 backface-hidden {isFlipped(flipId)
														? 'pointer-events-none opacity-0'
														: 'opacity-100'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="relative flex-[8] min-h-0">
														<img
															src={categoryImages[module.category]}
															alt={`${module.name} preview`}
															class="h-full w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100 {isSelected ? 'opacity-100' : 'opacity-80'}"
														/>
														<div
															class="absolute inset-0 bg-gradient-to-t from-ecsess-950/80 via-ecsess-950/10 to-transparent"
														></div>
														{#if isSelected}
															<div class="absolute inset-0 flex items-center justify-center">
																<span class="rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/45 backdrop-blur pointer-events-none">
																	Module selected
																</span>
															</div>
														{/if}
														<div class="absolute left-3 bottom-3 flex flex-wrap gap-2 text-[10px]">
															{#each moduleTags(module.category) as tag}
																<span class="rounded-full px-2 py-0.5 text-white {tagToneClass(module.category)}">
																	{tag}
																</span>
															{/each}
														</div>
														{#if idx === 0}
															<span class="hint-bob absolute right-3 top-3 rounded-full bg-black/35 px-2 py-1 text-[10px] font-semibold text-white ring-1 ring-white/45">
																Click on the card to learn more!
															</span>
														{/if}
													</div>
													<div class="p-4 flex flex-[2] flex-col gap-2">
														<div class="flex items-center justify-between gap-2 min-w-0">
															<p class="text-white text-sm font-semibold truncate overflow-hidden whitespace-nowrap block w-full">{module.name}</p>
															<span class="text-xs font-semibold {priceToneClass(module.category)}">
																{formatCurrency(module.price)}
															</span>
														</div>
														<button
															type="button"
															onclick={(e) => { e.stopPropagation(); toggleModule(module.id); }}
															class="mt-2 w-full rounded-md border px-3 py-2 text-xs font-semibold text-white transition {actionToneClass(module.category)}"
														>
															{isSelected ? 'Remove module from plan' : 'Add module to plan'}
														</button>
													</div>
												</div>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col rounded-xl border border-ecsess-700 bg-ecsess-950/90 p-4 text-left shadow-sm transition-opacity duration-500 backface-hidden transform-[rotateY(180deg)] {isFlipped(flipId)
														? 'opacity-100'
														: 'pointer-events-none opacity-0'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="space-y-2">
														<p class="text-white text-sm font-semibold truncate overflow-hidden whitespace-nowrap block w-full">{module.name}</p>
														<p class="text-xs text-white/80">{module.description}</p>
													</div>
													<div class="mt-auto flex items-center justify-between pt-3 text-xs">
														<span class="font-semibold {priceToneClass(module.category)}">
															{formatCurrency(module.price)}
														</span>
														<span class="text-white/70">Click to return</span>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
							{#if networkingModulesList.length === 0}
								<p class="text-white/70 text-sm">No modules configured for networking yet.</p>
							{:else}
								<div class="flex gap-6 overflow-x-auto overflow-y-visible px-4 py-8 section-scrollbar-ecsess scroll-row">
									{#each networkingModulesList as module, idx (module.id)}
										{@const isSelected = state.selectedModules.includes(module.id)}
										{@const flipId = `module:${module.id}`}
										<div
											class="card-enter group min-w-[260px] max-w-[320px] flex-1 rounded-xl perspective-[1000px] transition-transform duration-300 transform-gpu hover:-translate-y-2 {isSelected
												? 'scale-[1.03] ring-2 ring-white/80 shadow-[0_0_22px_rgba(255,255,255,0.35)]'
												: 'scale-100'}"
										>
											<div
												class="grid h-full w-full rounded-xl transition-transform duration-500 transform-3d {isFlipped(flipId)
													? 'transform-[rotateY(180deg)]'
													: 'transform-[rotateY(0deg)]'}"
											>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-ecsess-700 bg-ecsess-900/70 shadow-sm transition duration-300  hover:border-ecsess-500 hover:shadow-ecsess-500/20 backface-hidden {isFlipped(flipId)
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
															class="h-32 w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100 {isSelected ? 'opacity-100' : 'opacity-80'}"
														/>
														<div
															class="absolute inset-0 bg-gradient-to-t from-ecsess-950/80 via-ecsess-950/10 to-transparent"
														></div>
														{#if isSelected}
															<div class="absolute inset-0 flex items-center justify-center">
																<span class="rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/45 backdrop-blur pointer-events-none">
																	Module selected
																</span>
															</div>
														{/if}
														<div class="absolute left-3 bottom-3 flex flex-wrap gap-2 text-[10px]">
															{#each moduleTags(module.category) as tag}
																<span class="rounded-full px-2 py-0.5 text-white {tagToneClass(module.category)}">
																	{tag}
																</span>
															{/each}
														</div>
														{#if idx === 0}
															<span class="hint-bob absolute right-3 top-3 rounded-full bg-black/35 px-2 py-1 text-[10px] font-semibold text-white ring-1 ring-white/45">
																Click on the card to learn more!
															</span>
														{/if}
													</div>
													<div class="p-4">
														<div class="flex items-center justify-between gap-2 min-w-0">
															<p class="text-white text-sm font-semibold truncate overflow-hidden whitespace-nowrap block w-full">{module.name}</p>
															<span class="text-xs font-semibold {priceToneClass(module.category)}">
																{formatCurrency(module.price)}
															</span>
														</div>
														<button
															type="button"
															onclick={(e) => { e.stopPropagation(); toggleModule(module.id); }}
															class="mt-4 w-full rounded-md border px-3 py-2 text-xs font-semibold text-white transition {actionToneClass(module.category)}"
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
														<p class="text-white text-sm font-semibold truncate overflow-hidden whitespace-nowrap block w-full">{module.name}</p>
														<p class="text-xs text-white/80">{module.description}</p>
														{#if module.deliverables?.length}
															<p class="text-xs text-white/70">
																Includes: {module.deliverables.join(' · ')}
															</p>
														{/if}
													</div>
													<div class="flex items-center justify-between pt-3 text-xs">
														<span class="font-semibold {priceToneClass(module.category)}">
															{formatCurrency(module.price)}
														</span>
														<span class="text-white/70">Click to return</span>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}

							<div class="mt-6">
								<p class="text-white/70 text-xs uppercase tracking-widest">Media Modules</p>
								{#if mediaModules.length === 0}
									<p class="text-white/70 text-sm">No modules configured for media yet.</p>
								{:else}
									<div class="flex gap-6 overflow-x-auto overflow-y-visible px-4 py-8 section-scrollbar-ecsess scroll-row">
									{#each mediaModules as module, idx (module.id)}
										{@const isSelected = state.selectedModules.includes(module.id)}
										{@const flipId = `module:${module.id}`}
										<div
											class="card-enter group min-w-[260px] max-w-[320px] flex-1 rounded-xl perspective-[1000px] transition-transform duration-300 transform-gpu hover:-translate-y-2 {isSelected
												? 'scale-[1.03] ring-2 ring-white/80 shadow-[0_0_22px_rgba(255,255,255,0.35)]'
												: 'scale-100'}"
										>
											<div
												class="grid h-full w-full rounded-xl transition-transform duration-500 transform-3d {isFlipped(flipId)
													? 'transform-[rotateY(180deg)]'
													: 'transform-[rotateY(0deg)]'}"
											>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-ecsess-700 bg-ecsess-900/70 shadow-sm transition duration-300  hover:border-ecsess-500 hover:shadow-ecsess-500/20 backface-hidden {isFlipped(flipId)
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
															class="h-32 w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100 {isSelected ? 'opacity-100' : 'opacity-80'}"
														/>
														<div
															class="absolute inset-0 bg-gradient-to-t from-ecsess-950/80 via-ecsess-950/10 to-transparent"
														></div>
														{#if isSelected}
															<div class="absolute inset-0 flex items-center justify-center">
																<span class="rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/45 backdrop-blur pointer-events-none">
																	Module selected
																</span>
															</div>
														{/if}
														<div class="absolute left-3 bottom-3 flex flex-wrap gap-2 text-[10px]">
															{#each moduleTags(module.category) as tag}
																<span class="rounded-full px-2 py-0.5 text-white {tagToneClass(module.category)}">
																	{tag}
																</span>
															{/each}
														</div>
														{#if idx === 0}
															<span class="hint-bob absolute right-3 top-3 rounded-full bg-black/35 px-2 py-1 text-[10px] font-semibold text-white ring-1 ring-white/45">
																Click on the card to learn more!
															</span>
														{/if}
													</div>
													<div class="p-4">
														<div class="flex items-center justify-between gap-2 min-w-0">
															<p class="text-white text-sm font-semibold truncate overflow-hidden whitespace-nowrap block w-full">{module.name}</p>
															<span class="text-xs font-semibold {priceToneClass(module.category)}">
																{formatCurrency(module.price)}
															</span>
														</div>
														<button
															type="button"
															onclick={(e) => { e.stopPropagation(); toggleModule(module.id); }}
															class="mt-4 w-full rounded-md border px-3 py-2 text-xs font-semibold text-white transition {actionToneClass(module.category)}"
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
														<p class="text-white text-sm font-semibold truncate overflow-hidden whitespace-nowrap block w-full">{module.name}</p>
														<p class="text-xs text-white/80">{module.description}</p>
														{#if module.deliverables?.length}
															<p class="text-xs text-white/70">
																Includes: {module.deliverables.join(' · ')}
															</p>
														{/if}
													</div>
													<div class="flex items-center justify-between pt-3 text-xs">
														<span class="font-semibold {priceToneClass(module.category)}">
															{formatCurrency(module.price)}
														</span>
														<span class="text-white/70">Click to return</span>
													</div>
												</div>
											</div>
										</div>
									{/each}
									</div>
								{/if}
							</div>
						</div>
						{:else if activeSection === 'codejam'}
						<div
							id="section-codejam"
							class="panel-enter rounded-xl border p-4 overflow-visible {sectionToneClass('codejam')}"
						>
							<div class="mb-4">
								<h3 class="text-white text-lg font-semibold">CodeJam Sponsorship Tiers</h3>
							</div>
							<div class="codejam-table-wrapper px-6 py-6">
								<div class="flex items-center justify-between text-xs text-white/80">
									<button
										type="button"
										onclick={() => (codejamIndex = Math.max(0, codejamIndex - 1))}
										disabled={codejamIndex === 0}
										class="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-white/80 transition hover:border-white/50 hover:text-white disabled:opacity-40"
									>
										<span aria-hidden="true">←</span>
										<span>Move to lower sponsorship tier</span>
									</button>
									<button
										type="button"
										onclick={() => (codejamIndex = Math.min(codejamMaxIndex, codejamIndex + 1))}
										disabled={codejamIndex === codejamMaxIndex}
										class="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-white/80 transition hover:border-white/50 hover:text-white disabled:opacity-40"
									>
										<span>Move to higher sponsorship tier</span>
										<span aria-hidden="true">→</span>
									</button>
								</div>

								{#if currentCodejamTier}
									{@const tier = currentCodejamTier}
									{@const isSelected = state.codejamTierId === tier.id}
									<div class="mt-6">
											<div class="space-y-6 text-left">
												<div class="text-left">
													<p class="text-white text-2xl font-semibold">{tier.name}</p>
													<p class="text-white/80 text-base">{formatCurrency(tier.price)}</p>
												</div>

											<div class="space-y-6">
												{#each codejamSections as section}
													<div>
														<p class="text-white text-xl font-semibold">{section.title}</p>
														<div class="mt-2 border-t border-white/20"></div>
														<div class="divide-y divide-white/10">
															{#each section.rows as row}
																<div class="codejam-row text-[15px] text-white/90 md:text-base">
																	<span class="codejam-label">{row.label}</span>
																	{#if row.scale}
																		{#key `${row.label}-${codejamIndex}`}
																			<span class="codejam-indicator">
																				<span class="codejam-indicator__slot">
																					<span
																						in:fly={{ x: 18, duration: 200, delay: 260 }}
																						out:fly={{ x: -18, duration: 160 }}
																						class="text-base font-semibold text-white"
																					>
																						{row.scale[Math.min(codejamIndex, row.scale.length - 1)]}
																					</span>
																				</span>
																			</span>
																		{/key}
																	{:else}
																		{#key `${row.label}-${codejamIndex}`}
																			<span class="codejam-indicator">
																				<span class="codejam-indicator__slot">
																					<span
																						in:fly={{ x: 18, duration: 200, delay: 260 }}
																						out:fly={{ x: -18, duration: 160 }}
																						class="codejam-dot {codejamIndex >= row.min ? 'codejam-dot--on' : 'codejam-dot--off'}"
																					></span>
																				</span>
																			</span>
																		{/key}
																	{/if}
																</div>
															{/each}
														</div>
													</div>
												{/each}
												</div>

												<div class="flex justify-center">
												<button
													type="button"
													onclick={() => toggleCodejamTier(tier.id)}
													disabled={
														tier.id === 'name_partner' && !data.availability.codejamNamePartnerAvailable
													}
													class="rounded-md border px-4 py-2 text-xs font-semibold text-white transition disabled:border-white/15 disabled:text-white/70 {actionToneClass('codejam')}"
												>
													{isSelected ? 'Unselect sponsorship tier' : 'Select sponsorship tier'}
												</button>
											</div>
										</div>
									</div>
								{/if}
							</div>
						</div>
						{:else}
						<div
							id="section-factory"
							class="panel-enter rounded-xl border p-4 overflow-visible {sectionToneClass('factory')}"
						>
							<div class="mb-4">
								<h3 class="text-white text-lg font-semibold">Factory Modules</h3>
							</div>
							{#if factoryModules.length === 0}
								<p class="text-white/70 text-sm">No modules configured for this category yet.</p>
							{:else}
								<div class="grid gap-6 py-6 md:grid-cols-2">
								{#each factoryModules as module, idx (module.id)}
										{@const isSelected = state.selectedModules.includes(module.id)}
										{@const flipId = `module:${module.id}`}
										<div
											class="card-enter group rounded-xl perspective-[1000px] transition-transform duration-300 transform-gpu hover:-translate-y-2 aspect-square {isSelected
												? 'scale-[1.03] ring-2 ring-white/80 shadow-[0_0_22px_rgba(255,255,255,0.35)]'
												: 'scale-100'}"
										>
											<div
												class="grid h-full w-full rounded-xl transition-transform duration-500 transform-3d {isFlipped(flipId)
													? 'transform-[rotateY(180deg)]'
													: 'transform-[rotateY(0deg)]'}"
											>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#1f6b6b] bg-[#0e2b2b]/80 shadow-sm transition duration-300  hover:border-[#2b8c8c] hover:shadow-[#2b8c8c]/30 backface-hidden {isFlipped(flipId)
														? 'pointer-events-none opacity-0'
														: 'opacity-100'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="relative flex-[8] min-h-0">
														<img
															src={categoryImages[module.category]}
															alt={`${module.name} preview`}
															class="h-full w-full object-cover opacity-80 transition duration-300 group-hover:opacity-100 {isSelected ? 'opacity-100' : 'opacity-80'}"
														/>
														<div
															class="absolute inset-0 bg-gradient-to-t from-ecsess-950/80 via-ecsess-950/10 to-transparent"
														></div>
														{#if isSelected}
															<div class="absolute inset-0 flex items-center justify-center">
																<span class="rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/45 backdrop-blur pointer-events-none">
																	Module selected
																</span>
															</div>
														{/if}
														<div class="absolute left-3 bottom-3 flex flex-wrap gap-2 text-[10px]">
															{#each moduleTags(module.category) as tag}
																<span class="rounded-full px-2 py-0.5 text-white {tagToneClass(module.category)}">
																	{tag}
																</span>
															{/each}
														</div>
														{#if idx === 0}
															<span class="hint-bob absolute right-3 top-3 rounded-full bg-black/35 px-2 py-1 text-[10px] font-semibold text-white ring-1 ring-white/45">
																Click on the card to learn more!
															</span>
														{/if}
													</div>
													<div class="p-4 flex flex-[2] flex-col gap-2">
														<div class="flex items-center justify-between gap-2 min-w-0">
															<p class="text-white text-sm font-semibold truncate overflow-hidden whitespace-nowrap block w-full">{module.name}</p>
															<span class="text-xs font-semibold {priceToneClass(module.category)}">
																{formatCurrency(module.price)}
															</span>
														</div>
														<button
															type="button"
															onclick={(e) => { e.stopPropagation(); toggleModule(module.id); }}
															class="mt-2 w-full rounded-md border px-3 py-2 text-xs font-semibold text-white transition {actionToneClass(module.category)}"
														>
															{isSelected ? 'Remove module from plan' : 'Add module to plan'}
														</button>
													</div>
												</div>
												<div
													class="col-start-1 row-start-1 flex h-full w-full cursor-pointer flex-col rounded-xl border border-[#1f6b6b] bg-[#0e2b2b]/90 p-4 text-left shadow-sm transition-opacity duration-500 backface-hidden transform-[rotateY(180deg)] {isFlipped(flipId)
														? 'opacity-100'
														: 'pointer-events-none opacity-0'}"
													role="button"
													tabindex="0"
													onclick={() => toggleFlip(flipId)}
													onkeydown={(e) => handleFlipKey(e, flipId)}
												>
													<div class="space-y-2">
														<p class="text-white text-sm font-semibold truncate overflow-hidden whitespace-nowrap block w-full">{module.name}</p>
														<p class="text-xs text-white/80">{module.description}</p>
														{#if module.deliverables?.length}
															<p class="text-xs text-white/70">
																Includes: {module.deliverables.join(' · ')}
															</p>
														{/if}
													</div>
													<div class="mt-auto flex items-center justify-between pt-3 text-xs">
														<span class="font-semibold {priceToneClass(module.category)}">
															{formatCurrency(module.price)}
														</span>
														<span class="text-white/70">Click to return</span>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
						{/if}
						{/key}
					</section>
				{/if}

				{#if step === 3}
					<section
						id="section-summary"
						class="rounded-2xl border border-ecsess-700/70 bg-ecsess-900/70 p-6 shadow-sm"
					>
						<div class="no-print">
							<h2 class="text-white">Step 3 — Proposal Summary</h2>
							<p class="text-white/80 mb-6 text-sm md:text-base">
								Generate a printable summary of selected modules, total engagement value, and tier
								status.
							</p>
							<div class="flex flex-wrap items-center gap-3">
								<button
									type="button"
									onclick={handleGenerateSummary}
									class="bg-ecsess-500 hover:bg-ecsess-600 rounded-md px-4 py-2 text-sm font-semibold text-white"
									disabled={validationStatus === 'loading'}
								>
									{validationStatus === 'loading' ? 'Validating...' : 'Generate Summary'}
								</button>
								{#if validationStatus === 'success'}
									<button
										type="button"
										onclick={printSummary}
										class="bg-white/20 hover:bg-ecsess-700 rounded-md px-4 py-2 text-sm font-semibold text-white"
									>
										Print / Save as PDF
									</button>
								{/if}
							</div>

							{#if validationStatus === 'error'}
								<p class="text-white/70 mt-3 text-sm">{validationMessage}</p>
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
										Factory Tier: {factoryTierLabel(state.factoryTier)}
									</p>
								<p class="text-sm text-ecsess-700">
									Factory Engagement Value: {formatCurrency(state.factoryTotal)}
								</p>
								{#if platinumReserved}
									<p class="text-xs text-white0">
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
							class="rounded-md px-4 py-2 text-sm font-semibold text-white theme-button disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Move to module selection
						</button>
					</div>
				{/if}
			</div>

			<div class="relative flex flex-col">
				{#if step > 1}
					<div class="sticky top-8 self-start" in:fly={{ x: 40, opacity: 0, duration: 700 }}>
						<div class="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border p-6 shadow-sm theme-panel {sectionPanels.wrapper} section-scrollbar-factory">
							<p class="text-xs uppercase tracking-widest text-white/70 text-center">
								ECSESS Networking Events Engagement Value
							</p>
							<p class="text-2xl font-semibold text-white text-center">
								{formatCurrency(ecsessEngagementValue)}
							</p>
							<div class="mt-4 border-t border-white/15 pt-4">
								<p class="text-xs uppercase tracking-widest text-white/70">
									Current Tier — ECSESS Networking Events
								</p>
								<p class="text-lg font-semibold text-white">{tierLabel(displayTier)}</p>
								{#if platinumReserved}
									<p class="text-xs text-white/70 mt-2">
										Platinum designation is currently reserved.
									</p>
								{/if}
								{#if nextTier}
									{#if nextTier.id === 'platinum' && !data.availability.platinumAvailable}
										<p class="text-sm text-white/80 mt-2">
											Platinum Partner status is currently reserved.
										</p>
									{:else}
										<p class="text-sm text-white/80 mt-2">
											{formatCurrency(nextTier.amount)} to {nextTier.label} Partner status.
										</p>
									{/if}
								{:else}
									<p class="text-sm text-white/80 mt-2">Strategic Partner tier achieved.</p>
								{/if}
								<div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
									<div
										class="progress-bar-xs h-full rounded-full bg-white/80 transition-all"
										style:width={`${progressPercent(state.ecsessTotal, nextTier)}%`}
									></div>
								</div>
							</div>

							<div class="mt-4 border-t border-white/15 pt-4 text-sm text-white/80">
								{#if state.codejamTotal > 0 || selectedCodejamTier}
									<div class="space-y-2" in:slide={{ duration: 220 }}>
										<p class="text-xs uppercase tracking-widest text-white/70 text-center">
											CodeJam Tier
										</p>
										<p class="text-2xl font-semibold text-white text-center">
											{selectedCodejamTier?.name ?? 'None selected'}
										</p>
										<p class="mt-1 text-center text-sm text-white/80">
											CodeJam Engagement Value: {formatCurrency(state.codejamTotal)}
										</p>
										<div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
											<div
												class="h-full rounded-full bg-white/80 transition-all"
												style:width={`${codejamMaxValue ? Math.min(100, (state.codejamTotal / codejamMaxValue) * 100) : 0}%`}
											></div>
										</div>
									</div>
								{/if}

								{#if state.factoryTotal > 0}
									<div class="mt-4 border-t border-white/15 pt-4 space-y-2" in:slide={{ duration: 220 }}>
										<p class="text-xs uppercase tracking-widest text-white/70 text-center">
											Factory Tier
										</p>
										<p class="text-2xl font-semibold text-white text-center">
											{factoryTierLabel(state.factoryTier)}
										</p>
										<p class="mt-1 text-center text-sm text-white/80">
											Factory Engagement Value: {formatCurrency(state.factoryTotal)}
										</p>
										{#if factoryNextTier}
											<p>{formatCurrency(factoryNextTier.amount)} to Factory {factoryTierLabel(factoryNextTier.id)}</p>
										{:else if state.factoryTier === 'platinum'}
											<p>Foundry Partner tier achieved.</p>
										{/if}
										<div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
											<div
												class="progress-bar-factory h-full rounded-full bg-white/80 transition-all"
												style:width={`${progressPercent(state.factoryTotal, factoryNextTier)}%`}
											></div>
										</div>
									</div>
								{/if}
							</div>
							<div class="no-print mt-6 space-y-3">
								<button
									type="button"
									onclick={() => setStep(step + 1)}
									disabled={step === steps.length || !canProceed}
									class="w-full rounded-md px-4 py-2 text-sm font-semibold text-white theme-button disabled:opacity-50 disabled:cursor-not-allowed"
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

{#if removeTarget}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
		<div
			class="w-full max-w-md rounded-2xl border p-6"
			style={`background-color: ${
				themeMode === 'codejam' ? '#1b2fa6' : themeMode === 'factory' ? '#1f7f6a' : '#1a5f2a'
			}; opacity: 1; filter: none; backdrop-filter: none;`}
		>
			<p class="text-sm uppercase tracking-widest text-white/70">Confirm Removal</p>
			<h3 class="mt-2 text-lg font-semibold text-white">Remove {removeTarget.name}?</h3>
			<p class="mt-2 text-sm text-white/80">
				Are you sure you want to remove this module from the annual engagement summary?
			</p>
			<div class="mt-6 flex items-center justify-end gap-3">
				<button
					type="button"
					class="rounded-md border px-4 py-2 text-xs font-semibold text-white/80 theme-outline"
					onclick={cancelRemove}
				>
					No
				</button>
				<button
					type="button"
					class="rounded-md bg-red-600/90 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
					onclick={confirmRemove}
				>
					Yes, remove
				</button>
			</div>
		</div>
	</div>
{/if}

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

	.theme-ecsess {
		--theme-bg-from: #1a5f2a;
		--theme-bg-to: #0b2d16;
		--theme-panel: rgba(10, 32, 18, 0.9);
		--theme-border: #2f6b3a;
		--theme-accent: #a6e36d;
		--theme-accent-strong: #5fbf63;
		--theme-text: #e7f6ee;
		--theme-muted: #b9d7c4;
	}

	.theme-codejam {
		--theme-bg-from: #1b2fa6;
		--theme-bg-to: #0b164f;
		--theme-panel: rgba(12, 22, 66, 0.9);
		--theme-border: #334b9f;
		--theme-accent: #b6c7ff;
		--theme-accent-strong: #5a78ff;
		--theme-text: #e6ecff;
		--theme-muted: #b6c3f1;
	}

	.theme-factory {
		--theme-bg-from: #1f7f6a;
		--theme-bg-to: #0f2f2a;
		--theme-panel: rgba(12, 40, 36, 0.9);
		--theme-border: #2e8f7a;
		--theme-accent: #8fe3c9;
		--theme-accent-strong: #4ec2a3;
		--theme-text: #e5fbf4;
		--theme-muted: #bfe6da;
	}

	.builder-shell.theme-ecsess,
	.builder-shell.theme-codejam,
	.builder-shell.theme-factory {
		background: linear-gradient(
				180deg,
				var(--nav-bg) 0%,
				var(--theme-bg-from) 18%,
				var(--theme-bg-to) 82%,
				var(--nav-bg) 100%
			),
			radial-gradient(circle at 20% 10%, var(--theme-bg-from), transparent 55%);
		border-radius: 24px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
	}
	.builder-shell.theme-ecsess,
	.builder-shell.theme-codejam,
	.builder-shell.theme-factory {
		--nav-bg: #1f1f1f;
	}

	.theme-panel {
		background-color: var(--theme-panel) !important;
		border-color: var(--theme-border) !important;
	}

	.theme-modal {
		background-color: color-mix(in srgb, var(--theme-accent-strong) 45%, var(--theme-panel)) !important;
		border-color: color-mix(in srgb, var(--theme-accent-strong) 65%, var(--theme-border)) !important;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
	}

	.bg-theme-solid {
		background-color: var(--theme-bg-from) !important;
	}

	.theme-accent {
		color: var(--theme-accent) !important;
	}

	.theme-tag {
		background-color: color-mix(in srgb, var(--theme-accent-strong) 70%, transparent) !important;
	}

	.theme-button {
		background-color: var(--theme-accent-strong) !important;
		border-color: var(--theme-accent-strong) !important;
	}

	.theme-button:hover {
		filter: brightness(1.08);
	}

	.theme-outline {
		background-color: color-mix(in srgb, var(--theme-panel) 60%, transparent) !important;
		border-color: color-mix(in srgb, var(--theme-accent-strong) 55%, transparent) !important;
	}

	.theme-outline:hover {
		background-color: color-mix(in srgb, var(--theme-panel) 80%, transparent) !important;
		border-color: var(--theme-accent-strong) !important;
		color: var(--theme-text) !important;
	}

	.builder-shell.theme-ecsess .theme-button,
	.builder-shell.theme-codejam .theme-button,
	.builder-shell.theme-factory .theme-button {
		color: #ffffff !important;
	}

	.bob {
		animation: bob 1.8s ease-in-out infinite;
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}

	.dot-bob {
		animation: dotBob 1.6s ease-in-out infinite;
	}

	.codejam-slider-wrap {
		min-width: 64px;
	}

	.codejam-table-wrapper {
		max-width: 980px;
		margin: 0 auto;
		width: 100%;
	}

	.codejam-indicator {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 120px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 12px;
		overflow: hidden;
	}

	.codejam-indicator__slot {
		position: relative;
		display: flex;
		align-items: center;
		height: 100%;
	}

	.codejam-row {
		position: relative;
		height: 56px;
		display: flex;
		align-items: center;
		padding: 0 12px;
		padding-right: 140px;
		overflow: hidden;
	}

	.codejam-label {
		display: block;
		flex: 1 1 auto;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.codejam-dot {
		width: 20px;
		height: 20px;
		border-radius: 999px;
		border: 2px solid rgba(255, 255, 255, 0.6);
		display: inline-block;
		flex: 0 0 20px;
		min-width: 20px;
		min-height: 20px;
	}

	.codejam-dot--on {
		background: #ffffff;
		border-color: #ffffff;
	}

	.codejam-dot--off {
		background: transparent;
	}

	@keyframes dotBob {
		0%,
		100% {
			transform: translateY(4px);
			opacity: 0.85;
		}
		50% {
			transform: translateY(-2px);
			opacity: 1;
		}
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

	.scroll-row {
		overflow-x: auto;
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

	.section-scrollbar-neutral {
		scrollbar-color: rgba(255, 255, 255, 0.6) rgba(255, 255, 255, 0.15);
	}

	.section-scrollbar-neutral::-webkit-scrollbar {
		height: 6px;
		width: 6px;
	}

	.section-scrollbar-neutral::-webkit-scrollbar-track {
		background-color: rgba(255, 255, 255, 0.15);
		border-radius: 999px;
	}

	.section-scrollbar-neutral::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.6);
		border-radius: 999px;
	}

	.panel-enter {
		animation: panelEnter 450ms ease both;
	}

	.card-enter {
		animation: cardEnter 500ms ease both;
	}

	.hint-bob {
		animation: hintBob 2.4s ease-in-out infinite;
	}

	@keyframes hintBob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-2px);
		}
	}

	@keyframes panelEnter {
		0% {
			opacity: 0;
			transform: translateX(-16px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes cardEnter {
		0% {
			opacity: 0;
			transform: translateX(-12px);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

</style>
