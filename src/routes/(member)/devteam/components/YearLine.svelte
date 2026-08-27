<script lang="ts">
	import CommitDot from './CommitDot.svelte';

	let { term, active = false } = $props<{
		term: string;
		active?: boolean;
	}>();
</script>

<div class="relative mb-6 flex items-center gap-4">
	<!-- Git Node column (w-3 = 12px, aligns with vertical timeline; circle centered) -->
	<div class="flex w-3 shrink-0 justify-center">
		<CommitDot {active} />
	</div>

	<!-- Year Label -->
	<div
		class="flex shrink-0 items-center justify-center font-mono text-xl font-bold tracking-wide uppercase transition-colors md:justify-start {active
			? 'text-ecsess-300'
			: 'text-ecsess-400'}"
	>
		<span>{term}</span>
	</div>

	<!-- Branch Line -->
	<div class="h-px min-w-[100px] flex-1 {active ? 'bg-ecsess-500' : 'bg-ecsess-600'}"></div>
</div>
