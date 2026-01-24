<script lang="ts">
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Section from 'components/layout/Section.svelte';
	import GitTimeline from 'components/team/GitTimeline.svelte';
	import Link from 'components/Link.svelte';
	import type { DevTeam } from '$lib/schemas.js';

	let { data } = $props();

	let devTeam = $derived(data.devTeam ?? []);

	// Sort by Active (Current) first, then by start date (newest/latest first)
	let sortedTeam = $derived(
		[...devTeam].sort((a, b) => {
			if (a.active && !b.active) return -1;
			if (!a.active && b.active) return 1;

			const dateA = new Date(a.start).getTime();
			const dateB = new Date(b.start).getTime();
			return dateB - dateA;
		})
	);

	function getGroup(member: DevTeam) {
		return member.active ? 'Current' : new Date(member.start).getFullYear().toString();
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

<SeoMetaTags />

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="relative flex h-full w-full flex-col items-center">
		<!-- Hero -->
		<div class="my-8">
			<span class="page-title"> git log --dev-team </span>
			<p class="text-ecsess-300 mt-6 font-mono text-lg">
				Want to build the future of ECSESS? <br />
				<Link href="https://github.com/mcgill-ecsess/ECSESS" external>
					<span
						class="text-ecsess-400 decoration-ecsess-500 hover:text-ecsess-300 hover:decoration-ecsess-400 font-semibold underline decoration-2 underline-offset-4 transition-all"
					>
						Contribute on GitHub →
					</span>
				</Link>
			</p>
		</div>

		<!-- Git Tree History -->
		<div class="relative w-full max-w-6xl px-4">
			<div class="relative mx-auto max-w-fit">
				<!-- Main vertical timeline connector -->
				<div class="bg-ecsess-600 absolute top-0 bottom-0 left-[6px] w-px"></div>

				<!-- Cohort Branches -->
				<div class="space-y-16">
					{#each groupedTeam as { group, members, active }}
						<div class="relative">
							<GitTimeline year={group} {members} {active} />
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Legend -->
		<div
			class="bg-ecsess-900 mt-20 flex flex-wrap items-center justify-center gap-8 rounded-lg px-10 py-5 text-lg"
		>
			<div class="flex items-center gap-3">
				<div class="bg-ecsess-300 size-3 rounded-full"></div>
				<span class="text-ecsess-200">Active</span>
			</div>
			<div class="flex items-center gap-3">
				<div class="bg-ecsess-500 size-3 rounded-full"></div>
				<span class="text-ecsess-300">Past</span>
			</div>
		</div>
	</div>
</Section>
