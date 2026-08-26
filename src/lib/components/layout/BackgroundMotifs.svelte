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

	type Motif = {
		icon: Component;
		/** Size only — must be full Tailwind literals */
		sizeClass: string;
		topDvh: number;
		leftPct: number | null;
		rightPct: number | null;
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

	const sizes = [
		'size-12 md:size-16',
		'size-14 md:size-20',
		'size-16 md:size-24',
		'size-20 md:size-28'
	] as const;

	function rand(min: number, max: number) {
		return min + Math.random() * (max - min);
	}

	function pick<T>(items: readonly T[]): T {
		return items[Math.floor(Math.random() * items.length)];
	}

	/**
	 * Random placement within strategic lanes (edges dense, center clear).
	 * Built client-side only to avoid SSR/client Math.random mismatches.
	 */
	function buildMotifs(): Motif[] {
		const motifs: Motif[] = [];

		// Edge gutters — random side, inset, and vertical spacing
		let top = rand(8, 16);
		while (top <= 420) {
			const onLeft = Math.random() < 0.5;
			motifs.push({
				icon: pick(icons),
				sizeClass: pick(sizes),
				topDvh: top + rand(-3, 3),
				leftPct: onLeft ? rand(1, 11) : null,
				rightPct: onLeft ? null : rand(1, 11),
				rotate: rand(-26, 26),
				opacity: rand(0.28, 0.36)
			});
			top += rand(18, 28);
		}

		// Soft inner accents — still outside the dead-center content column
		top = rand(28, 48);
		while (top <= 400) {
			const onLeft = Math.random() < 0.5;
			motifs.push({
				icon: pick(icons),
				sizeClass: pick(sizes.slice(0, 2)),
				topDvh: top + rand(-4, 4),
				leftPct: onLeft ? rand(16, 26) : null,
				rightPct: onLeft ? null : rand(16, 26),
				rotate: rand(-22, 22),
				opacity: rand(0.24, 0.32)
			});
			top += rand(44, 62);
		}

		return motifs;
	}

	let motifs = $state<Motif[]>([]);

	onMount(() => {
		motifs = buildMotifs();
	});
</script>

<div class="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
	{#each motifs as motif, i (`${i}-${motif.topDvh}`)}
		{@const Icon = motif.icon}
		<div
			class="text-ecsess-700 absolute {motif.sizeClass}"
			style="
				top: {motif.topDvh}dvh;
				{motif.leftPct != null ? `left: ${motif.leftPct}%;` : ''}
				{motif.rightPct != null ? `right: ${motif.rightPct}%;` : ''}
				opacity: {motif.opacity};
				transform: rotate({motif.rotate}deg);
			"
		>
			<Icon class="size-full" strokeWidth={1.25} />
		</div>
	{/each}
</div>
