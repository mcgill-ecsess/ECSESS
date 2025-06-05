<script>
    import Section from "components/Section.svelte";
    let {data} = $props();    
</script>

<title> ECSESS Events </title>

<Section>
    <p class='page-title'>Events</p>
    {#each data.events as event}
    <div class="p-4 border-4 rounded-lg">
        <p>{event.name}</p>
        <p>{event.date}</p>
        <p>{event.location}</p>
        <p>{event.description}</p>
    </div>

    {/each}
</Section>
