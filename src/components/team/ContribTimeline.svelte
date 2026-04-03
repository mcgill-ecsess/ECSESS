<script lang="ts">
	import type { DevTeam } from '$lib/schemas';
	import YearLine from './YearLine.svelte';
	import DevCard from './DevCard.svelte';

	let {
		term,
		members,
		active = false,
		isLast = false
	} = $props<{
		term: string;
		members: DevTeam[];
		active?: boolean;
		isLast?: boolean;
	}>();
</script>

<div class="relative flex gap-0">
	<!-- Left: vertical timeline rail -->
	<div class="relative flex w-5 shrink-0 flex-col items-center">
		<!-- Continuous vertical rail — stops halfway on last item -->
		<div
			class="absolute top-0 w-px {isLast ? 'bottom-1/2' : 'bottom-0'} {active
				? 'bg-ecsess-600'
				: 'bg-ecsess-800'}"
		></div>
	</div>

	<!-- Right: content -->
	<div class="flex-1 pb-14 pl-6">
		<!-- Year label row -->
		<div class="-ml-6 mb-8">
			<YearLine {term} {active} />
		</div>

		<!-- Member count pill -->
		<div class="mb-5 flex items-center gap-3">
			<span
				class="font-mono text-xs tracking-widest uppercase {active
					? 'text-ecsess-500'
					: 'text-ecsess-700'}"
			>
				{members.length}
				{members.length !== 1 ? 'contributors' : 'contributor'}
			</span>
			<div class="h-px flex-1 {active ? 'bg-ecsess-700/50' : 'bg-ecsess-800/50'}"></div>
		</div>

		<!-- Members Grid -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each members as member}
				<DevCard
					name={member.name}
					role={member.role}
					year={member.yearProgram}
					src={member.image}
					funFact={member.funFact}
					github={member.github}
					email={member.email}
					{active}
				/>
			{/each}
		</div>
	</div>
</div>
