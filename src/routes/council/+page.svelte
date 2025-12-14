<script lang="ts">
	import CouncilCardPopUp from 'components/council/CouncilCardPopUp.svelte';
	import Section from 'components/layout/Section.svelte';
	import CardCouncil from 'components/council/CouncilCard.svelte';
	import type { CouncilMember } from '$lib/schemas';
	import { fly } from 'svelte/transition';
	import Button from 'components/Button.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';

	let { data } = $props();

	// Get members by 3 main categories:
	// - President
	// - VPs + Equity and Mental Health Officer
	// - UReps
	let president = $derived(
		data.members.filter((member: CouncilMember) =>
			member.position.includes('President')
		)[0]
	);

	let vps = $derived(
		data.members.filter((member: CouncilMember) => 
			member.position.includes('VP') || member.position.includes('Equity')
		)
	);

	let ureps = $derived.by(() => {
		const years = ['U4', 'U3', 'U2', 'U1', 'U0'];
		
		return data.members
			.filter((member: CouncilMember) => member.position.includes('Representative'))
			.sort((a, b) => {
				const aYear = years.findIndex((year) => a.position.includes(year));
				const bYear = years.findIndex((year) => b.position.includes(year));
				return aYear - bYear;
			});
	});

	let selectedMember = $state<CouncilMember | null>(null);
	
	function handleViewProfile(member: CouncilMember) {
		selectedMember = member;
	}
</script>

<SeoMetaTags
	title="Meet the ECSESS student council members!"
	description="Greetings from ECSESS student council!"
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="flex flex-col place-items-center">
		<p class="page-title">Meet the council!</p>

		<img
			src={data.councilGoofyPic.url}
			alt="ECSESS Council, but we are goofy"
			class="ring-ecsess-400 shadow-ecsess-black hover:ring-ecsess-300 mb-8 rounded-md shadow-2xl ring-4 transition-all lg:w-[90%]"
			transition:fly
		/>
	</div>

	<h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Our Student Council!</h1>

	<div>
		<CardCouncil
			name={president.name}
			position={president.position}
			image={president.image}
			onViewProfile={() => handleViewProfile(president!)}
		/>
	</div>

	<div class="grid place-items-center">
		<h2
			class="border-b-ecsess-300 w-full place-self-center-safe border-b-2 border-dashed md:w-1/2 lg:w-1/3"
		>
			Vice Presidents
		</h2>
		<div class="grid gap-2 py-8 md:grid-cols-2 lg:grid-cols-3">
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
			class="border-b-ecsess-300 w-full place-self-center-safe border-b-2 border-dashed md:w-1/2 lg:w-1/3"
		>
			Year Representative
		</h2>
		<div class="grid gap-2 py-8 md:grid-cols-2 lg:grid-cols-3">
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
	{#if selectedMember}
		<div class="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/70">
			<CouncilCardPopUp
				name={selectedMember.name}
				position={selectedMember.position}
				email={selectedMember.email}
				positionDescription={selectedMember.positionDescription}
				yearProgram={selectedMember.yearProgram}
				image={selectedMember.image}
			/>
			<div transition:fly>
				<Button onclick={() => (selectedMember = null)}>Close</Button>
			</div>
		</div>
	{/if}
</Section>
