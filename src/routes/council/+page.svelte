<script lang="ts">
	import CouncilCard from 'components/CouncilCard.svelte';
	import Section from 'components/Section.svelte';
	import CardCouncilBase from 'components/CouncilCardBase.svelte';
	import CouncilCardBase from 'components/CouncilCardBase.svelte';
	import type CouncilMember from 'utils/schemas'

	let { data } = $props();
	let years = ["U4", "U3", "U2", "U1", "U0"]
	let vps : CouncilMember[] = []
	let ureps : CouncilMember[] = []
	// svelte-ignore non_reactive_update
		let president: CouncilMember | null = null;
	data.members.forEach((member: CouncilMember) => {
		if (member.position.includes("VP") || member.position.includes("Equity and Mental Health Officer")){
			vps.push(member); 
		}
		else if (member.position.includes("Representative")){
			ureps.push(member)
			ureps.sort((a, b) => {
				const aYear = years.findIndex(y => a.position.includes(y))
				const bYear = years.findIndex(y => b.position.includes(y))
				return aYear - bYear
			})
		}
		else if (member.position.includes("President")){
			president = member
		}
	})

	let selectedMember = $state<CouncilMember | null>(null);

	function handleViewProfile(member: CouncilMember) {
		selectedMember = member;
	}

	// svelte-ignore state_referenced_locally
		console.log(selectedMember)
</script>

<title> ECSESS council </title>
<Section>
	<p class="page-title">Meet the council!</p>
	<p>Group picture!</p>
</Section>
<Section >
	<div class="president">
		{#if president}
			<CouncilCardBase
				name={president.name}
				position={president.position}
				image={president.image}
				onViewProfile={() => handleViewProfile(president!)}
			></CouncilCardBase>
		{/if}
	</div>
	<div class="flex justify-center">
		<div class="flex flex-row flex-wrap justify-center align-middle gap-10 p-4">
		{#each vps as councilMember}
			<CardCouncilBase
				name={councilMember.name}
				position={councilMember.position}
				image={councilMember.image}
				onViewProfile={() => handleViewProfile(councilMember)}
			></CardCouncilBase>
		{/each}
		{#each ureps as councilMember}
		<CardCouncilBase
			name={councilMember.name}
			position={councilMember.position}
			image={councilMember.image}
			onViewProfile={() => handleViewProfile(councilMember)}
		></CardCouncilBase>
		{/each}
		</div>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#if selectedMember}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
		onclick={() => (selectedMember = null)}
		>
				<CouncilCard
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
