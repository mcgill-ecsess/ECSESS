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
		(member: CouncilMember) =>
			member.position.includes('VP') || member.position.includes('Equity and Mental Health Officer')
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
		<h1>Our Student Council</h1>
		<img src={data.councilGoofyPic.url} alt="ECSESS Council, but we are goofy" transition:fly />
	</div>
</Section>
<Section>
	<div>
		<CardCouncil
			name={president.name}
			position={president.position}
			image={president.image}
			onViewProfile={() => handleViewProfile(president!)}
		/>
	</div>

	<div class="flex justify-center">
		<div class="flex flex-row flex-wrap justify-center gap-10 p-4 align-middle">
			{#each vps as vp}
				<CardCouncil
					name={vp.name}
					position={vp.position}
					image={vp.image}
					onViewProfile={() => handleViewProfile(vp)}
				/>
			{/each}
			{#each ureps as urep}
				<CardCouncil
					name={urep.name}
					position={urep.position}
					image={urep.image}
					onViewProfile={() => handleViewProfile(urep)}
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
