<script lang="ts">
	import CouncilCardPopUp from 'components/council/CouncilCardPopUp.svelte';
	import Section from 'components/layout/Section.svelte';
	import CardCouncil from 'components/council/CouncilCard.svelte';
	import type { CouncilMember } from '$lib/schemas';
	import { fly } from 'svelte/transition';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';

	let { data } = $props();

	const years = ['U4', 'U3', 'U2', 'U1', 'U0'];

	// Get members by 3 main categories (reactive from data)
	let president = $derived(
		data.members.filter((member: CouncilMember) => member.position.includes('President'))[0]
	);
	let vps = $derived(
		data.members.filter(
			(member: CouncilMember) =>
				member.position.includes('VP') || member.position.includes('Equity')
		)
	);
	let ureps = $derived(
		(() => {
			const list = data.members.filter((member: CouncilMember) =>
				member.position.includes('Representative')
			);
			return [...list].sort((a, b) => {
				const aYear = years.findIndex((year) => a.position.includes(year));
				const bYear = years.findIndex((year) => b.position.includes(year));
				return aYear - bYear;
			});
		})()
	);

	let selectedMember = $state<CouncilMember | null>(null);
	let modalRef = $state<HTMLDivElement | null>(null);

	function handleViewProfile(member: CouncilMember) {
		selectedMember = member;
	}
	function closeModal() {
		selectedMember = null;
	}
	function onBackdropKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeModal();
	}

	onMount(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') closeModal();
		}
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	});

	$effect(() => {
		if (selectedMember) {
			document.body.style.overflow = 'hidden';
			tick().then(() => modalRef?.focus());
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<SeoMetaTags
	title="Meet the ECSESS student council members!"
	description="Greetings from ECSESS student council!"
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b" contentStart>
	<div class="flex w-full max-w-4xl flex-col items-center gap-6 py-6 text-left lg:max-w-6xl">
		<p class="page-title text-balance">Meet the council!</p>
		<img
			src={data.councilGoofyPic.url}
			alt="ECSESS Council, but we are goofy"
			class="mb-8 rounded-xl shadow-2xl ring-2 ring-ecsess-400/50 shadow-black/40 transition-all hover:ring-ecsess-300/60 hover:shadow-ecsess-900/30 lg:w-[90%]"
			transition:fly
		/>
	</div>

	<h1 class="border-b-ecsess-300/80 w-full max-w-6xl border-b-2 pb-3 text-center font-semibold tracking-tight">
		Our Student Council
	</h1>

	{#if president}
		<div class="w-full max-w-2xl lg:max-w-3xl">
			<CardCouncil
				name={president.name}
				position={president.position}
				image={president.image}
				onViewProfile={() => handleViewProfile(president)}
			/>
		</div>
	{/if}

	<div class="grid w-full max-w-6xl place-items-center gap-6">
		<h2
			class="border-b-ecsess-300/70 w-full border-b-2 border-dashed pb-2 text-center text-lg font-semibold tracking-tight"
		>
			Vice Presidents
		</h2>
		<div
			class="grid w-full grid-cols-1 gap-5 py-4 sm:gap-6 md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-10"
		>
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
			class="border-b-ecsess-300/70 w-full border-b-2 border-dashed pb-2 text-center text-lg font-semibold tracking-tight"
		>
			Year Representatives
		</h2>
		<div
			class="grid w-full grid-cols-1 gap-5 py-4 sm:gap-6 md:grid-cols-2 md:gap-6 lg:gap-8 xl:gap-10"
		>
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
		<!-- Modal: backdrop with blur, click-outside and Escape to close -->
		<div
			bind:this={modalRef}
			tabindex="-1"
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm outline-none overflow-y-auto"
			role="dialog"
			aria-modal="true"
			aria-labelledby="popup-title"
			onclick={(e) => e.target === e.currentTarget && closeModal()}
			onkeydown={onBackdropKeydown}
		>
			<div class="relative flex max-h-[90vh] w-full max-w-4xl flex-col items-center justify-center overflow-hidden">
				<CouncilCardPopUp
					id="popup-title"
					name={selectedMember.name}
					position={selectedMember.position}
					email={selectedMember.email}
					positionDescription={selectedMember.positionDescription}
					yearProgram={selectedMember.yearProgram}
					image={selectedMember.image}
					onClose={closeModal}
				/>
			</div>
		</div>
	{/if}
</Section>
