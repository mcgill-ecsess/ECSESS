<script lang="ts">
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Section from 'components/layout/Section.svelte';
	import TeamBanner from 'components/team/TeamBanner.svelte';
	import Avatar from 'components/team/Avatar.svelte';
	import type { DevTeam } from '$lib/schemas.js';
	import PastCont from 'components/team/PastCont.svelte';

	let { data } = $props();

	let devTeam: DevTeam[] = data.devTeam ?? [];

	const sortData = (data: DevTeam[]): { current: DevTeam[]; past: DevTeam[] } => {
		let current: DevTeam[] = [];
		let past: DevTeam[] = [];
		data.forEach((member) => {
			if (member.active) {
				current.push(member);
			} else {
				past.push(member);
			}
		});
		return {
			current: current,
			past: past
		};
	};

	let sortedData = sortData(devTeam);
	let current = sortedData.current;
	let past = sortedData.past;
</script>

<SeoMetaTags />

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="flex h-full w-full flex-col items-center">
		<p class="page-title">Meet the incredible dev team!</p>
		<h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Our Current Team</h1>

		<div class="flex w-full flex-col items-center space-y-20 py-40 lg:space-y-50">
			{#each current as member, idx}
				<TeamBanner
					{idx}
					name={member.name}
					role={member.role}
					year={member.yearProgram}
					src={member.image}
					funFact={member.funFact}
					github={member.github}
					email={member.email}
				/>
			{/each}
		</div>

		<h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Past Contributors</h1>
		<div class=" grid max-h-50 w-full grid-cols-2 overflow-y-auto md:grid-cols-4">
			<h1>Name</h1>
			<h1>Role</h1>
			<h1 class="hidden md:block">Start</h1>
			<h1 class="hidden md:block">End</h1>
			{#each past as contr}
				<PastCont name={contr.name} role={contr.role} start={contr.start} end={contr.end} />
			{/each}
		</div>
	</div>
</Section>
