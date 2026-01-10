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


<div class="relative {role? "size-58": "size-48"} rounded-full">
    <img 
    class="size-full rounded-full object-cover {role ? "border-20 border-ecsess-900": ""}"
    src={src} alt={name}>
    {#if role}
        {#each array as char, index}    
            <p
            class="char absolute inset-29 size-3 text-xs z-10"
            style="transform: translate(-50%, -50%) rotate({360 / array.length * index}deg) translateY(-108px);"
            >{char}</p>
        {/each}
    {/if}
</div>