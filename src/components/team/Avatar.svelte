<script lang="ts">
let {name, src, role=""}:{
    name:string,
    src:string,
    role:string
}= $props();

let array = $derived(
    role? [...Array(3)].map(_ => [...role].concat("*")).flat(): []
);

</script>


<div class="relative size-48 {role?"m-20" : ""}">
    <img 
    class="size-full rounded-full object-cover border-4 border-ecsess-200 "
    src={src} alt={name}>
    {#if role}
        {#each array as char, index}    
            <p
            class="char absolute inset-24 size-3 text-xs z-10"
            style="transform: translate(-50%, -50%) rotate({360 / array.length * index}deg) translateY(-108px);"
            >{char}</p>
        {/each}
    {/if}
</div>