<script lang="ts">
	let { name, role, start, end } = $props<{
		name: string;
		role: string;
		start: any;
		end: any;
	}>();

	const dateRange = $derived(() => {
		const startYear = start || 'Unknown';
		const endYear = end || 'Unknown';
		if (startYear === 'Unknown' && endYear === 'Unknown') {
			return '';
		}
		return `${startYear} - ${endYear}`;
	});
</script>

<div
	class="fadeup group border-ecsess-700 from-ecsess-800 to-ecsess-900/50 shadow-ecsess-black/50 hover:border-ecsess-500 hover:shadow-ecsess-black/70 relative
	flex flex-col rounded-xl border border-dotted bg-gradient-to-br
	p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
>
	<!-- Role Badge -->
	{#if role}
		<span
			class="bg-ecsess-500 mb-3 w-fit rounded-full px-3 py-1 text-xs font-bold tracking-wider text-gray-300 uppercase"
		>
			{role}
		</span>
	{/if}

	<!-- Name -->
	<h3 class="text-ecsess-50 text-lg font-bold md:text-xl">
		{name}
	</h3>

	<!-- Date Range -->
	{#if dateRange()}
		<p class="text-ecsess-200 mt-1 text-sm">
			{dateRange()}
		</p>
	{/if}
</div>

<style>
	.fadeup {
		animation: fadeUp both;
		animation-timeline: view();
		animation-range: entry 25% cover 40%;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.5);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
