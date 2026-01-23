<script lang="ts">
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Section from 'components/layout/Section.svelte';
	import TeamBanner from 'components/team/TeamBanner.svelte';
	import Avatar from 'components/team/Avatar.svelte';
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
		sortedTeam.reduce<{ group: string; members: DevTeam[] }[]>((acc, member) => {
			const group = getGroup(member);
			const last = acc[acc.length - 1];
			if (last && last.group === group) {
				last.members.push(member);
			} else {
				acc.push({ group, members: [member] });
			}
			return acc;
		}, [])
	);
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
			<div class="flex w-full flex-col gap-12">
				{#each groupedTeam as { group, members }}
					<!-- GROUP SECTION -->
					<div class="flex flex-col">
						<!-- MARKER -->
						<div class="relative z-10 flex w-full justify-center pb-12">
							<div
								class="bg-ecsess-950 border-ecsess-500 text-ecsess-200 relative z-20 rounded-full border-2 px-6 py-2 text-xl font-bold shadow-[0_0_20px_rgba(90,139,90,0.4)]"
							>
								{group}
							</div>
						</div>

						<!-- GROUP ITEMS WITH LINE -->
						<div class="relative flex flex-col gap-0 md:gap-12">
							<!-- The Git Line (Segments) -->
							<div
								class="from-ecsess-500/0 via-ecsess-500/40 to-ecsess-500/0 absolute top-0 bottom-0 left-1/2 z-0 block w-[2px] -translate-x-1/2 bg-gradient-to-b"
							></div>

							{#each members as member, idx}
								<div
									class="group relative flex w-full items-stretch {idx % 2 === 0
										? 'md:flex-row'
										: 'md:flex-row-reverse'}"
								>
									<!-- CARD SIDE -->
									<div class="w-full pb-12 md:w-[45%] md:pb-0">
										<TeamBanner
											name={member.name}
											role={member.role}
											year={member.yearProgram}
											src={member.image}
											funFact={member.funFact}
											github={member.github}
											email={member.email}
										/>
									</div>

									<!-- CONNECTOR AREA -->
									<div class="relative hidden w-[10%] justify-center md:flex">
										<!-- The Node (Circle) -->
										<div
											class="bg-ecsess-950 border-ecsess-500 group-hover:bg-ecsess-100 absolute top-1/2 z-20 size-4 -translate-y-1/2 rounded-full border-2 transition-transform duration-300 group-hover:scale-150"
											style=""
										></div>
									</div>

									<!-- EMPTY SIDE -->
									<div
										class="hidden w-[45%] flex-col md:flex {idx % 2 == 0
											? 'items-start'
											: 'items-end'} justify-center"
									>
										<Avatar src={member.image} name={member.name} role={member.role} />
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Section>
