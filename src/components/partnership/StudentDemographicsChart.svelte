<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Chart,
		DoughnutController,
		ArcElement,
		type ChartConfiguration,
		type Plugin
	} from 'chart.js';

	Chart.register(DoughnutController, ArcElement);

	const labels = ['International', 'Other Provinces', 'Québec'];
	const values = [30, 19, 51];
	const colors = ['#FF9844', '#FFD54F', '#FFF3E0'];

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
						backgroundColor: colors,
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
				layout: {
					padding
				},
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

			if (chartInstance) {
				if (chartInstance.options.layout) {
					chartInstance.options.layout.padding = padding;
				}
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

<div class="demographics-chart">
	<h3 class="demographics-title">Student Demographics</h3>

	<div class="chart-wrap">
		<div class="chart-stage" bind:this={chartStage}>
			<canvas bind:this={canvas} aria-label="Student demographics doughnut chart"></canvas>

			{#each labels as label, index (label)}
				{@const pos = labelPositions[index]}
				{#if pos}
					<div
						class="chart-label"
						class:chart-label-left={pos.align === 'right'}
						class:chart-label-right={pos.align === 'left'}
						style:left="{pos.x}px"
						style:top="{pos.y}px"
					>
						<span class="chart-label-name">{label}</span>
						<span class="chart-label-value">{values[index]}%</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.demographics-chart {
		display: flex;
		width: 100%;
		min-width: 0;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		overflow: visible;
	}

	.demographics-title {
		margin: 0;
		padding-inline: 0.5rem;
		font-size: clamp(1.1rem, 2.5vw + 0.5rem, 1.75rem);
		font-weight: 800;
		line-height: 1.2;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #fff;
		text-shadow:
			0 2px 0 rgba(0, 0, 0, 0.55),
			0 0 18px rgba(0, 0, 0, 0.35);
	}

	.chart-wrap {
		width: min(100%, 24rem);
		overflow: visible;
	}

	.chart-stage {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		overflow: visible;
	}

	.chart-stage :global(canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
	}

	.chart-label {
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		pointer-events: none;
		transform: translate(-50%, -50%);
		max-width: min(9rem, 42vw);
		text-align: center;
		color: #fff;
		text-shadow:
			0 1px 2px rgba(0, 0, 0, 0.85),
			0 0 12px rgba(0, 0, 0, 0.45);
	}

	.chart-label-left {
		transform: translate(-100%, -50%);
		text-align: right;
	}

	.chart-label-right {
		transform: translate(0, -50%);
		text-align: left;
	}

	.chart-label-name {
		font-size: clamp(0.65rem, 2vw + 0.25rem, 0.875rem);
		font-weight: 700;
		line-height: 1.15;
	}

	.chart-label-value {
		font-size: clamp(0.75rem, 2.2vw + 0.3rem, 1rem);
		font-weight: 800;
		line-height: 1.1;
	}
</style>
