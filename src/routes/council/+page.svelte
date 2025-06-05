<script>
	import CouncilCard from 'components/CouncilCard.svelte';
	import Section from 'components/Section.svelte';
	let { data } = $props();
</script>

<title> ECSESS council </title>
<Section>
	<p class="page-title">Meet the council!</p>

	<p>Group picture!</p>
	{#each data.members as councilMember}
		<CouncilCard
			name={councilMember.name}
			position={councilMember.position}
			email={councilMember.email}
			positionDescription={councilMember.positionDescription}
			yearProgram={councilMember.yearProgram}
		></CouncilCard>
	{/each}

	<p>Here are the members of the ECSESS council!</p>
	<div>
		<h2>President</h2>
		<p>Name:</p>
		<p>Email:</p>
		<p>Year:</p>
		<p>Program:</p>
	</div>
</Section>
