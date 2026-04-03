<script lang="ts">
	import CommitDot from './CommitDot.svelte';

	let { term, active = false } = $props<{
		term: string;
		active?: boolean;
	}>();
</script>

<div class="relative flex items-center gap-4">
	<!-- Timeline node -->
	<div class="z-10 flex w-5 shrink-0 justify-center">
		<CommitDot {active} />
	</div>

	{#if active}
		<!-- Active badge with glow -->
		<div class="flex items-center gap-3">
			<span
				class="bg-ecsess-800 border-ecsess-500/60 text-ecsess-100 shadow-ecsess-500/20 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-base font-bold tracking-widest uppercase shadow-md"
			>
				<span class="bg-ecsess-400 size-2 animate-pulse rounded-full"></span>
				{term}
			</span>
			<span class="text-ecsess-400 font-mono text-xs tracking-wider uppercase">Current cohort</span>
		</div>
	{:else}
		<!-- Past year label -->
		<div class="flex items-center gap-3">
			<span
				class="text-ecsess-500 font-mono text-lg font-bold tracking-widest uppercase"
			>{term}</span>
			<div class="h-px w-12 bg-ecsess-700"></div>
		</div>
	{/if}
</div>
