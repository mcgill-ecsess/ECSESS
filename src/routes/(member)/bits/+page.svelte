<script lang="ts">
	import CouncilCardPopUp from 'components/council/CouncilCardPopUp.svelte';
	import Section from 'components/layout/Section.svelte';
	import CouncilCard from 'components/council/CouncilCard.svelte';
	import Link from 'components/Link.svelte';
	import type { CouncilMember } from '$lib/schemas';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import { bitsTeam } from '$lib/mockData/bits';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';

	let lead = $derived(bitsTeam.filter((member) => member.position.includes('Editor'))[0]);
	let members = $derived(bitsTeam.filter((member) => !member.position.includes('Editor')));

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
	title="Meet the ECSESS Bits team!"
	description="Meet the team behind the ECSESS Bits newsletter."
	canonical={page.url.href}
/>

<Section
	from="from-ecsess-black"
	to="to-ecsess-black"
	via="via-ecsess-800"
	direction="to-b"
	contentStart
>
	<div class="w-full max-w-360 px-4">
		<h1 class="page-title text-ecsess-50">Meet the ECSESS Bits Team</h1>

		{#if lead}
			<section class="mb-16 w-full">
				<div class="flex w-full items-center gap-4">
					<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
					<h2 class="text-ecsess-100 text-xl font-semibold tracking-wider uppercase">
						Editor-in-Chief
					</h2>
					<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
				</div>
				<div class="mt-4 flex justify-center">
					<CouncilCard
						name={lead.name}
						position={lead.position}
						image={lead.image}
						onViewProfile={() => handleViewProfile(lead)}
						featured
					/>
				</div>
			</section>
		{/if}

		<section class="mb-16 w-full">
			<div class="flex w-full items-center gap-4">
				<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
				<h2 class="text-ecsess-100 text-2xl font-semibold tracking-wider uppercase">Members</h2>
				<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
			</div>
			<div class="mt-8 flex flex-wrap justify-center gap-6">
				{#each members as member}
					<CouncilCard
						name={member.name}
						position={member.position}
						image={member.image}
						onViewProfile={() => handleViewProfile(member)}
					/>
				{/each}
			</div>
		</section>

		<section class="mt-4 mb-12 text-center">
			<p class="text-ecsess-200 text-lg sm:text-xl">
				Want to contribute to ECSESS Bits?
				<Link
					href="/join"
					class="text-ecsess-50 decoration-ecsess-300 hover:text-ecsess-100 hover:decoration-ecsess-200 font-semibold underline underline-offset-4 transition"
				>
					Join ECSESS!
				</Link>
			</p>
		</section>
	</div>

	{#if selectedMember}
		<div
			bind:this={modalRef}
			tabindex="-1"
			class="focus-visible:ring-ecsess-400 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-inset"
			role="dialog"
			aria-modal="true"
			aria-labelledby="popup-title"
			onclick={(e) => e.target === e.currentTarget && closeModal()}
			onkeydown={onBackdropKeydown}
		>
			<div
				class="relative my-auto flex w-full max-w-2xl flex-col items-center px-2 md:max-w-3xl md:px-4"
			>
				<CouncilCardPopUp
					id="popup-title"
					name={selectedMember.name}
					position={selectedMember.position}
					email={selectedMember.email}
					positionDescription={selectedMember.positionDescription}
					yearProgram={selectedMember.yearProgram}
					image={selectedMember.image}
					linkedin={selectedMember.linkedin}
					onClose={closeModal}
				/>
			</div>
		</div>
	{/if}
</Section>
