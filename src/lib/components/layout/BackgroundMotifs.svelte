<script lang="ts">
	import { onMount } from 'svelte';
	import type { Component } from 'svelte';
	import {
		Activity,
		Atom,
		Battery,
		BatteryCharging,
		Binary,
		Braces,
		Brackets,
		Bug,
		Cable,
		Calculator,
		CircuitBoard,
		Code,
		CodeXml,
		Cpu,
		FileCode,
		GitCommitHorizontal,
		GitPullRequest,
		HardDrive,
		Hash,
		Infinity,
		Keyboard,
		Laptop,
		Lightbulb,
		Magnet,
		MemoryStick,
		Microchip,
		Monitor,
		Orbit,
		Percent,
		Pi,
		Power,
		Radical,
		Server,
		Sigma,
		SquareFunction,
		Terminal,
		Usb,
		Variable,
		Wifi,
		Zap
	} from '@lucide/svelte';

	type SizeOption = {
		className: string;
		/** Collision radius in mixed %-of-width units (see distance check). */
		radius: number;
	};

	type Motif = {
		icon: Component;
		sizeClass: string;
		radius: number;
		topDvh: number;
		leftPct: number;
		rotate: number;
		opacity: number;
	};

	const icons: Component[] = [
		Code,
		Zap,
		Cpu,
		Lightbulb,
		CircuitBoard,
		Microchip,
		Atom,
		CodeXml,
		Terminal,
		Binary,
		Braces,
		Battery,
		Sigma,
		Pi,
		Orbit,
		Calculator,
		Magnet,
		Activity,
		Server,
		Monitor,
		Laptop,
		FileCode,
		Wifi,
		BatteryCharging,
		Radical,
		Infinity,
		SquareFunction,
		GitPullRequest,
		Hash,
		Keyboard,
		HardDrive,
		MemoryStick,
		Usb,
		Cable,
		Power,
		Bug,
		Brackets,
		Variable,
		Percent,
		GitCommitHorizontal
	];

	const sizes: SizeOption[] = [
		{ className: 'size-12 md:size-16', radius: 3.2 },
		{ className: 'size-14 md:size-20', radius: 3.8 },
		{ className: 'size-16 md:size-24', radius: 4.6 },
		{ className: 'size-20 md:size-28', radius: 5.4 }
	];

	/** Target motif count — denser than before, still sparse in the center column. */
	const TARGET_COUNT = 54;
	const MAX_ATTEMPTS = 2400;
	/** Extra gap between icon edges (same units as radius). */
	const PADDING = 1.6;
	/** Vertical page height covered by motifs (dvh). */
	const MAX_TOP_DVH = 460;
	/**
	 * Scale dvh → %-of-width so distance checks are roughly isotropic
	 * (assumes ~viewport-width ≈ 100% and tall pages in dvh).
	 */
	const DVH_TO_PCT = 0.55;

	function rand(min: number, max: number) {
		return min + Math.random() * (max - min);
	}

	function pick<T>(items: readonly T[]): T {
		return items[Math.floor(Math.random() * items.length)];
	}

	function distance(a: Motif, b: Motif) {
		const dx = a.leftPct - b.leftPct;
		const dy = (a.topDvh - b.topDvh) * DVH_TO_PCT;
		return Math.hypot(dx, dy);
	}

	function overlaps(candidate: Motif, placed: Motif[]) {
		return placed.some(
			(other) => distance(candidate, other) < candidate.radius + other.radius + PADDING
		);
	}

	/** Prefer edge gutters; occasionally soft inner accents. Center column stays clear. */
	function sampleLeftPct(): number {
		const roll = Math.random();
		if (roll < 0.42) return rand(1, 12); // left outer
		if (roll < 0.84) return rand(88, 99); // right outer
		if (roll < 0.92) return rand(14, 24); // left soft
		return rand(76, 86); // right soft
	}

	/**
	 * Pack motifs with rejection sampling so icons do not overlap.
	 * Built client-side only to avoid SSR/client Math.random mismatches.
	 */
	function buildMotifs(): Motif[] {
		const motifs: Motif[] = [];

		for (let attempt = 0; attempt < MAX_ATTEMPTS && motifs.length < TARGET_COUNT; attempt++) {
			const size = Math.random() < 0.7 ? pick(sizes.slice(0, 3)) : pick(sizes);
			const candidate: Motif = {
				icon: pick(icons),
				sizeClass: size.className,
				radius: size.radius,
				topDvh: rand(6, MAX_TOP_DVH),
				leftPct: sampleLeftPct(),
				rotate: rand(-28, 28),
				opacity: rand(0.24, 0.36)
			};

			if (!overlaps(candidate, motifs)) {
				motifs.push(candidate);
			}
		}

		return motifs;
	}

	let motifs = $state<Motif[]>([]);

	onMount(() => {
		motifs = buildMotifs();
	});
</script>

<div
	class="pointer-events-none absolute inset-0 z-0 overflow-hidden"
	aria-hidden="true"
	id="BackgroundMotifs"
	data-component="BackgroundMotifs"
>
	{#each motifs as motif, i (`${i}-${motif.topDvh.toFixed(2)}-${motif.leftPct.toFixed(2)}`)}
		{@const Icon = motif.icon}
		<div
			class="text-ecsess-700 absolute {motif.sizeClass}"
			style="
				top: {motif.topDvh}dvh;
				left: {motif.leftPct}%;
				opacity: {motif.opacity};
				transform: rotate({motif.rotate}deg);
			"
		>
			<Icon class="size-full" strokeWidth={1.25} />
		</div>
	{/each}
</div>
