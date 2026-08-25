<script lang="ts">
	import SeoMetaTags from '$lib/components/layout/SeoMetaTags.svelte';
	import Section from '$lib/components/layout/Section.svelte';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ContribTimeline from './components/ContribTimeline.svelte';
	import Link from '$lib/components/Link.svelte';
	import type { DevTeam } from '$lib/schemas';

	let { data } = $props();

	let devTeam = $derived(data.devTeam ?? []);

	function termYear(term: string): number {
		return parseInt(term.split('-')[0], 10);
	}

	let sortedTeam = $derived(
		[...devTeam].sort((a, b) => {
			if (a.active && !b.active) return -1;
			if (!a.active && b.active) return 1;
			return termYear(b.term) - termYear(a.term);
		})
	);

	function getGroup(member: DevTeam) {
		return member.active ? 'Active team' : member.term;
	}

	let groupedTeam = $derived(
		sortedTeam.reduce<{ group: string; members: DevTeam[]; active: boolean }[]>((acc, member) => {
			const group = getGroup(member);
			const last = acc[acc.length - 1];
			if (last && last.group === group) {
				last.members.push(member);
			} else {
				acc.push({ group, members: [member], active: member.active });
			}
			return acc;
		}, [])
	);
</script>

<SeoMetaTags
	title="ECSESS Dev Team"
	description="Meet the developers building the ECSESS website and digital tools."
	canonical={data.canonical}
/>

<Section
	from="from-ecsess-black"
	to="to-ecsess-black"
	via="via-ecsess-800"
	direction="to-b"
	contentStart={true}
>
	<PageHeader title="Dev Team" description="git log --dev-team" class="text-center" />

	<p class="text-ecsess-300 mx-auto mb-8 max-w-2xl text-center font-mono text-lg">
		Want to build the future of ECSESS?
		<Link href="https://github.com/mcgill-ecsess/ECSESS" external>
			<span
				class="text-ecsess-400 decoration-ecsess-500 hover:text-ecsess-300 hover:decoration-ecsess-400 font-semibold underline decoration-2 underline-offset-4 transition-all"
			>
				Contribute on GitHub →
			</span>
		</Link>
	</p>

	<div class="relative w-full max-w-6xl px-4 pb-16">
		<div class="relative mx-auto max-w-fit space-y-16">
			{#each groupedTeam as { group, members, active }}
				<ContribTimeline term={group} {members} {active} />
			{/each}
		</div>
	</div>
</Section>
