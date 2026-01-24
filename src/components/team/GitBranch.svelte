<script lang="ts">
	import GitNode from './GitNode.svelte';

	let { year, active = false } = $props<{
		year: string;
		active?: boolean;
	}>();
</script>

<div class="relative flex items-center gap-4">
	<!-- Git Node (aligns with vertical line) -->
	<div class="flex shrink-0 items-center gap-4">
		<GitNode {active} size="md" />

		<!-- Year Label -->
		<div
			class="flex items-center justify-center font-mono text-xl font-bold tracking-wide uppercase transition-colors md:justify-start {active
				? 'text-ecsess-300'
				: 'text-ecsess-400'}"
		>
			<span>{year}</span>
		</div>
	</div>

	<!-- Branch Line -->
	<div class="h-px min-w-[100px] flex-1 {active ? 'bg-ecsess-500' : 'bg-ecsess-600'}"></div>
</div>
