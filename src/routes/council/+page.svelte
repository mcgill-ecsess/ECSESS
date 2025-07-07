<script lang="ts">
	import CouncilCardPopUp from 'components/CouncilCardPopUp.svelte';
	import Section from 'components/Section.svelte';
	import CardCouncil from 'components/CouncilCard.svelte';
	import type CouncilMember from 'utils/schemas';

	let { data } = $props();
	let years = ['U4', 'U3', 'U2', 'U1', 'U0'];
	let vps: CouncilMember[] = [];
	let ureps: CouncilMember[] = [];
	// svelte-ignore non_reactive_update
	let president: CouncilMember | null = null;
	data.members.forEach((member: CouncilMember) => {
		if (
			member.position.includes('VP') ||
			member.position.includes('Equity and Mental Health Officer')
		) {
			vps.push(member);
		} else if (member.position.includes('Representative')) {
			ureps.push(member);
			ureps.sort((a, b) => {
				const aYear = years.findIndex((y) => a.position.includes(y));
				const bYear = years.findIndex((y) => b.position.includes(y));
				return aYear - bYear;
			});
		} else if (member.position.includes('President')) {
			president = member;
		}
	});

	let selectedMember = $state<CouncilMember | null>(null);

	function handleViewProfile(member: CouncilMember) {
		selectedMember = member;
	}

	console.log(ureps)

	// svelte-ignore state_referenced_locally
	// console.log(selectedMember);
</script>

<title> ECSESS council </title>
<Section>
	<p class="page-title">Meet the council!</p>
	<div>
		<h1>Our Student Council</h1>
		<img src={data.councilGoofyPic.url} alt="ECSESS Council, but we are goofy" />
	</div>
</Section>
<Section>
	<div class="president">
		{#if president}
			<CardCouncil
				name={president.name}
				position={president.position}
				image={president.image}
				onViewProfile={() => handleViewProfile(president!)}
			/>
		{/if}
	</div>
	<div class="flex justify-center">
		<div class="flex flex-row flex-wrap justify-center gap-10 p-4 align-middle">
			{#each vps as councilMember}
				<CardCouncil
					name={councilMember.name}
					position={councilMember.position}
					image={councilMember.image}
					onViewProfile={() => handleViewProfile(councilMember)}
				/>
			{/each}
			{#each ureps as councilMember}
				<CardCouncil
					name={councilMember.name}
					position={councilMember.position}
					image={councilMember.image}
					onViewProfile={() => handleViewProfile(councilMember)}
				/>
			{/each}
		</div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#if selectedMember}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
				onclick={() => (selectedMember = null)}
			>
				<CouncilCardPopUp
					name={selectedMember.name}
					position={selectedMember.position}
					email={selectedMember.email}
					positionDescription={selectedMember.positionDescription}
					yearProgram={selectedMember.yearProgram}
					image={selectedMember.image}
				/>
			</div>
		{/if}
	</div>
</Section>

<!-- <CouncilCard
		name={vps[1].name}
		position={vps[1].position}
		email={vps[1].email}
		positionDescription={vps[1].positionDescription}
		yearProgram={vps[1].yearProgram}
		image={vps[1].image}
	></CouncilCard> -->
