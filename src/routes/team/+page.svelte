<script>
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Section from 'components/layout/Section.svelte';
	import TeamBanner from 'components/team/TeamBanner.svelte';
	import Avatar from 'components/team/Avatar.svelte';
	let { data } = $props();
</script>

<SeoMetaTags />

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<div class="flex h-full w-full flex-col items-center">
		<p class="page-title">Meet the team!</p>
		<h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Our Current Team</h1>

		<div class="flex flex-col items-center space-y-50 py-40">
			{#each data.devTeam as member, idx}
				<TeamBanner
					{idx}
					name={member.name}
					role={member.role}
					src={member.image}
					funFact={member.funFact}
				/>
			{/each}
		</div>

		<h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Past Contributors</h1>
		<div class="flex w-full flex-wrap justify-evenly space-y-5 p-10">
			<Avatar name={data.devTeam[0].name} role="" src={data.devTeam[0].image} />
			<Avatar name={data.devTeam[0].name} role="" src={data.devTeam[0].image} />
			<Avatar name={data.devTeam[0].name} role="" src={data.devTeam[0].image} />
			<Avatar name={data.devTeam[0].name} role="" src={data.devTeam[0].image} />
		</div>
	</div>
</Section>
