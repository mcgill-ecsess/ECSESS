<script lang="ts">
	import CouncilCardPopUp from 'components/council/CouncilCardPopUp.svelte';
	import Section from 'components/layout/Section.svelte';
	import CouncilCard from 'components/council/CouncilCard.svelte';
	import Link from 'components/Link.svelte';
	import type { CouncilMember } from '$lib/schemas';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';

	let { data } = $props();

	const years = ['U4', 'U3', 'U2', 'U1', 'U0'];

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

	function getYearFromPosition(position: string): string | undefined {
		const match = position.match(/\b(U[0-4])\b/);
		return match?.[1];
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

<Section
	from="from-primary-background"
	to="to-primary-background"
	via="via-primary-soft"
	direction="to-b"
	contentStart
>
	<div class="w-full max-w-360 px-4">
		<!-- Hero -->
		<h1 class="page-title text-primary-content">Meet the ECSESS Council</h1>

		<figure class="ring-primary mb-20 overflow-hidden rounded-2xl shadow-2xl ring-2">
			<img
				src={data.councilGoofyPic.url}
				alt="ECSESS Council having fun"
				class="w-full object-cover"
			/>
		</figure>

		<!-- President -->
		{#if president}
			<section class="mb-16 w-full">
				<div class="flex w-full items-center gap-4">
					<div class="bg-muted h-0.5 flex-1" aria-hidden="true"></div>
					<h2 class="text-base-content text-xl font-semibold tracking-wider uppercase">
						President
					</h2>
					<div class="bg-muted h-0.5 flex-1" aria-hidden="true"></div>
				</div>
				<div class="mt-4 flex justify-center">
					<CouncilCard
						name={president.name}
						position={president.position}
						image={president.image}
						onViewProfile={() => handleViewProfile(president)}
						featured
					/>
				</div>
			</section>
		{/if}

		<!-- Vice Presidents -->
		<section class="mb-16 w-full">
			<div class="flex w-full items-center gap-4">
				<div class="bg-muted h-0.5 flex-1" aria-hidden="true"></div>
				<h2 class="text-base-content text-2xl font-semibold tracking-wider uppercase">
					Vice Presidents
				</h2>
				<div class="bg-muted h-0.5 flex-1" aria-hidden="true"></div>
			</div>
			<div class="mt-8 flex flex-wrap justify-center gap-6">
				{#each vps as vp}
					<CouncilCard
						name={vp.name}
						position={vp.position}
						image={vp.image}
						onViewProfile={() => handleViewProfile(vp)}
					/>
				{/each}
			</div>
		</section>

		<!-- Year Representatives -->
		<section class="mb-16 w-full">
			<div class="flex w-full items-center gap-4">
				<div class="bg-muted h-0.5 flex-1" aria-hidden="true"></div>
				<h2 class="text-base-content text-2xl font-semibold tracking-wider uppercase">
					Year Representatives
				</h2>
				<div class="bg-muted h-0.5 flex-1" aria-hidden="true"></div>
			</div>
			<div class="mt-8 flex flex-wrap justify-center gap-6">
				{#each ureps as urep}
					<CouncilCard
						name={urep.name}
						position={urep.position}
						image={urep.image}
						onViewProfile={() => handleViewProfile(urep)}
						tag={getYearFromPosition(urep.position)}
					/>
				{/each}
			</div>
		</section>

		<!-- Join CTA at bottom -->
		<section class="mt-4 mb-12 text-center">
			<p class="text-base-content text-xl">
				Curious to be involved with the Council?
				<Link
					href="/join"
					class="text-primary-content decoration-muted hover:text-base-content hover:decoration-base-content focus-visible:ring-muted focus-visible:ring-offset-base rounded-sm font-semibold underline underline-offset-4 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
			class="focus-visible:ring-muted fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-inset"
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
