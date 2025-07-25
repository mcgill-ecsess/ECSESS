<script lang="ts">
	import CouncilCardPopUp from 'components/CouncilCardPopUp.svelte';
	import Section from 'components/Section.svelte';
	import CardCouncil from 'components/CouncilCard.svelte';
	import type { CouncilMember } from '$lib/schemas';
	import { fly, slide } from 'svelte/transition';

	let { data } = $props();

	// Get members by 3 main categories:
	// - Preseident
	// - VPs + Equity and Mental Health Officer
	// - UReps
	let president: CouncilMember = data.members.filter((member: CouncilMember) =>
		member.position.includes('President')
	)[0];

	let vps: CouncilMember[] = data.members.filter(
		(member: CouncilMember) => member.position.includes('VP') || member.position.includes('Equity')
	);

	let ureps: CouncilMember[] = data.members.filter((member: CouncilMember) =>
		member.position.includes('Representative')
	);

	let years = ['U4', 'U3', 'U2', 'U1', 'U0'];

	ureps.sort((a, b) => {
		const aYear = years.findIndex((year) => a.position.includes(year));
		const bYear = years.findIndex((year) => b.position.includes(year));
		return aYear - bYear;
	});

	let selectedMember = $state<CouncilMember | null>(null);

	function handleViewProfile(member: CouncilMember) {
		selectedMember = member;
	}
</script>

<title> ECSESS council </title>
<Section>
	<p class="page-title">Meet the council!</p>
	<div>
		<img
			src={data.councilGoofyPic.url}
			alt="ECSESS Council, but we are goofy"
			class="ring-ecsess-400 shadow-ecsess-black mb-8 place-self-center rounded-lg shadow-2xl ring-4 lg:w-[90%]"
			transition:fly
		/>
	</div>

	<h1 class="border-b-ecsess-200 w-full border-b-2 lg:w-1/2">Our Student Council!</h1>

	<div>
		<CardCouncil
			name={president.name}
			position={president.position}
			image={president.image}
			onViewProfile={() => handleViewProfile(president!)}
		/>
	</div>

	<div class="flex flex-col justify-center">
		<h2
			class="border-b-ecsess-200 w-full place-self-center-safe border-b-2 border-dashed md:w-1/2 lg:w-1/3"
		>
			Vice Presidents
		</h2>
		<div class="flex flex-row flex-wrap justify-baseline gap-10 p-4 align-middle md:justify-center">
			{#each vps as vp}
				<CardCouncil
					name={vp.name}
					position={vp.position}
					image={vp.image}
					onViewProfile={() => handleViewProfile(vp)}
				/>
			{/each}
		</div>

		<h2
			class="border-b-ecsess-200 w-full place-self-center-safe border-b-2 border-dashed md:w-1/2 lg:w-1/3"
		>
			Year Representative
		</h2>
		<div class="flex flex-row flex-wrap justify-baseline gap-10 p-4 align-middle md:justify-center">
			{#each ureps as urep}
				<CardCouncil
					name={urep.name}
					position={urep.position}
					image={urep.image}
					onViewProfile={() => handleViewProfile(urep)}
				/>
			{/each}
		</div>
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
</Section>
