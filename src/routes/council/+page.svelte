<script>
	import CouncilCard from 'components/CouncilCard.svelte';
	import Section from 'components/Section.svelte';
	// import CouncilMember from 'utils/schemas.ts';
	let { data } = $props();
</script>

<title> ECSESS council </title>
<Section>
	<p class="page-title">Meet the council!</p>

	<p>Group picture!</p>
	
	<div class="flex flex-row flex-wrap items-center align-middle gap-10 p-4">
		{#each data.members as councilMember}
			<CouncilCard
				name={councilMember.name}
				position={councilMember.position}
				email={councilMember.email}
				positionDescription={councilMember.positionDescription}
				yearProgram={councilMember.yearProgram}
				image={councilMember.image}
			></CouncilCard>
		{/each}
	</div>
</Section>
