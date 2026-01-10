<script>
    import SeoMetaTags from "components/layout/SeoMetaTags.svelte";
    import Section from "components/layout/Section.svelte";
	import TeamBanner from "components/team/TeamBanner.svelte";
	import Avatar from "components/team/Avatar.svelte";
    let {data} = $props();
</script>


<SeoMetaTags/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
    <div class="w-full h-full flex flex-col items-center">
        <p class="page-title">Meet the team!</p>
        <h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Our Current Team</h1>

        <div class="flex flex-col py-40 space-y-50 items-center">
            {#each data.devTeam as member,idx }
            <TeamBanner 
            idx={idx}
            name={member.name}
            role={member.role}
            src={member.image}
            funFact={member.funFact}

             />
            {/each}
        </div>

        <h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Past Contributors</h1>
        <div class="flex p-10 w-full justify-evenly flex-wrap space-y-5">
            <Avatar
         name={data.devTeam[0].name}
        role=""
        src={data.devTeam[0].image}
        />
        <Avatar
         name={data.devTeam[0].name}
        role=""
        src={data.devTeam[0].image}
        />
        <Avatar
         name={data.devTeam[0].name}
        role=""
        src={data.devTeam[0].image}
        />
        <Avatar
         name={data.devTeam[0].name}
        role=""
        src={data.devTeam[0].image}
        />
        </div>
        
    </div>
</Section>
