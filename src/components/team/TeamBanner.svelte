<script lang="ts">
	import { Github, Mail} from "@lucide/svelte";
	import Button from "components/Button.svelte";
import Avatar from "components/team/Avatar.svelte";

let {idx, src, name, year, role,funFact,github,email}:
{
    idx:number,
    src:string,
    name:string,
    year:string,
    role:string,
    funFact:string,
    github:string,
    email:string
}
= $props();

</script>

<div class="fadeup relative flex flex-col rounded-2xl md:flex-row {idx%2==0? "md:-translate-x-1/12":"md:translate-x-1/12"} p-5 w-5/6 max-w-4xl min-w-xs items-center bg-radial from-ecsess-800 from-40% to-ecsess-950 to-90%"> 
    <!--Icon Box-->
   <div class="absolute top-0 right-0 left-0 flex items-start gap-2 p-4">
        {#if role}
            <span
                class="bg-ecsess-800 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-gray-300 uppercase backdrop-blur-sm"
            >
                {role}
            </span>
        {/if}
        
        {#if year}
        <span
            class="bg-ecsess-800 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider text-gray-300 uppercase backdrop-blur-sm"
        >
            {year}
        </span>
        {/if}
    </div>
    <!-- Avatar box -->
    <Avatar src={src} name={name} role={role}/>
    <!--Content box-->
    <div class="flex-1 flex flex-col items-start p-5">
        <h1 class="border-b-2 border-ecsess-300 p-5" >{name}</h1>
        <h2>Fun Fact:</h2>
        <div>{funFact}</div>
        <!--GitHub/Maybe other link in the future-->
        <h2>Contact:</h2>

        <div class="py-2 space-x-3">
            {#if github}
            <Button
            onclick={() => window.open(github, '_blank')}
            >
                <Github/>
            </Button>
            {/if}

            {#if email}
            <Button
            onclick={() => window.open(`mailto:${email}`, '_blank')}
            >
                <Mail/>
            </Button>
            {/if}
        </div>
        
        
    </div>
</div>

<style>
    .fadeup{
        animation:fadeUp both;
        animation-timeline: view();
        animation-range: entry 25% cover 40%;
    }

    @keyframes fadeUp{
        from{
            opacity: 0;
            transform: translateY(20px) scale(0.5);
        }
        to{
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
</style>

