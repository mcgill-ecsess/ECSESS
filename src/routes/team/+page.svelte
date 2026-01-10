<script lang="ts">
    import SeoMetaTags from "components/layout/SeoMetaTags.svelte";
    import Section from "components/layout/Section.svelte";
	import TeamBanner from "components/team/TeamBanner.svelte";
	import Avatar from "components/team/Avatar.svelte";
	import type { DevTeam } from "$lib/schemas.js";
	import { dev } from "$app/environment";
    let {data} = $props();

    let devTeam: DevTeam[] = data.devTeam ?? []
    
    const sortData = (data: DevTeam[]): {current:DevTeam[], past:DevTeam[] } =>{
        let current:DevTeam[] = [];
        let past:DevTeam[] = [];
        data.forEach(member => {
            if (member.role){
                current.push(member)
            }else{
                past.push(member)
            }
        });
        return {
            current:current,
            past:past
        }
    }

    let sortedData = sortData(devTeam)
    let current = sortedData.current;
    let past = sortedData.past;

</script>


<SeoMetaTags/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
    <div class="w-full h-full flex flex-col items-center">
        <p class="page-title">Meet the team!</p>
        <h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Our Current Team</h1>

        <div class="flex flex-col py-40 space-y-50 items-center w-full">
            {#each current as member,idx }
            <TeamBanner 
            idx={idx}
            name={member.name}
            role={member.role}
            year={member.yearProgram}
            src={member.image}
            funFact={member.funFact}
            github={member.github}
            email={member.email}
             />
            {/each}
        </div>

        <h1 class="border-b-ecsess-300 w-full border-b-2 lg:w-1/2">Past Contributors</h1>
        <div class="flex p-10 w-full justify-evenly flex-wrap space-y-5">
        
            {#each past as contr }
                <Avatar
                name={contr.name}
                role=""
                src={contr.image}
                />
            {/each} 
        </div>   
    </div>
</Section>
