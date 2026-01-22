<script lang="ts">
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Section from 'components/layout/Section.svelte';
	import TeamBanner from 'components/team/TeamBanner.svelte';
	import Avatar from 'components/team/Avatar.svelte';
	import type { DevTeam } from '$lib/schemas.js';
	import PastCont from 'components/team/PastCont.svelte';

	let { data } = $props();

	let devTeam: DevTeam[] = data.devTeam ?? [];

	const sortData = (data: DevTeam[]): { current: DevTeam[]; past: DevTeam[] } => {
		let current: DevTeam[] = [];
		let past: DevTeam[] = [];
		data.forEach((member) => {
			if (member.active) {
				current.push(member);
			} else {
				past.push(member);
			}
		});
		return {
			current: current,
			past: past
		};
	};

	let sortedData = sortData(devTeam);
	let current = sortedData.current;
	let past = sortedData.past;
</script>

<SeoMetaTags />

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="relative flex h-full w-full flex-col items-center">
		<!-- Hero -->
		<div class="mb-20 flex flex-col items-center text-center">
			<div class="relative">
				<h1
					class="via-ecsess-200 to-ecsess-400 bg-gradient-to-r from-white bg-clip-text text-5xl font-black tracking-tighter text-transparent drop-shadow-[0_0_30px_rgba(90,139,90,0.3)] md:text-7xl lg:text-8xl"
				>
					Developer Team
				</h1>
				<div class="bg-ecsess-500/10 absolute -inset-1 animate-pulse rounded-lg blur-xl"></div>
			</div>
			<p class="text-ecsess-200/80 mt-6 text-lg">Meet the builder of ECSESS Website</p>
		</div>

		<!-- Git Flow Timeline -->
		<div class="relative w-full max-w-7xl px-4 py-20">
			<!-- The Git Line (Background) -->
			<div
				class="from-ecsess-500/0 via-ecsess-400/20 to-ecsess-500/0 absolute top-0 bottom-0 left-1/2 z-0 hidden w-[1px] -translate-x-1/2 bg-gradient-to-b shadow-[0_0_10px_rgba(90,139,90,0.2)] md:block"
			></div>

			<div class="relative z-10 grid w-full grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
				{#each current as member, idx}
					{#if idx % 2 !== 0}
						<!-- Spacer (Left side for Odd items) -->
						<div class="hidden md:block"></div>
					{/if}

					<div
						class="group relative flex w-full justify-center {idx % 2 === 0
							? 'md:justify-end'
							: 'md:justify-start'}"
					>
						<!-- Timeline Node -->
						<div
							class="border-ecsess-400 bg-ecsess-950 group-hover:bg-ecsess-500 absolute top-1/2 z-20 hidden size-4 -translate-y-1/2 rounded-full border-2 shadow-[0_0_10px_rgba(90,139,90,0.5)] transition-all duration-300
                            group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(90,139,90,0.8)] md:block
                            {idx % 2 === 0
								? '-right-6 translate-x-1/2'
								: '-left-6 -translate-x-1/2'}"
						></div>
						<TeamBanner
							{idx}
							name={member.name}
							role={member.role}
							year={member.yearProgram}
							src={member.image}
							funFact={member.funFact}
							github={member.github}
							email={member.email}
						/>
					</div>

					{#if idx % 2 === 0}
						<!-- Spacer (Right side for Even items) -->
						<div class="hidden md:block"></div>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Legacy Branches -->
		<h1 class="border-b-ecsess-300 mt-20 w-full border-b-2 lg:w-1/2">Legacy Branches</h1>
		<div class="grid w-full grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each past as contr}
				<PastCont name={contr.name} role={contr.role} start={contr.start} end={contr.end} />
			{/each}
		</div>
	</div>
</Section>
