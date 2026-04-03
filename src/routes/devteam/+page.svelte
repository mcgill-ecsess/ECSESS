<script lang="ts">
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Section from 'components/layout/Section.svelte';
	import ContribTimeline from 'components/team/ContribTimeline.svelte';
	import Link from 'components/Link.svelte';
	import type { DevTeam } from '$lib/schemas.js';
	import { GitBranch, Github, Users } from '@lucide/svelte';

	let { data } = $props();

	let devTeam = $derived(data.devTeam ?? []);

	// Extract the starting year from a term string "xxxx-xxxx"
	function termYear(term: string): number {
		return parseInt(term.split('-')[0], 10);
	}

	// Sort by Active (Current) first, then by term year (newest/latest first)
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

	let totalContributors = $derived(devTeam.length);
	let totalCohorts = $derived(groupedTeam.length);
</script>

<SeoMetaTags />

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="relative flex h-full w-full flex-col items-center">

		<!-- Hero -->
		<div class="relative w-full max-w-4xl px-4 py-16 text-center">
			<!-- Decorative code line above title -->
			<div class="mb-4 flex items-center justify-center gap-2">
				<GitBranch class="text-ecsess-500 size-4" />
				<span class="text-ecsess-600 font-mono text-sm tracking-widest">mcgill-ecsess / ECSESS</span>
			</div>

			<h1 class="page-title text-ecsess-100 mb-0 font-mono">
				<span class="text-ecsess-500">$</span> git log --dev-team
			</h1>

			<p class="text-ecsess-300 mx-auto mt-4 max-w-xl text-base leading-relaxed">
				Meet the contributors who built and maintain the ECSESS platform,
				organized by contribution year.
			</p>

			<!-- Stats row -->
			<div class="mt-8 flex flex-wrap items-center justify-center gap-6">
				<div class="bg-ecsess-900/60 border-ecsess-700/40 flex items-center gap-2.5 rounded-xl border px-5 py-3">
					<Users class="text-ecsess-400 size-4" />
					<span class="text-ecsess-300 font-mono text-sm">
						<span class="text-ecsess-100 text-lg font-bold">{totalContributors}</span>
						&nbsp;contributors
					</span>
				</div>
				<div class="bg-ecsess-900/60 border-ecsess-700/40 flex items-center gap-2.5 rounded-xl border px-5 py-3">
					<GitBranch class="text-ecsess-400 size-4" />
					<span class="text-ecsess-300 font-mono text-sm">
						<span class="text-ecsess-100 text-lg font-bold">{totalCohorts}</span>
						&nbsp;cohorts
					</span>
				</div>
				<Link href="https://github.com/mcgill-ecsess/ECSESS" external>
					<div class="bg-ecsess-800/60 border-ecsess-600/50 hover:border-ecsess-400/60 hover:bg-ecsess-700/60 flex items-center gap-2.5 rounded-xl border px-5 py-3 transition-all">
						<Github class="text-ecsess-300 size-4" />
						<span class="text-ecsess-200 font-mono text-sm font-semibold">Contribute on GitHub</span>
					</div>
				</Link>
			</div>
		</div>

		<!-- Timeline -->
		<div class="relative w-full max-w-5xl px-4 pb-24">
			<!-- Terminal header bar -->
			<div class="bg-ecsess-900 border-ecsess-700/40 mb-0 flex items-center gap-2 rounded-t-xl border border-b-0 px-4 py-3">
				<span class="size-3 rounded-full bg-red-500/70"></span>
				<span class="size-3 rounded-full bg-yellow-500/70"></span>
				<span class="size-3 rounded-full bg-green-500/70"></span>
				<span class="text-ecsess-600 ml-3 font-mono text-xs">git log --all --graph --format="%an — %s"</span>
			</div>

			<!-- Timeline body -->
			<div class="bg-ecsess-950/50 border-ecsess-700/40 rounded-b-xl border px-6 pt-8">
				{#each groupedTeam as { group, members, active }, i}
					<ContribTimeline term={group} {members} {active} isLast={i === groupedTeam.length - 1} />
				{/each}
			</div>
		</div>

	</div>
</Section>
