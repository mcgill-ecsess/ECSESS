<script lang="ts">
	import type { DevTeam } from '$lib/schemas';
	import YearLine from './YearLine.svelte';
	import DevCard from './DevCard.svelte';

	let {
		year,
		members,
		active = false
	} = $props<{
		year: string;
		members: DevTeam[];
		active?: boolean;
	}>();
</script>

<div class="relative w-full">
	<!-- Branch Line with Year -->
	<div class="mb-6">
		<YearLine {year} {active} />
	</div>

	<!-- Members Grid -->
	<div class="ml-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
