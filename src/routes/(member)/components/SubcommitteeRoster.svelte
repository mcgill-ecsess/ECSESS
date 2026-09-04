<script lang="ts">
	import CouncilCard from '../council/components/CouncilCard.svelte';
	import CouncilCardPopUp from '../council/components/CouncilCardPopUp.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import type { CouncilMember, SubcommitteeMember } from '$lib/schemas';
	import { isSubcommitteeLead, subcommitteeToCouncilMember } from '$lib/subcommittee';
	import { onMount, tick } from 'svelte';

	let {
		title,
		description = '',
		members = []
	}: {
		title: string;
		description?: string;
		members?: SubcommitteeMember[];
	} = $props();

	let leads = $derived(members.filter(isSubcommitteeLead).map(subcommitteeToCouncilMember));
	let rest = $derived(
		members.filter((m) => !isSubcommitteeLead(m)).map(subcommitteeToCouncilMember)
	);
	let hasMembers = $derived(members.length > 0);

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

<div class="w-full max-w-7xl" id="SubcommitteeRoster" data-component="SubcommitteeRoster">
	<PageHeader {title} {description} />

	{#if !hasMembers}
		<p class="text-ecsess-300 mx-auto max-w-2xl text-center text-base leading-relaxed md:text-lg">
			Member listings are coming soon. Check back later for updates.
		</p>
	{:else}
		{#if leads.length > 0}
			<section class="mb-16 w-full">
				<div class="flex w-full items-center gap-4">
					<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
					<h2 class="text-ecsess-50 text-xl font-semibold tracking-wider uppercase">Leadership</h2>
					<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
				</div>
				<div class="mt-8 flex flex-wrap justify-center gap-6">
					{#each leads as lead (lead._id ?? lead.name)}
						<CouncilCard
							name={lead.name}
							position={lead.position}
							image={lead.image}
							onViewProfile={() => handleViewProfile(lead)}
							featured
						/>
					{/each}
				</div>
			</section>
		{/if}

		{#if rest.length > 0}
			<section class="mb-16 w-full">
				<div class="flex w-full items-center gap-4">
					<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
					<h2 class="text-ecsess-50 text-2xl font-semibold tracking-wider uppercase">Members</h2>
					<div class="bg-ecsess-300 h-0.5 flex-1" aria-hidden="true"></div>
				</div>
				<div class="mt-8 flex flex-wrap justify-center gap-6">
					{#each rest as member (member._id ?? member.name)}
						<CouncilCard
							name={member.name}
							position={member.position}
							image={member.image}
							onViewProfile={() => handleViewProfile(member)}
						/>
					{/each}
				</div>
			</section>
		{/if}
	{/if}
</div>

{#if selectedMember}
	<div
		bind:this={modalRef}
		tabindex="-1"
		class="focus-visible:ring-ecsess-400 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-inset"
		role="dialog"
		aria-modal="true"
		aria-labelledby="subcommittee-popup-title"
		onclick={(e) => e.target === e.currentTarget && closeModal()}
		onkeydown={onBackdropKeydown}
	>
		<div
			class="relative my-auto flex w-full max-w-2xl flex-col items-center px-2 md:max-w-3xl md:px-4"
		>
			<CouncilCardPopUp
				id="subcommittee-popup-title"
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
