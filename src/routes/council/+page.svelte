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
			></CardCouncilBase>
		{/each}
		{#each ureps as councilMember}
		<CardCouncilBase
			name={councilMember.name}
			position={councilMember.position}
			image={councilMember.image}
		></CardCouncilBase>
		{/each}
		</div>
	</div>
</Section>
