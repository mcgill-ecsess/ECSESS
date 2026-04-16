<script lang="ts">
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import { Copy, Check } from '@lucide/svelte';

	// ─── Colour Palette ──────────────────────────────────────────────────────────
	const palette = [
		{
			group: 'Light Shades',
			subtitle: 'Backgrounds & Cards',
			swatches: [
				{ name: 'ecsess-50', hex: '#e8ffd9', tw: 'bg-ecsess-50', dark: false },
				{ name: 'ecsess-100', hex: '#cce7ba', tw: 'bg-ecsess-100', dark: false },
				{ name: 'ecsess-150', hex: '#bae9a5', tw: 'bg-ecsess-150', dark: false },
				{ name: 'ecsess-200', hex: '#a9d0a0', tw: 'bg-ecsess-200', dark: false }
			]
		},
		{
			group: 'Mid-Light Shades',
			subtitle: 'Borders & Hover States',
			swatches: [
				{ name: 'ecsess-250', hex: '#9cc295', tw: 'bg-ecsess-250', dark: false },
				{ name: 'ecsess-300', hex: '#8fb98a', tw: 'bg-ecsess-300', dark: false },
				{ name: 'ecsess-350', hex: '#7daa7a', tw: 'bg-ecsess-350', dark: false },
				{ name: 'ecsess-400', hex: '#6a9a6a', tw: 'bg-ecsess-400', dark: false }
			]
		},
		{
			group: 'Mid Shades',
			subtitle: 'Accents & Interactive Elements',
			swatches: [
				{ name: 'ecsess-450', hex: '#62925a', tw: 'bg-ecsess-450', dark: true },
				{ name: 'ecsess-500', hex: '#5a8b5a', tw: 'bg-ecsess-500', dark: true },
				{ name: 'ecsess-550', hex: '#4c7a4f', tw: 'bg-ecsess-550', dark: true },
				{ name: 'ecsess-600', hex: '#3f6a3f', tw: 'bg-ecsess-600', dark: true }
			]
		},
		{
			group: 'Mid-Dark Shades',
			subtitle: 'Text on Light Backgrounds',
			swatches: [
				{ name: 'ecsess-650', hex: '#306032', tw: 'bg-ecsess-650', dark: true },
				{ name: 'ecsess-700', hex: '#2f4d29', tw: 'bg-ecsess-700', dark: true },
				{ name: 'ecsess-750', hex: '#1c4a1e', tw: 'bg-ecsess-750', dark: true },
				{ name: 'ecsess-800', hex: '#0a3d2a', tw: 'bg-ecsess-800', dark: true }
			]
		},
		{
			group: 'Dark Shades',
			subtitle: 'Text & Dark Backgrounds',
			swatches: [
				{ name: 'ecsess-850', hex: '#083525', tw: 'bg-ecsess-850', dark: true },
				{ name: 'ecsess-900', hex: '#062c20', tw: 'bg-ecsess-900', dark: true },
				{ name: 'ecsess-950', hex: '#031c15', tw: 'bg-ecsess-950', dark: true }
			]
		},
		{
			group: 'Black Variants',
			subtitle: 'UI Surfaces & Navigation',
			swatches: [
				{ name: 'ecsess-black', hex: '#1f1f1f', tw: 'bg-ecsess-black', dark: true },
				{ name: 'ecsess-black-hover', hex: '#161917', tw: 'bg-ecsess-black-hover', dark: true }
			]
		}
	];

	// ─── Copy-to-clipboard ───────────────────────────────────────────────────────
	let copiedKey = $state<string | null>(null);

	async function copyText(text: string, key: string) {
		try {
			await navigator.clipboard.writeText(text);
			copiedKey = key;
			setTimeout(() => (copiedKey = null), 1800);
		} catch {
			/* silent fail */
		}
	}

	// ─── Spacing scale ───────────────────────────────────────────────────────────
	const spacingScale = [
		{ token: 'p-1 / gap-1', rem: '0.25rem', px: '4px' },
		{ token: 'p-2 / gap-2', rem: '0.5rem', px: '8px' },
		{ token: 'p-3 / gap-3', rem: '0.75rem', px: '12px' },
		{ token: 'p-4 / gap-4', rem: '1rem', px: '16px' },
		{ token: 'p-6 / gap-6', rem: '1.5rem', px: '24px' },
		{ token: 'p-8 / gap-8', rem: '2rem', px: '32px' },
		{ token: 'p-12 / gap-12', rem: '3rem', px: '48px' },
		{ token: 'p-16 / gap-16', rem: '4rem', px: '64px' }
	];

	// ─── Border-radius scale ─────────────────────────────────────────────────────
	const radiusScale = [
		{ token: 'rounded-none', value: '0px', example: 'rounded-none' },
		{ token: 'rounded-sm', value: '2px', example: 'rounded-sm' },
		{ token: 'rounded-md', value: '6px', example: 'rounded-md' },
		{ token: 'rounded-lg', value: '8px', example: 'rounded-lg' },
		{ token: 'rounded-xl', value: '12px', example: 'rounded-xl' },
		{ token: 'rounded-2xl', value: '16px', example: 'rounded-2xl' },
		{ token: 'rounded-full', value: '9999px', example: 'rounded-full' }
	];

	// ─── Ring / focus scale ──────────────────────────────────────────────────────
	const ringScale = [
		{
			token: 'ring-1',
			desc: 'Subtle border-like outline',
			ringClass: 'ring-1 ring-ecsess-400/40'
		},
		{
			token: 'ring-2',
			desc: 'Focus / hover state outline',
			ringClass: 'ring-2 ring-ecsess-400'
		},
		{
			token: 'ring-offset-2',
			desc: 'Focus ring with offset',
			ringClass: 'ring-2 ring-ecsess-400 ring-offset-2 ring-offset-ecsess-900'
		}
	];
</script>

<SeoMetaTags
	title="Branding — ECSESS"
	description="ECSESS design system: colour palette, typography, spacing, and component patterns."
/>

<!-- ── Hero ─────────────────────────────────────────────────────────────────── -->
<Section from="from-ecsess-black" to="to-ecsess-950" via="via-ecsess-900" contentStart={true}>
	<div class="w-full max-w-5xl pt-8 text-left">
		<p class="text-ecsess-500 mb-3 text-xs font-bold tracking-[0.25em] uppercase">
			Design System
		</p>
		<h1 class="page-title text-ecsess-50 py-0 text-balance">ECSESS Branding</h1>
		<p class="text-ecsess-200/80 mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
			This page documents the visual language of the ECSESS website — colours, typography,
			spacing, border-radius, rings, and UI patterns — so contributors can build with
			consistency.
		</p>
	</div>
</Section>

<!-- ── Colour Palette ────────────────────────────────────────────────────────── -->
<Section from="from-ecsess-950" to="to-ecsess-900" via="via-ecsess-900" contentStart={true}>
	<div class="w-full max-w-5xl py-4 text-left">
		<p class="text-ecsess-500 mb-1 text-xs font-bold tracking-[0.25em] uppercase">01</p>
		<h2 class="text-ecsess-50 py-0 text-3xl font-bold md:text-4xl">Colour Palette</h2>
		<p class="text-ecsess-300 mt-2 mb-10 text-sm leading-relaxed">
			All colours live under the <code
				class="bg-ecsess-800 text-ecsess-200 rounded px-1.5 py-0.5 font-mono text-xs"
				>--color-ecsess-*</code
			> CSS custom-property namespace. Click any swatch to copy the hex value.
		</p>

		<div class="space-y-12">
			{#each palette as group}
				<div>
					<div class="mb-4">
						<h3 class="text-ecsess-100 py-0 text-base font-bold uppercase tracking-widest">
							{group.group}
						</h3>
						<p class="text-ecsess-400 mt-0.5 text-xs">{group.subtitle}</p>
					</div>

					<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
						{#each group.swatches as swatch}
							{@const key = swatch.name + '-hex'}
							<button
								type="button"
								class="group relative overflow-hidden rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ecsess-400 focus:ring-offset-2 focus:ring-offset-ecsess-900
									{swatch.dark ? 'border-ecsess-700/40' : 'border-ecsess-300/30'}"
								onclick={() => copyText(swatch.hex, key)}
								aria-label="Copy {swatch.hex}"
							>
								<!-- colour chip -->
								<div class="{swatch.tw} h-20 w-full"></div>

								<!-- label -->
								<div
									class="flex items-center justify-between px-3 py-2 {swatch.dark
										? 'bg-ecsess-800 text-ecsess-200'
										: 'bg-ecsess-50 text-ecsess-800'}"
								>
									<div class="text-left">
										<p class="font-mono text-xs font-semibold">{swatch.hex}</p>
										<p class="mt-0.5 text-[10px] opacity-70">{swatch.name}</p>
									</div>
									<span class="ml-2 opacity-0 transition-opacity group-hover:opacity-100">
										{#if copiedKey === key}
											<Check class="size-3.5 text-ecsess-400" />
										{:else}
											<Copy class="size-3.5" />
										{/if}
									</span>
								</div>
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- ── Typography ────────────────────────────────────────────────────────────── -->
<Section from="from-ecsess-900" to="to-ecsess-800" via="via-ecsess-850" contentStart={true}>
	<div class="w-full max-w-5xl py-4 text-left">
		<p class="text-ecsess-500 mb-1 text-xs font-bold tracking-[0.25em] uppercase">02</p>
		<h2 class="text-ecsess-50 py-0 text-3xl font-bold md:text-4xl">Typography</h2>
		<p class="text-ecsess-300 mt-2 mb-10 text-sm leading-relaxed">
			The site uses a single font family:
			<strong class="text-ecsess-100 font-bold">Saira</strong> (weights 100 – 900) with
			<strong class="text-ecsess-100 font-bold">Noto Sans Symbols</strong> as a fallback for
			special characters.
		</p>

		<!-- Font specimen -->
		<div class="bg-ecsess-850 mb-10 rounded-2xl border border-ecsess-700/40 p-6 md:p-8">
			<p class="text-ecsess-500 mb-6 text-xs font-bold tracking-widest uppercase">
				Saira — Alphabet & Numerals
			</p>
			<p class="text-ecsess-100 text-2xl leading-loose font-medium tracking-wide md:text-3xl">
				A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
			</p>
			<p class="text-ecsess-200 mt-2 text-2xl leading-loose tracking-wide md:text-3xl">
				a b c d e f g h i j k l m n o p q r s t u v w x y z
			</p>
			<p class="text-ecsess-300 mt-2 text-2xl leading-loose tracking-wide md:text-3xl">
				0 1 2 3 4 5 6 7 8 9 ! @ # $ % & * ( ) — « »
			</p>
		</div>

		<!-- Heading levels -->
		<h3 class="text-ecsess-100 mb-6 py-0 text-lg font-bold uppercase tracking-widest">
			Heading Scale
		</h3>

		<div class="space-y-6">
			<!-- Page title -->
			<div
				class="bg-ecsess-850 grid rounded-xl border border-ecsess-700/30 p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-6"
			>
				<div>
					<p class="text-ecsess-50 page-title py-0 text-balance leading-tight">
						Page Title
					</p>
					<p class="text-ecsess-200 mt-1 text-sm">
						<code class="font-mono">.page-title</code> — 3xl / 4xl / 6xl &bull; font-bold
					</p>
				</div>
				<div class="hidden text-right text-xs md:block">
					<p class="text-ecsess-400 font-mono">my-6 text-3xl font-bold</p>
					<p class="text-ecsess-400 font-mono">md:text-4xl lg:text-6xl</p>
				</div>
			</div>

			<!-- h1 -->
			<div
				class="bg-ecsess-850 grid rounded-xl border border-ecsess-700/30 p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-6"
			>
				<div>
					<h1 class="text-ecsess-50 py-0">Heading 1</h1>
					<p class="text-ecsess-200 mt-1 text-sm">
						<code class="font-mono">h1</code> — 2xl / 3xl &bull; font-bold
					</p>
				</div>
				<div class="hidden text-right text-xs md:block">
					<p class="text-ecsess-400 font-mono">py-4 text-2xl font-bold</p>
					<p class="text-ecsess-400 font-mono">md:text-3xl</p>
				</div>
			</div>

			<!-- h2 -->
			<div
				class="bg-ecsess-850 grid rounded-xl border border-ecsess-700/30 p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-6"
			>
				<div>
					<h2 class="text-ecsess-50 py-0">Heading 2</h2>
					<p class="text-ecsess-200 mt-1 text-sm">
						<code class="font-mono">h2</code> — xl / 2xl &bull; font-bold
					</p>
				</div>
				<div class="hidden text-right text-xs md:block">
					<p class="text-ecsess-400 font-mono">py-1.5 text-xl font-bold</p>
					<p class="text-ecsess-400 font-mono">md:text-2xl</p>
				</div>
			</div>

			<!-- h3 inside .typography -->
			<div
				class="bg-ecsess-850 grid rounded-xl border border-ecsess-700/30 p-5 md:grid-cols-[1fr_auto] md:items-center md:gap-6"
			>
				<div class="typography">
					<h3 class="text-ecsess-50">Heading 3 (in .typography)</h3>
					<p class="text-ecsess-200 mt-1 text-sm" style="margin-top: 0.25rem;">
						<code class="font-mono">.typography h3</code> — xl &bull; font-bold &bull;
						leading-relaxed
					</p>
				</div>
				<div class="hidden text-right text-xs md:block">
					<p class="text-ecsess-400 font-mono">mt-4 mb-1 text-xl</p>
					<p class="text-ecsess-400 font-mono">leading-relaxed font-bold</p>
				</div>
			</div>
		</div>

		<!-- Weight scale -->
		<h3 class="text-ecsess-100 mt-12 mb-6 py-0 text-lg font-bold uppercase tracking-widest">
			Font Weights
		</h3>
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
			{#each [
				{ label: 'Thin', cls: 'font-thin', weight: '100' },
				{ label: 'Light', cls: 'font-light', weight: '300' },
				{ label: 'Medium', cls: 'font-medium', weight: '500' },
				{ label: 'Semibold', cls: 'font-semibold', weight: '600' },
				{ label: 'Bold', cls: 'font-bold', weight: '700' },
				{ label: 'Extrabold', cls: 'font-extrabold', weight: '800' },
				{ label: 'Black', cls: 'font-black', weight: '900' }
			] as w}
				<div
					class="bg-ecsess-850 flex flex-col items-start gap-1 rounded-xl border border-ecsess-700/30 p-4"
				>
					<p class="text-ecsess-50 text-lg {w.cls}">{w.label}</p>
					<p class="text-ecsess-500 font-mono text-xs">
						{w.cls} ({w.weight})
					</p>
				</div>
			{/each}
		</div>

		<!-- Text size scale -->
		<h3 class="text-ecsess-100 mt-12 mb-6 py-0 text-lg font-bold uppercase tracking-widest">
			Text Size Scale
		</h3>
		<div class="space-y-3">
			{#each [
				{ label: 'text-xs', size: '12px / 0.75rem', sample: 'The quick brown fox' },
				{ label: 'text-sm', size: '14px / 0.875rem', sample: 'The quick brown fox' },
				{ label: 'text-base', size: '16px / 1rem', sample: 'The quick brown fox' },
				{ label: 'text-lg', size: '18px / 1.125rem', sample: 'The quick brown fox' },
				{ label: 'text-xl', size: '20px / 1.25rem', sample: 'The quick brown fox' },
				{ label: 'text-2xl', size: '24px / 1.5rem', sample: 'The quick brown fox' },
				{ label: 'text-3xl', size: '30px / 1.875rem', sample: 'The quick brown fox' },
				{ label: 'text-4xl', size: '36px / 2.25rem', sample: 'ECSESS' },
				{ label: 'text-6xl', size: '60px / 3.75rem', sample: 'ECSESS' }
			] as s}
				<div
					class="bg-ecsess-850 flex flex-wrap items-baseline gap-4 rounded-xl border border-ecsess-700/30 px-5 py-3"
				>
					<p class="text-ecsess-50 {s.label} font-medium leading-none">{s.sample}</p>
					<p class="text-ecsess-500 ml-auto font-mono text-xs whitespace-nowrap">
						{s.label} — {s.size}
					</p>
				</div>
			{/each}
		</div>

		<!-- Tracking & leading -->
		<h3 class="text-ecsess-100 mt-12 mb-6 py-0 text-lg font-bold uppercase tracking-widest">
			Letter Spacing & Line Height
		</h3>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each [
				{
					label: 'tracking-tight',
					desc: 'Compact headings',
					sample: 'McGill University ECSESS',
					cls: 'tracking-tight'
				},
				{
					label: 'tracking-normal',
					desc: 'Default body text',
					sample: 'McGill University ECSESS',
					cls: 'tracking-normal'
				},
				{
					label: 'tracking-wide',
					desc: 'Subtle spread',
					sample: 'McGill University ECSESS',
					cls: 'tracking-wide'
				},
				{
					label: 'tracking-widest',
					desc: 'Label & eyebrow text',
					sample: 'ECSESS DESIGN SYSTEM',
					cls: 'tracking-widest'
				}
			] as t}
				<div
					class="bg-ecsess-850 rounded-xl border border-ecsess-700/30 p-5"
				>
					<p class="text-ecsess-50 text-base {t.cls}">{t.sample}</p>
					<p class="text-ecsess-500 mt-2 font-mono text-xs">
						{t.label} — {t.desc}
					</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- ── Spacing ────────────────────────────────────────────────────────────────── -->
<Section from="from-ecsess-800" to="to-ecsess-750" via="via-ecsess-780" contentStart={true}>
	<div class="w-full max-w-5xl py-4 text-left">
		<p class="text-ecsess-500 mb-1 text-xs font-bold tracking-[0.25em] uppercase">03</p>
		<h2 class="text-ecsess-50 py-0 text-3xl font-bold md:text-4xl">Spacing</h2>
		<p class="text-ecsess-300 mt-2 mb-10 text-sm leading-relaxed">
			The Tailwind spacing scale is used throughout. Gaps and paddings are always expressed as
			Tailwind utility classes — never arbitrary values.
		</p>

		<div class="space-y-3">
			{#each spacingScale as step}
				<div
					class="bg-ecsess-850 flex items-center gap-4 rounded-xl border border-ecsess-700/30 px-5 py-3"
				>
					<div
						class="bg-ecsess-500/30 border-ecsess-400/40 shrink-0 rounded border"
						style="width: {step.px}; height: {step.px}; min-width: {step.px};"
					></div>
					<div class="flex flex-1 flex-wrap items-center justify-between gap-2">
						<p class="text-ecsess-100 font-mono text-sm font-semibold">{step.token}</p>
						<p class="text-ecsess-400 font-mono text-xs">
							{step.rem} / {step.px}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Margin / Padding patterns -->
		<h3 class="text-ecsess-100 mt-12 mb-6 py-0 text-lg font-bold uppercase tracking-widest">
			Common Margin & Padding Patterns
		</h3>
		<div class="grid gap-4 sm:grid-cols-2">
			{#each [
				{
					pattern: 'mx-auto',
					desc: 'Centre block horizontally — used on every section container'
				},
				{
					pattern: 'p-4',
					desc: 'Base component padding — buttons, cards, nav items'
				},
				{
					pattern: 'px-6 py-3',
					desc: 'Button padding (horizontal 24 px, vertical 12 px)'
				},
				{
					pattern: 'gap-4 / gap-3',
					desc: 'Card grid gutters & nav spacing'
				},
				{
					pattern: 'py-6',
					desc: 'Section inner vertical breathing room'
				},
				{
					pattern: 'max-w-5xl / max-w-7xl',
					desc: 'Content width constraint on wide screens'
				}
			] as p}
				<div
					class="bg-ecsess-850 rounded-xl border border-ecsess-700/30 p-4"
				>
					<p class="text-ecsess-50 font-mono text-sm font-semibold">{p.pattern}</p>
					<p class="text-ecsess-400 mt-1 text-xs">{p.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- ── Border Radius ──────────────────────────────────────────────────────────── -->
<Section from="from-ecsess-750" to="to-ecsess-700" via="via-ecsess-720" contentStart={true}>
	<div class="w-full max-w-5xl py-4 text-left">
		<p class="text-ecsess-500 mb-1 text-xs font-bold tracking-[0.25em] uppercase">04</p>
		<h2 class="text-ecsess-50 py-0 text-3xl font-bold md:text-4xl">Border Radius</h2>
		<p class="text-ecsess-300 mt-2 mb-10 text-sm leading-relaxed">
			Rounded corners are used consistently across components — from tiny badges to large section
			cards.
		</p>

		<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
			{#each radiusScale as r}
				<div class="flex flex-col items-center gap-3 text-center">
					<div
						class="bg-ecsess-500/25 border-ecsess-400/40 size-16 border-2 {r.example}"
					></div>
					<div>
						<p class="text-ecsess-100 font-mono text-xs font-semibold">{r.token}</p>
						<p class="text-ecsess-400 mt-0.5 font-mono text-[10px]">{r.value}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- ── Rings & Focus States ───────────────────────────────────────────────────── -->
<Section from="from-ecsess-700" to="to-ecsess-650" via="via-ecsess-680" contentStart={true}>
	<div class="w-full max-w-5xl py-4 text-left">
		<p class="text-ecsess-500 mb-1 text-xs font-bold tracking-[0.25em] uppercase">05</p>
		<h2 class="text-ecsess-50 py-0 text-3xl font-bold md:text-4xl">Rings & Focus States</h2>
		<p class="text-ecsess-300 mt-2 mb-10 text-sm leading-relaxed">
			Rings replace traditional borders for interactive elements. They layer cleanly over any
			background without shifting layout.
		</p>

		<div class="flex flex-wrap gap-8">
			{#each ringScale as r}
				<div class="flex flex-col items-center gap-4 text-center">
					<div
						class="bg-ecsess-800 size-16 rounded-xl transition-all {r.ringClass}"
					></div>
					<div>
						<p class="text-ecsess-100 font-mono text-xs font-semibold">{r.token}</p>
						<p class="text-ecsess-400 mt-0.5 text-xs">{r.desc}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Animated ring demo -->
		<div class="mt-10">
			<h3 class="text-ecsess-100 mb-4 py-0 text-sm font-bold uppercase tracking-widest">
				Pulse-ring animation (<code class="font-mono normal-case">animate-pulse-ring</code>)
			</h3>
			<p class="text-ecsess-300 mb-6 text-xs leading-relaxed">
				Used on mobile council cards to indicate interactivity — the ring pulses in opacity on a
				1.5 s loop.
			</p>
			<div class="relative inline-flex">
				<div class="bg-ecsess-800 size-16 rounded-xl"></div>
				<div
					class="ring-ecsess-400 ring-offset-ecsess-800 animate-pulse-ring pointer-events-none absolute inset-0 rounded-xl ring-2 ring-offset-2"
					aria-hidden="true"
				></div>
			</div>
		</div>
	</div>
</Section>

<!-- ── UI Component Patterns ─────────────────────────────────────────────────── -->
<Section from="from-ecsess-650" to="to-ecsess-600" via="via-ecsess-630" contentStart={true}>
	<div class="w-full max-w-5xl py-4 text-left">
		<p class="text-ecsess-500 mb-1 text-xs font-bold tracking-[0.25em] uppercase">06</p>
		<h2 class="text-ecsess-50 py-0 text-3xl font-bold md:text-4xl">UI Component Patterns</h2>
		<p class="text-ecsess-200/80 mt-2 mb-10 text-sm leading-relaxed">
			Living examples of recurring UI elements — buttons, badges, cards, nav links, blockquotes,
			and code snippets — rendered exactly as they appear on the site.
		</p>

		<!-- Buttons -->
		<h3 class="text-ecsess-950 mb-4 py-0 text-sm font-bold uppercase tracking-widest">
			Buttons
		</h3>
		<div class="mb-10 flex flex-wrap gap-4">
			<!-- Primary button -->
			<button
				type="button"
				class="bg-ecsess-600 text-ecsess-50 hover:bg-ecsess-700 w-fit rounded-md px-6 py-3 text-sm font-semibold transition-colors hover:cursor-pointer"
			>
				Primary Button
			</button>
			<!-- Disabled button -->
			<button
				type="button"
				disabled
				class="bg-ecsess-600 text-ecsess-50 w-fit cursor-not-allowed rounded-md px-6 py-3 text-sm font-semibold opacity-50"
			>
				Disabled Button
			</button>
			<!-- Nav-style button (active) -->
			<button
				type="button"
				class="hover:text-ecsess-100 hover:border-ecsess-100 text-ecsess-200 border-ecsess-300 mx-0.5 w-fit rounded-none border-b-4 px-6 py-2 font-semibold transition-all"
			>
				Nav (Active)
			</button>
			<!-- Nav-style button (inactive) -->
			<button
				type="button"
				class="hover:text-ecsess-100 hover:border-ecsess-100 text-ecsess-200 border-transparent mx-0.5 w-fit rounded-none border-b-4 px-6 py-2 font-semibold transition-all"
			>
				Nav (Inactive)
			</button>
		</div>

		<!-- Badges / pills -->
		<h3 class="text-ecsess-950 mb-4 py-0 text-sm font-bold uppercase tracking-widest">
			Badges & Pills
		</h3>
		<div class="mb-10 flex flex-wrap gap-3">
			<span
				class="bg-ecsess-400 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-white uppercase"
			>
				Upcoming
			</span>
			<span
				class="bg-ecsess-500/90 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase"
			>
				Technical
			</span>
			<span
				class="bg-ecsess-800/90 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-gray-300 uppercase"
			>
				Past Event
			</span>
			<span
				class="bg-ecsess-600 text-ecsess-50 ring-ecsess-400/60 rounded-md px-2 py-1 text-xs font-semibold tracking-wide uppercase shadow-md ring-1"
			>
				Tag / Role
			</span>
		</div>

		<!-- Cards -->
		<h3 class="text-ecsess-950 mb-4 py-0 text-sm font-bold uppercase tracking-widest">
			Card Variants
		</h3>
		<div class="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Resource card (light) -->
			<div
				class="bg-ecsess-50 border-ecsess-100 relative h-fit rounded-md border px-4 py-2 transition-shadow hover:shadow-md"
			>
				<p class="text-ecsess-900 my-1 pb-1 text-left text-lg font-extrabold">Resource Card</p>
				<p class="text-ecsess-700 text-left text-sm">
					Light background card used in the resources listing.
				</p>
			</div>

			<!-- Council card (dark) -->
			<div
				class="bg-ecsess-800 ring-ecsess-500/50 ring-offset-ecsess-900 hover:ring-ecsess-300 hover:shadow-ecsess-400/50 flex flex-col gap-2 rounded-xl p-4 shadow-md ring-2 ring-offset-2 transition-all"
			>
				<p class="text-ecsess-50 text-base font-bold">Council Card</p>
				<p class="text-ecsess-200 text-sm italic">Vice-President, Technology</p>
				<button
					type="button"
					class="bg-ecsess-500 text-ecsess-950 hover:bg-ecsess-400 hover:text-ecsess-50 mt-1 rounded-lg px-3 py-2 text-xs font-semibold transition"
				>
					View profile
				</button>
			</div>

			<!-- Dev card (dark, active) -->
			<div
				class="bg-ecsess-800 hover:shadow-ecsess-black/50 relative w-full overflow-hidden rounded-xl shadow-sm transition-all duration-100 ease-linear hover:scale-101 hover:shadow-md"
			>
				<div class="px-5 pt-5 pb-3 text-center">
					<div
						class="bg-ecsess-700 mx-auto mb-3 flex size-14 items-center justify-center rounded-full"
					>
						<span class="text-ecsess-150 text-xl font-bold">VP</span>
					</div>
					<p class="text-ecsess-100 text-base font-semibold">Dev Card</p>
					<p class="text-ecsess-400 text-sm">VP Tech Dev</p>
				</div>
				<div class="px-5 pb-5 text-center">
					<span
						class="bg-ecsess-900 text-ecsess-300 rounded-full px-4 py-1.5 text-sm font-medium"
					>
						U3
					</span>
					<p class="text-ecsess-300 mt-3 text-xs italic leading-relaxed">
						&ldquo;Building the site one PR at a time.&rdquo;
					</p>
				</div>
			</div>
		</div>

		<!-- Blockquote -->
		<h3 class="text-ecsess-950 mb-4 py-0 text-sm font-bold uppercase tracking-widest">
			Blockquote
		</h3>
		<div class="typography mb-10 max-w-xl">
			<blockquote>
				&ldquo;Empowering every ECSE student at McGill — academically, technically, socially, and
				professionally.&rdquo;
			</blockquote>
		</div>

		<!-- Code / Inline tokens -->
		<h3 class="text-ecsess-950 mb-4 py-0 text-sm font-bold uppercase tracking-widest">
			Code & Keyboard Tokens
		</h3>
		<div class="mb-10 flex flex-wrap items-center gap-3">
			<code class="bg-ecsess-800 text-ecsess-200 rounded-md px-1.5 py-0.5 font-mono text-sm">
				--color-ecsess-600
			</code>
			<code class="bg-ecsess-800 text-ecsess-200 rounded-md px-1.5 py-0.5 font-mono text-sm">
				.typography
			</code>
			<kbd class="bg-ecsess-800 text-ecsess-200 rounded-md px-2 py-1 font-mono text-xs shadow-sm">
				⌘ K
			</kbd>
		</div>

		<!-- Gradient sections -->
		<h3 class="text-ecsess-950 mb-4 py-0 text-sm font-bold uppercase tracking-widest">
			Section Gradient Patterns
		</h3>
		<p class="text-ecsess-900 mb-6 text-xs">
			Each page section uses a directional gradient constructed with three Tailwind classes passed
			as props to the
			<code class="font-mono">{'<Section>'}</code> component.
		</p>
		<div class="grid gap-3 sm:grid-cols-2">
			{#each [
				{
					label: 'Hero',
					from: 'from-ecsess-black',
					via: 'via-ecsess-950',
					to: 'to-ecsess-900',
					cls: 'bg-gradient-to-b from-[#1f1f1f] via-[#031c15] to-[#062c20]'
				},
				{
					label: 'Office Hours',
					from: 'from-ecsess-900',
					via: 'via-ecsess-650',
					to: 'to-ecsess-700',
					cls: 'bg-gradient-to-b from-[#062c20] via-[#306032] to-[#2f4d29]'
				},
				{
					label: 'Sponsors',
					from: 'from-ecsess-700',
					via: 'via-ecsess-750',
					to: 'to-ecsess-800',
					cls: 'bg-gradient-to-b from-[#2f4d29] via-[#1c4a1e] to-[#0a3d2a]'
				},
				{
					label: 'Footer / Close',
					from: 'from-ecsess-800',
					via: 'via-ecsess-850',
					to: 'to-ecsess-black',
					cls: 'bg-gradient-to-b from-[#0a3d2a] via-[#083525] to-[#1f1f1f]'
				}
			] as sg}
				<div class="overflow-hidden rounded-xl border border-ecsess-700/30">
					<div class="{sg.cls} flex h-16 items-center px-5">
						<p class="text-ecsess-100 text-sm font-semibold">{sg.label}</p>
					</div>
					<div class="bg-ecsess-850 px-4 py-3 font-mono text-xs">
						<p class="text-ecsess-400">{sg.from}</p>
						<p class="text-ecsess-400">{sg.via}</p>
						<p class="text-ecsess-400">{sg.to}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Section>

<!-- ── Animations ────────────────────────────────────────────────────────────── -->
<Section from="from-ecsess-600" to="to-ecsess-black" via="via-ecsess-800" contentStart={true}>
	<div class="w-full max-w-5xl py-4 pb-16 text-left">
		<p class="text-ecsess-500 mb-1 text-xs font-bold tracking-[0.25em] uppercase">07</p>
		<h2 class="text-ecsess-50 py-0 text-3xl font-bold md:text-4xl">Animations</h2>
		<p class="text-ecsess-200/80 mt-2 mb-10 text-sm leading-relaxed">
			Two custom keyframe animations are defined in the theme — hover them to trigger.
		</p>

		<div class="flex flex-wrap gap-8">
			<!-- Wiggle -->
			<div class="flex flex-col items-center gap-4 text-center">
				<div
					class="bg-ecsess-800 ring-ecsess-400/30 group flex size-20 cursor-pointer items-center justify-center rounded-xl ring-2 hover:animate-wiggle"
					aria-label="Wiggle animation demo"
				>
					<span class="text-ecsess-50 text-2xl font-black">E</span>
				</div>
				<div>
					<p class="text-ecsess-100 font-mono text-xs font-semibold">animate-wiggle</p>
					<p class="text-ecsess-400 mt-0.5 text-xs">Hover to trigger</p>
					<p class="text-ecsess-500 mt-0.5 text-[10px]">rotateY ±2.4° / 0.5 s ease-in-out</p>
				</div>
			</div>

			<!-- Pulse ring -->
			<div class="flex flex-col items-center gap-4 text-center">
				<div class="relative">
					<div
						class="bg-ecsess-800 flex size-20 items-center justify-center rounded-xl"
						aria-label="Pulse ring animation demo"
					>
						<span class="text-ecsess-50 text-2xl font-black">E</span>
					</div>
					<div
						class="ring-ecsess-400 ring-offset-ecsess-900 animate-pulse-ring pointer-events-none absolute inset-0 rounded-xl ring-2 ring-offset-2"
						aria-hidden="true"
					></div>
				</div>
				<div>
					<p class="text-ecsess-100 font-mono text-xs font-semibold">animate-pulse-ring</p>
					<p class="text-ecsess-400 mt-0.5 text-xs">Always running</p>
					<p class="text-ecsess-500 mt-0.5 text-[10px]">opacity 0.5 → 1 / 1.5 s infinite</p>
				</div>
			</div>
		</div>
	</div>
</Section>
