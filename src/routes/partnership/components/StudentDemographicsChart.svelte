<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		DoughnutController,
		ArcElement,
		type ChartConfiguration,
		type Plugin
	} from 'chart.js';
	import { DEMOGRAPHICS_CHART_COLORS } from '$lib/theme.js';

	Chart.register(DoughnutController, ArcElement);

	const labels = ['International', 'Other Provinces', 'Québec'];
	const values = [30, 19, 51];

	type LabelPosition = { x: number; y: number; align: CanvasTextAlign };

	let canvas = $state<HTMLCanvasElement | null>(null);
	let chartStage = $state<HTMLDivElement | null>(null);
	let labelPositions = $state<LabelPosition[]>([]);
	let chartInstance: Chart<'doughnut'> | null = null;

	function getLayoutPadding(containerWidth: number) {
		return Math.max(52, Math.min(containerWidth * 0.22, 80));
	}

	function updateLabelPositions(chart: Chart<'doughnut'>) {
		const meta = chart.getDatasetMeta(0);

		labelPositions = meta.data.map((arc) => {
			const element = arc as unknown as ArcElement;
			const angle = (element.startAngle + element.endAngle) / 2;
			const labelRadius = element.outerRadius + 22;
			const x = element.x + Math.cos(angle) * labelRadius;
			const y = element.y + Math.sin(angle) * labelRadius;

			const align: CanvasTextAlign =
				Math.cos(angle) < -0.25 ? 'right' : Math.cos(angle) > 0.25 ? 'left' : 'center';

			return { x, y, align };
		});
	}

	function createSyncPlugin(): Plugin<'doughnut'> {
		return {
			id: 'syncHtmlLabels',
			afterDraw(chart) {
				updateLabelPositions(chart);
			}
		};
	}

	function buildChart(containerWidth: number) {
		if (!canvas) return null;

		const padding = getLayoutPadding(containerWidth);

		const config: ChartConfiguration<'doughnut'> = {
			type: 'doughnut',
			data: {
				labels,
				datasets: [
					{
						data: values,
						backgroundColor: [...DEMOGRAPHICS_CHART_COLORS],
						borderWidth: 0,
						hoverBorderWidth: 0
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				cutout: '58%',
				rotation: 240,
				layout: { padding },
				plugins: {
					legend: { display: false },
					tooltip: { enabled: false }
				},
				events: []
			},
			plugins: [createSyncPlugin()]
		};

		return new Chart(canvas, config);
	}

	onMount(() => {
		if (!canvas || !chartStage) return;

		chartInstance = buildChart(chartStage.clientWidth);

		const observer = new ResizeObserver(() => {
			if (!chartStage || !canvas) return;

			const width = chartStage.clientWidth;
			const padding = getLayoutPadding(width);

			if (chartInstance?.options.layout) {
				chartInstance.options.layout.padding = padding;
				chartInstance.resize();
				chartInstance.update('none');
			}
		});

		observer.observe(chartStage);

		return () => {
			observer.disconnect();
			chartInstance?.destroy();
			chartInstance = null;
		};
	});
</script>

<div
	class="flex w-full min-w-0 flex-col items-center gap-3 overflow-visible"
	id="StudentDemographicsChart"
	data-component="StudentDemographicsChart"
>
	<div class="w-full max-w-96 overflow-visible">
		<div class="relative aspect-square w-full overflow-visible" bind:this={chartStage}>
			<canvas bind:this={canvas} aria-label="Student demographics doughnut chart"></canvas>

			{#each labels as label, index (label)}
				{@const pos = labelPositions[index]}
				{#if pos}
					<div
						class="text-ecsess-50 pointer-events-none absolute flex max-w-[min(9rem,42vw)] -translate-x-1/2 -translate-y-1/2 flex-col gap-0.5 text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
						class:-translate-x-full={pos.align === 'right'}
						class:translate-x-0={pos.align === 'left'}
						class:text-right={pos.align === 'right'}
						class:text-left={pos.align === 'left'}
						style:left="{pos.x}px"
						style:top="{pos.y}px"
					>
						<span class="text-[clamp(0.65rem,2vw+0.25rem,0.875rem)] leading-tight font-bold">
							{label}
						</span>
						<span class="text-[clamp(0.75rem,2.2vw+0.3rem,1rem)] leading-tight font-extrabold">
							{values[index]}%
						</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	canvas {
		display: block;
		width: 100% !important;
		height: 100% !important;
	}
</style>
