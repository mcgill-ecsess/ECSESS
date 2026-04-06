<script lang="ts">
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Button from 'components/Button.svelte';
	import Chip from 'components/Chip.svelte';

	type FontWeightOption = { label: string; value: number };

	const fontWeightOptions: FontWeightOption[] = [
		{ label: 'Medium 500', value: 500 },
		{ label: 'SemiBold 600', value: 600 },
		{ label: 'Bold 700', value: 700 },
		{ label: 'ExtraBold 800', value: 800 }
	];

	const previewPresets = [
		'Electrical, Computer & Software Engineering Students Society',
		'Build. Connect. Grow.',
		'ECSESS Brand System 2026'
	];

	/** Tailwind / CSS variable names — same order as @theme in app.css */
	const colorTokens = [
		{ varName: '--color-primary', tw: 'primary', note: 'Buttons, links, key actions' },
		{
			varName: '--color-primary-content',
			tw: 'primary-content',
			note: 'Text on primary & highlights'
		},
		{
			varName: '--color-primary-background',
			tw: 'primary-background',
			note: 'Deepest chrome (nav, footer)'
		},
		{ varName: '--color-primary-hover', tw: 'primary-hover', note: 'Hover / pressed' },
		{ varName: '--color-primary-soft', tw: 'primary-soft', note: 'Cards & panels' },
		{ varName: '--color-accent', tw: 'accent', note: 'Highlights' },
		{ varName: '--color-accent-content', tw: 'accent-content', note: 'Text on accent' },
		{ varName: '--color-base', tw: 'base', note: 'Default page surface' },
		{ varName: '--color-base-content', tw: 'base-content', note: 'Body text on dark surfaces' },
		{ varName: '--color-muted', tw: 'muted', note: 'Badges, secondary fills' },
		{ varName: '--color-border', tw: 'border', note: 'Hairlines & dividers' },
		{ varName: '--color-ring', tw: 'ring', note: 'Focus-visible rings' }
	] as const;

	const typeScale = [
		{
			tag: 'Display',
			class: 'text-5xl font-extrabold tracking-tight',
			sample: 'ECSESS'
		},
		{ tag: 'H1', class: 'text-4xl font-bold', sample: 'Page title' },
		{ tag: 'H2', class: 'text-3xl font-bold', sample: 'Section title' },
		{ tag: 'H3', class: 'text-xl font-bold', sample: 'Subsection' },
		{
			tag: 'Body',
			class: 'text-lg leading-relaxed',
			sample: 'Body copy for descriptions and longform content.'
		},
		{ tag: 'Small', class: 'text-sm font-medium', sample: 'Captions & metadata' }
	] as const;

	const navLinks = [
		{ href: '#palette', label: 'Color' },
		{ href: '#logos', label: 'Logo' },
		{ href: '#typography', label: 'Typography' },
		{ href: '#components', label: 'Components' },
		{ href: '#tokens', label: 'Tokens' }
	] as const;

	let previewText = $state(previewPresets[0]);
	let previewSize = $state(48);
	let previewWeight = $state(700);
	let sliderDemoValue = $state(58);
</script>

<SeoMetaTags />

<main class="branding-page text-base-content min-h-screen">
	<div class="relative mx-auto max-w-7xl px-4 pt-8 pb-20 md:px-8 md:pt-12">
		<!-- Hero -->
		<header
			class="border-border bg-primary-soft relative overflow-hidden rounded-(--radius-panel) border px-6 py-10 md:px-10 md:py-14"
		>
			<div
				class="from-primary absolute inset-y-0 left-0 w-1.5 bg-linear-to-b to-transparent md:w-2"
				aria-hidden="true"
			></div>
			<p class="text-primary-content text-xs font-bold tracking-[0.2em] uppercase">Design system</p>
			<h1 class="mt-3 max-w-3xl text-5xl font-extrabold tracking-tight">ECSESS brand &amp; UI</h1>
			<p class="text-base-content mt-4 max-w-2xl text-xl leading-relaxed">
				Single source of truth for this site: semantic greens in
				<code class="text-primary-content text-[0.95em]">app.css</code>, Saira for type, and shared
				primitives (Button, Chip). No numbered color ramps—only named tokens.
			</p>

			<nav
				class="border-border bg-primary-background mt-8 flex flex-wrap gap-2 rounded-(--radius-control) border p-2 md:gap-3"
				aria-label="On this page"
			>
				{#each navLinks as item}
					<a
						href={item.href}
						class="text-primary-content hover:bg-primary-hover rounded-(--radius-control) px-3 py-2 text-lg font-semibold transition-colors"
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</header>

		<!-- Color -->
		<section id="palette" class="scroll-mt-28 pt-16 md:pt-20">
			<div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
				<div>
					<h2 class="text-4xl font-extrabold tracking-tight">Color palette</h2>
					<p class="text-primary-content mt-2 max-w-2xl leading-relaxed">
						All tokens are opaque hex values in <code class="text-base-content">@theme</code>. Pair
						foreground to background using the rules in
						<code class="text-base-content">app.css</code> (e.g.
						<code class="text-base-content">text-base-content</code>
						on <code class="text-base-content">bg-base</code>).
					</p>
				</div>
			</div>

			<div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each colorTokens as c}
					<article
						class="border-border bg-base flex flex-col overflow-hidden rounded-(--radius-panel) border"
					>
						<div
							class="border-border h-24 w-full shrink-0 border-b"
							style={`background: var(${c.varName})`}
						></div>
						<div class="flex flex-1 flex-col gap-1 p-4">
							<p class="text-primary-content font-mono text-[11px] leading-tight">{c.varName}</p>
							<p class="text-xs leading-snug">{c.note}</p>
							<p class="text-primary-content mt-auto pt-2 font-mono text-[10px]">
								bg-{c.tw} · text-{c.tw}
							</p>
						</div>
					</article>
				{/each}
			</div>

			<div
				class="border-border bg-primary-background mt-8 rounded-(--radius-panel) border p-5 md:p-6"
			>
				<h3 class="text-primary-content text-sm font-bold tracking-wider uppercase">Quick pairs</h3>
				<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					<div
						class="bg-primary text-primary-content rounded-(--radius-control) px-4 py-3 text-sm font-semibold"
					>
						primary / primary-content
					</div>
					<div
						class="bg-accent text-accent-content rounded-(--radius-control) px-4 py-3 text-sm font-semibold"
					>
						accent / accent-content
					</div>
					<div
						class="bg-base text-base-content rounded-(--radius-control) px-4 py-3 text-sm font-semibold"
					>
						base / base-content
					</div>
					<div
						class="bg-muted text-accent-content rounded-(--radius-control) px-4 py-3 text-sm font-semibold"
					>
						muted / accent-content
					</div>
				</div>
			</div>
		</section>

		<!-- Logos -->
		<section id="logos" class="scroll-mt-28 pt-16 md:pt-20">
			<h2 class="text-4xl font-extrabold tracking-tight">Logo marks</h2>
			<p class="text-primary-content mt-2 max-w-2xl">
				Placeholder lockups for documentation. Use the official ECSESS assets in production.
			</p>

			<div class="mt-8 grid gap-4 lg:grid-cols-3">
				<article
					class="border-border bg-base flex gap-4 rounded-(--radius-panel) border p-5 md:p-6"
				>
					<div class="logo-mark shrink-0">E</div>
					<div class="min-w-0">
						<p class="text-primary-content text-xs font-bold tracking-wider uppercase">Primary</p>
						<p class="mt-1 text-xl font-extrabold">ECSESS</p>
						<p class="text-primary-content mt-2 text-sm">Default full mark + word context.</p>
					</div>
				</article>
				<article
					class="border-border bg-base flex gap-4 rounded-(--radius-panel) border p-5 md:p-6"
				>
					<div class="logo-mark compact shrink-0">ECS</div>
					<div class="min-w-0">
						<p class="text-primary-content text-xs font-bold tracking-wider uppercase">Compact</p>
						<p class="mt-1 text-xl font-extrabold">ECSESS Council</p>
						<p class="text-primary-content mt-2 text-sm">Tight spaces, nav, or small UI.</p>
					</div>
				</article>
				<article
					class="border-border bg-base flex gap-4 rounded-(--radius-panel) border p-5 md:p-6"
				>
					<div class="logo-mark mono shrink-0">E</div>
					<div class="min-w-0">
						<p class="text-primary-content text-xs font-bold tracking-wider uppercase">
							Monochrome
						</p>
						<p class="mt-1 text-xl font-extrabold">Single-ink</p>
						<p class="text-primary-content mt-2 text-sm">Print / one-color constraints.</p>
					</div>
				</article>
			</div>
		</section>

		<!-- Typography -->
		<section id="typography" class="scroll-mt-28 pt-16 md:pt-20">
			<h2 class="text-4xl font-extrabold tracking-tight">Typography</h2>
			<p class="text-primary-content mt-2 max-w-2xl">
				<strong>Saira</strong> for UI and headings; <strong>Noto Sans Symbols</strong> as fallback. Weights
				500–800 are used across the site.
			</p>

			<div
				class="border-border bg-base divide-border mt-8 divide-y rounded-(--radius-panel) border px-2 py-2 md:px-4"
			>
				{#each typeScale as row}
					<div class="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-8 md:py-5">
						<span class="text-primary-content w-24 shrink-0 font-mono text-xs uppercase"
							>{row.tag}</span
						>
						<p class="text-base-content flex-1 {row.class}">{row.sample}</p>
					</div>
				{/each}
			</div>

			<div class="mt-8 grid gap-6 lg:grid-cols-3">
				<div class="border-border bg-base rounded-(--radius-panel) border p-5 md:p-6 lg:col-span-2">
					<label class="control-label text-primary-content" for="previewText">Live preview</label>
					<input
						id="previewText"
						type="text"
						class="border-border bg-primary-background text-primary-content mt-2 w-full rounded-(--radius-control) border px-3 py-2.5"
						bind:value={previewText}
						placeholder="Type a headline or tagline"
					/>
					<div class="mt-3 flex flex-wrap gap-2">
						{#each previewPresets as preset}
							<Chip onclick={() => (previewText = preset)}>{preset}</Chip>
						{/each}
					</div>
					<div class="mt-3 grid gap-2">
						<label class="grid gap-1">
							<span class="control-label text-primary-content">Size ({previewSize}px)</span>
							<input
								class="interactive-slider w-full"
								type="range"
								min="22"
								max="72"
								step="1"
								bind:value={previewSize}
							/>
						</label>
						<label class="grid gap-1">
							<span class="control-label text-primary-content">Weight</span>
							<select
								bind:value={previewWeight}
								class="border-border bg-primary-background text-primary-content rounded-(--radius-control) border px-3 py-2"
							>
								{#each fontWeightOptions as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
						</label>
					</div>
				</div>
				<div
					class="border-border bg-primary-background flex min-h-[220px] flex-col rounded-(--radius-panel) border p-5 md:p-6"
				>
					<p class="text-primary-content text-xs font-bold tracking-wider uppercase">Output</p>
					<p
						class="text-primary-content mt-3 flex-1 leading-tight wrap-break-word"
						style={`font-size:${previewSize}px; font-weight:${previewWeight}; letter-spacing:0.02em;`}
					>
						{previewText}
					</p>
				</div>
			</div>
		</section>

		<!-- Components -->
		<section id="components" class="scroll-mt-28 pt-16 md:pt-20">
			<h2 class="text-4xl font-extrabold tracking-tight">Components</h2>
			<p class="text-primary-content mt-2 max-w-2xl">
				Primitives used across routes. Variants follow the same tokens as the rest of the system.
			</p>

			<div class="mt-8 grid gap-6 lg:grid-cols-2">
				<div class="border-border bg-base rounded-(--radius-panel) border p-5 md:p-6">
					<h3 class="text-primary-content text-sm font-bold tracking-wider uppercase">Buttons</h3>
					<div class="mt-4 flex flex-wrap gap-2">
						<Button variant="primary" size="md">Primary</Button>
						<Button variant="secondary" size="md">Secondary</Button>
						<Button variant="outline" size="md">Outline</Button>
						<Button variant="ghost" size="md">Ghost</Button>
					</div>
				</div>
				<div class="border-border bg-base rounded-(--radius-panel) border p-5 md:p-6">
					<h3 class="text-primary-content text-sm font-bold tracking-wider uppercase">Chips</h3>
					<div class="mt-4 flex flex-wrap gap-2">
						<Chip>Announcements</Chip>
						<Chip variant="accent">Workshops</Chip>
						<Chip variant="muted">Resources</Chip>
					</div>
				</div>
				<div class="border-border bg-base rounded-(--radius-panel) border p-5 md:p-6 lg:col-span-2">
					<h3 class="text-primary-content text-sm font-bold tracking-wider uppercase">
						Example card
					</h3>
					<div
						class="border-border bg-primary-background mt-4 max-w-lg rounded-(--radius-panel) border p-5"
					>
						<p class="text-base-content text-xs font-bold tracking-wider uppercase">Featured</p>
						<h4 class="mt-2 text-lg font-bold">Mentorship office hours</h4>
						<p class="text-primary-content mt-2 text-sm leading-relaxed">
							Weekly drop-in sessions for coursework and career questions.
						</p>
					</div>
				</div>
				<div class="border-border bg-base rounded-(--radius-panel) border p-5 md:p-6 lg:col-span-2">
					<h3 class="text-primary-content text-sm font-bold tracking-wider uppercase">
						Range (forms)
					</h3>
					<label class="mt-3 grid max-w-md gap-1">
						<span class="control-label text-primary-content">Demo value ({sliderDemoValue})</span>
						<input
							class="interactive-slider w-full"
							type="range"
							min="0"
							max="100"
							step="1"
							bind:value={sliderDemoValue}
						/>
					</label>
					<div
						class="border-primary-hover bg-primary-hover mt-4 h-2.5 max-w-md overflow-hidden rounded-full border"
					>
						<div
							class="bg-accent h-full transition-[width] duration-150 ease-out"
							style={`width:${sliderDemoValue}%`}
						></div>
					</div>
				</div>
			</div>
		</section>

		<!-- Tokens -->
		<section id="tokens" class="scroll-mt-28 pt-16 md:pt-20">
			<h2 class="text-4xl font-extrabold tracking-tight">Layout &amp; motion</h2>
			<p class="text-primary-content mt-2 max-w-2xl">
				Radius and focus tokens are defined in <code class="text-base-content">@theme</code>. Motion
				respects <code class="text-base-content">prefers-reduced-motion</code> globally.
			</p>

			<div class="mt-8 grid gap-4 md:grid-cols-2">
				<div class="border-border bg-base rounded-(--radius-panel) border p-5">
					<h3 class="text-primary-content text-sm font-bold tracking-wider uppercase">Radius</h3>
					<ul
						class="token-list text-base-content mt-3 list-none space-y-2 ps-0 text-sm leading-relaxed"
					>
						<li>
							<code class="text-primary-content">rounded-control</code> — 8px, controls &amp; inputs
						</li>
						<li>
							<code class="text-primary-content">rounded-panel</code> — 12px, cards &amp; panels
						</li>
					</ul>
				</div>
				<div class="border-border bg-base rounded-(--radius-panel) border p-5">
					<h3 class="text-primary-content text-sm font-bold tracking-wider uppercase">Focus</h3>
					<p class="text-base-content mt-3 text-sm leading-relaxed">
						Use <code class="text-primary-content">ring-ring</code> or
						<code class="text-primary-content">ring-muted</code> with
						<code class="text-primary-content">ring-offset-base</code> or
						<code class="text-primary-content">ring-offset-primary-background</code> on dark bars.
					</p>
				</div>
			</div>
		</section>

		<footer class="border-border mt-20 border-t pt-10 text-center">
			<p class="text-primary-content text-sm">
				Source of truth: <code class="text-base-content">src/app.css</code> ·
				<code class="text-base-content">@theme</code> tokens
			</p>
		</footer>
	</div>
</main>

<style>
	.branding-page {
		position: relative;
		background-color: var(--color-primary-background);
	}

	.logo-mark {
		height: 3.25rem;
		width: 3.25rem;
		border-radius: var(--radius-panel);
		display: grid;
		place-items: center;
		font-weight: 800;
		letter-spacing: 0.06em;
		background: linear-gradient(145deg, var(--color-muted), var(--color-primary));
		color: var(--color-accent-content);
	}

	.logo-mark.compact {
		width: 4.1rem;
		font-size: 0.88rem;
	}

	.logo-mark.mono {
		background: linear-gradient(145deg, #d9f7c5, var(--color-base-content));
		color: var(--color-primary-background);
	}

	.control-label {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.interactive-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 9px;
		border-radius: 999px;
		background: linear-gradient(90deg, var(--color-primary-hover), var(--color-primary));
		border: 1px solid var(--color-muted);
	}

	.interactive-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 999px;
		background: var(--color-primary-content);
		border: 2px solid var(--color-primary-soft);
		box-shadow: 0 0 0 2px var(--color-primary-background);
		cursor: pointer;
	}

	.interactive-slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 999px;
		background: var(--color-primary-content);
		border: 2px solid var(--color-primary-soft);
		box-shadow: 0 0 0 2px var(--color-primary-background);
		cursor: pointer;
	}
</style>
