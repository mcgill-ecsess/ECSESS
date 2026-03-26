<script lang="ts">
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Button from 'components/Button.svelte';

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

	let previewText = $state(previewPresets[0]);
	let previewSize = $state(48);
	let previewWeight = $state(700);
	let sliderDemoValue = $state(58);
</script>

<SeoMetaTags />

<main class="branding-page text-ecsess-100">
	<div class="content-wrap mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 py-10 md:px-8 md:py-12">
		<header class="section-block">
			<p class="text-ecsess-300 text-xs tracking-[0.22em] uppercase">Brand Guidelines</p>
			<h1 class="mt-2 text-3xl leading-tight font-extrabold md:text-5xl">ECSESS Branding Kit</h1>
			<p class="text-ecsess-200 mt-4 max-w-4xl text-base leading-7 md:text-lg">
				Core visual standards for ECSESS.
			</p>
		</header>

		<section class="section-block">
			<h2 class="text-2xl font-bold md:text-3xl">Logo System</h2>
			<p class="text-ecsess-200 mt-2 leading-7">Primary, compact, and monochrome usage.</p>

			<div class="mt-6 grid gap-4 lg:grid-cols-3">
				<article class="logo-row">
					<div class="logo-mark">E</div>
					<div>
						<p class="text-ecsess-50 text-xs tracking-[0.18em] uppercase">Primary Lockup</p>
						<p class="text-xl leading-tight font-extrabold">ECSESS</p>
						<p class="text-ecsess-250 mt-1 text-sm">Default.</p>
					</div>
				</article>

				<article class="logo-row">
					<div class="logo-mark compact">ECS</div>
					<div>
						<p class="text-ecsess-50 text-xs tracking-[0.18em] uppercase">Secondary Mark</p>
						<p class="text-xl leading-tight font-extrabold">ECSESS Council</p>
						<p class="text-ecsess-250 mt-1 text-sm">Compact use.</p>
					</div>
				</article>

				<article class="logo-row">
					<div class="logo-mark mono">E</div>
					<div>
						<p class="text-ecsess-50 text-xs tracking-[0.18em] uppercase">Monochrome Mark</p>
						<p class="text-xl leading-tight font-extrabold">Single Ink Variant</p>
						<p class="text-ecsess-250 mt-1 text-sm">Single-color use.</p>
					</div>
				</article>
			</div>
		</section>

		<section class="section-block">
			<h2 class="text-2xl font-bold md:text-3xl">Reformed Color System</h2>
			<p class="text-ecsess-200 mt-2 leading-7">Primary, secondary, and accent roles.</p>

			<div class="mt-6 grid gap-5 xl:grid-cols-3">
				<article class="flat-block">
					<p class="token-title">Primary</p>
					<div class="mt-3 grid gap-2">
						<div class="swatch bg-primary text-primary-content">`bg-primary` + `text-primary-content`</div>
						<div class="swatch bg-primary-soft text-primary-content">
							`bg-primary-soft` + `text-primary-content`
						</div>
					</div>
				</article>

				<article class="flat-block">
					<p class="token-title">Secondary</p>
					<div class="mt-3 grid gap-2">
						<div class="swatch bg-secondary text-secondary-content">
							`bg-secondary` + `text-secondary-content`
						</div>
						<div class="swatch bg-secondary-soft text-secondary-content">
							`bg-secondary-soft` + `text-secondary-content`
						</div>
					</div>
				</article>

				<article class="flat-block">
					<p class="token-title">Accent</p>
					<div class="mt-3 grid gap-2">
						<div class="swatch bg-accent text-accent-content">`bg-accent` + `text-accent-content`</div>
						<div class="swatch bg-accent-soft text-accent-content">
							`bg-accent-soft` + `text-accent-content`
						</div>
					</div>
				</article>
			</div>
		</section>

		<section class="section-block">
			<h2 class="text-2xl font-bold md:text-3xl">Standardized Layout Tokens</h2>
			<p class="text-ecsess-200 mt-2 leading-7">Spacing and radius defaults.</p>

			<div class="mt-6 grid gap-4 md:grid-cols-2">
				<article class="flat-block">
					<p class="token-title">Padding Scale</p>
					<ul class="token-list">
						<li><code>space-sm</code>: 8px - compact controls and tags</li>
						<li><code>space-md</code>: 16px - default component padding</li>
						<li><code>space-lg</code>: 24px - section-level content spacing</li>
					</ul>
				</article>

				<article class="flat-block">
					<p class="token-title">Corner Radius Scale</p>
					<ul class="token-list">
						<li><code>radius-sm</code>: 8px - all interactive controls</li>
						<li><code>radius-lg</code>: 16px - cards, panels, and visual containers</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="section-block">
			<h2 class="text-2xl font-bold md:text-3xl">Typography and Text Preview</h2>
			<p class="text-ecsess-200 mt-2 leading-7">
				Font: <strong>Saira</strong> with <strong>Noto Sans Symbols</strong> fallback.
			</p>

			<div class="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
				<div class="flat-block">
					<label class="control-label" for="previewText">Preview Text</label>
					<input
						id="previewText"
						type="text"
						class="control-input"
						bind:value={previewText}
						placeholder="Type any tagline or heading"
					/>

					<div class="mt-3 flex flex-wrap gap-2">
						{#each previewPresets as preset}
							<button class="chip" type="button" onclick={() => (previewText = preset)}>{preset}</button>
						{/each}
					</div>

					<div class="mt-4 grid gap-3">
						<label class="control-stack">
							<span class="control-label">Font Size ({previewSize}px)</span>
							<input
								class="interactive-slider"
								type="range"
								min="22"
								max="72"
								step="1"
								bind:value={previewSize}
							/>
						</label>
					</div>

					<label class="control-stack mt-3">
						<span class="control-label">Weight</span>
						<select bind:value={previewWeight} class="control-input">
							{#each fontWeightOptions as opt}
								<option value={opt.value}>{opt.label}</option>
							{/each}
						</select>
					</label>
				</div>

				<div class="preview-area">
					<p class="text-ecsess-250 text-xs tracking-[0.2em] uppercase">Interactive Preview</p>
					<p
						class="text-ecsess-50 mt-3 wrap-break-word leading-tight"
						style={`font-size:${previewSize}px; font-weight:${previewWeight}; letter-spacing:0.02em;`}
					>
						{previewText}
					</p>
				</div>
			</div>
		</section>

		<section class="section-block">
			<h2 class="text-2xl font-bold md:text-3xl">Component Language</h2>
			<p class="text-ecsess-200 mt-2 leading-7">Core component examples.</p>

			<div class="mt-6 grid gap-4 xl:grid-cols-3">
				<article class="flat-block">
					<p class="token-title">Buttons</p>
					<div class="mt-3 flex flex-wrap gap-2">
						<Button>Primary Action</Button>
						<button class="secondary-button" type="button">Secondary Action</button>
					</div>
				</article>

				<article class="flat-block">
					<p class="token-title">Tags and Chips</p>
					<div class="mt-3 flex flex-wrap gap-2">
						<span class="chip">Announcements</span>
						<span class="chip">Workshops</span>
						<span class="chip">Resources</span>
						<span class="chip">Council</span>
					</div>
				</article>

				<article class="flat-block">
					<p class="token-title">Content Block</p>
					<div class="content-block mt-3">
						<p class="text-ecsess-100 text-sm tracking-[0.14em] uppercase">Featured Program</p>
						<h3 class="mt-2 text-xl font-bold">Mentorship Office Hours</h3>
						<p class="text-ecsess-250 mt-1 text-sm leading-6">
							Professional guidance and peer support sessions hosted weekly to help students navigate
							courses, projects, and internship preparation.
						</p>
					</div>
				</article>

				<article class="flat-block xl:col-span-3">
					<p class="token-title">Interactive Slider Component</p>
					<div class="slider-demo mt-4">
						<label class="control-stack">
							<span class="control-label">Component Value ({sliderDemoValue})</span>
							<input
								class="interactive-slider"
								type="range"
								min="0"
								max="100"
								step="1"
								bind:value={sliderDemoValue}
							/>
						</label>
						<div class="slider-meter bg-secondary-soft">
							<div class="slider-meter-fill bg-accent" style={`width:${sliderDemoValue}%`}></div>
						</div>
					</div>
				</article>
			</div>
		</section>

		<section class="section-block">
			<h2 class="text-2xl font-bold md:text-3xl">Styling Attributes Reference</h2>
			<p class="text-ecsess-200 mt-2 leading-7">Baseline styling tokens.</p>
			<div class="mt-6 grid gap-4 md:grid-cols-2">
				<div class="flat-block">
					<ul class="token-list">
						<li><code>color</code>: foreground text and icon color tokens</li>
						<li><code>background</code>: section and component surface tokens</li>
						<li><code>border</code>: default 1px separators for structure</li>
						<li><code>ring</code>: focus/selection ring for interaction states</li>
						<li><code>margin</code>: vertical rhythm between sections and blocks</li>
						<li><code>padding</code>: internal spacing using the 3-step scale</li>
					</ul>
				</div>
				<div class="flat-block">
					<ul class="token-list">
						<li><code>gap</code>: spacing in grid and flex layouts</li>
						<li><code>radius</code>: two-level corner system only</li>
						<li><code>shadow</code>: minimal use, mostly none for flat design</li>
						<li><code>opacity</code>: subtle layering for readable surfaces</li>
						<li><code>transition</code>: short, calm motion for controls</li>
						<li><code>z-index</code>: controlled stacking for overlays only</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</main>

<style>
	.branding-page {
		position: relative;
		min-height: 100vh;
		background-color: #021811;
		background-image: linear-gradient(0deg, rgb(232 255 217 / 0.035), rgb(232 255 217 / 0.035));
		background-repeat: repeat;
	}

	.branding-page::before {
		content: '';
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		background-image:
			radial-gradient(circle at 1px 1px, rgb(186 233 165 / 0.09) 1px, transparent 0);
		background-position: 0 0;
		background-size: 24px 24px;
		background-repeat: repeat;
	}

	.section-block {
		border-top: 1px solid rgb(143 185 138 / 0.38);
		padding-top: 26px;
	}

	.content-wrap {
		position: relative;
		z-index: 1;
	}

	.logo-row {
		display: flex;
		align-items: center;
		gap: 0.95rem;
		border: 1px solid rgb(106 154 106 / 0.42);
		border-radius: 8px;
		padding: 12px;
		background: rgb(6 44 32 / 0.24);
	}

	.logo-mark {
		height: 3.2rem;
		width: 3.2rem;
		border-radius: 12px;
		display: grid;
		place-items: center;
		font-weight: 800;
		letter-spacing: 0.06em;
		background: linear-gradient(145deg, #8fb98a, #6a9a6a);
		color: #062c20;
	}

	.logo-mark.compact {
		width: 4.1rem;
		font-size: 0.88rem;
	}

	.logo-mark.mono {
		background: linear-gradient(145deg, #d9f7c5, #cce7ba);
	}

	.flat-block {
		border: 1px solid rgb(122 170 122 / 0.35);
		border-radius: 8px;
		padding: 16px;
		background: rgb(6 44 32 / 0.2);
	}

	.token-title {
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #d9f7c5;
	}

	.token-list {
		margin-top: 0.6rem;
		list-style: none;
		padding-left: 0;
		display: grid;
		gap: 0.4rem;
		color: #cce7ba;
		font-size: 0.95rem;
	}

	.swatch {
		border-radius: 10px;
		padding: 0.6rem 0.8rem;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		color: #e8ffd9;
		border: 1px solid rgb(232 255 217 / 0.14);
	}

	.bg-primary {
		background: #062c20;
	}

	.bg-primary-soft {
		background: #0a3d2a;
	}

	.text-primary-content {
		color: #e8ffd9;
	}

	.bg-secondary {
		background: #3f6a3f;
	}

	.bg-secondary-soft {
		background: #4c7a4f;
	}

	.text-secondary-content {
		color: #e8ffd9;
	}

	.bg-accent {
		background: #bae9a5;
	}

	.bg-accent-soft {
		background: #cce7ba;
	}

	.text-accent-content {
		color: #062c20;
	}

	.control-label {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #d9f7c5;
	}

	.control-stack {
		display: grid;
		gap: 0.4rem;
	}

	.control-input {
		width: 100%;
		border: 1px solid rgb(143 185 138 / 0.45);
		border-radius: 8px;
		background: rgb(6 44 32 / 0.25);
		padding: 0.65rem 0.75rem;
		color: #e8ffd9;
	}

	.interactive-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 9px;
		border-radius: 999px;
		background: linear-gradient(90deg, #2f4d29, #62925a);
		border: 1px solid rgb(204 231 186 / 0.38);
	}

	.interactive-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 999px;
		background: #e8ffd9;
		border: 2px solid #0a3d2a;
		box-shadow: 0 0 0 2px rgb(3 28 21 / 0.55);
		cursor: pointer;
	}

	.interactive-slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 999px;
		background: #e8ffd9;
		border: 2px solid #0a3d2a;
		box-shadow: 0 0 0 2px rgb(3 28 21 / 0.55);
		cursor: pointer;
	}

	.preview-area {
		border: 1px solid rgb(143 185 138 / 0.4);
		border-radius: 8px;
		padding: 1rem;
		background: rgb(6 44 32 / 0.24);
		min-height: 260px;
	}

	.chip {
		border: 1px solid rgb(156 194 149 / 0.5);
		border-radius: 999px;
		padding: 0.35rem 0.7rem;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		background: rgb(76 122 79 / 0.35);
		color: #e8ffd9;
		transition: background-color 150ms ease-in-out;
	}

	.chip:hover {
		background: rgb(106 154 106 / 0.45);
		cursor: pointer;
	}

	.secondary-button {
		border: 1px solid rgb(156 194 149 / 0.6);
		border-radius: 8px;
		padding: 0.75rem 1.2rem;
		font-size: 0.875rem;
		font-weight: 700;
		color: #d9f7c5;
		background: rgb(6 44 32 / 0.45);
	}

	.secondary-button:hover {
		background: rgb(10 61 42 / 0.58);
		cursor: pointer;
	}

	.content-block {
		border: 1px solid rgb(122 170 122 / 0.4);
		border-radius: 8px;
		padding: 1rem;
		background: rgb(6 44 32 / 0.22);
	}

	.slider-demo {
		border: 1px solid rgb(122 170 122 / 0.4);
		border-radius: 8px;
		padding: 16px;
		background: rgb(6 44 32 / 0.22);
	}

	.slider-meter {
		margin-top: 12px;
		height: 10px;
		border-radius: 999px;
		overflow: hidden;
		border: 1px solid rgb(232 255 217 / 0.2);
	}

	.slider-meter-fill {
		height: 100%;
		transition: width 160ms ease-out;
	}

</style>
