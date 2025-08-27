<script lang="ts">
	import Section from 'components/Section.svelte';
	import EventBlock from "components/EventBlock.svelte"
	import type { EventPost } from '../../lib/schemas';
    import { Tabs } from '@skeletonlabs/skeleton-svelte';
	// import Tabs from "components/Tabs.svelte"
	
	let { data } = $props();
	console.log(data)

	let events: EventPost[] = []
	data.events.forEach((event: EventPost) => {
		events.push(event)
	})
    let group = $state('allEvents');
</script>

<title> ECSESS Events </title>
<Section>
	<p class="page-title">Events</p>
    <Tabs value={group} onValueChange={(e) => (group = e.value)} fluid>
        {#snippet list()}
            <Tabs.Control value="allEvents">
            All Events
            </Tabs.Control>
            <Tabs.Control value="academic">
            Academic
            </Tabs.Control>
            <Tabs.Control value="professional">
            Professional
            </Tabs.Control>
            <Tabs.Control value="social">
            Social
            </Tabs.Control>
            <Tabs.Control value="technical">
            Technical
            </Tabs.Control>
        {/snippet}
        {#snippet content()}
            <Tabs.Panel value="allEvents">
                <div class="event">
                {#each events as e}
                <EventBlock
                    eventTitle={e.name} 
                    date={e.date}
                    location={e.location}
                    eventDescription={e.description}
                    thumbnail={e.thumbnail}
                    registrationLink={e.reglink}
                    paymentLink={e.paylink}
                    eventCategory={e.category}
                ></EventBlock>
                {/each}
            </div>
            </Tabs.Panel>
            <Tabs.Panel value="academic">
            <div class="event">
                {#each events as e}
                {#if Array.isArray(e.category) 
                    ? e.category.includes("academic") 
                    : e.category === "academic"}
                    <EventBlock
                        eventTitle={e.name} 
                        date={e.date}
                        location={e.location}
                        eventDescription={e.description}
                        thumbnail={e.thumbnail}
                        registrationLink={e.reglink}
                        paymentLink={e.paylink}
                        eventCategory={e.category}
                    ></EventBlock>
                {/if}
                {/each}
            </div>
            </Tabs.Panel>
            <Tabs.Panel value="professional">
            <div class="event">
                {#each events as e}
                {#if Array.isArray(e.category) 
                    ? e.category.includes("professional") 
                    : e.category === "professional"}
                    <EventBlock
                        eventTitle={e.name} 
                        date={e.date}
                        location={e.location}
                        eventDescription={e.description}
                        thumbnail={e.thumbnail}
                        registrationLink={e.reglink}
                        paymentLink={e.paylink}
                        eventCategory={e.category}
                    ></EventBlock>
                {/if}
                {/each}
            </div>
            </Tabs.Panel>
            <Tabs.Panel value="social">
            <div class="event">
                {#each events as e}
                {#if Array.isArray(e.category) 
                    ? e.category.includes("social") 
                    : e.category === "social"}
                    <EventBlock
                        eventTitle={e.name} 
                        date={e.date}
                        location={e.location}
                        eventDescription={e.description}
                        thumbnail={e.thumbnail}
                        registrationLink={e.reglink}
                        paymentLink={e.paylink}
                        eventCategory={e.category}
                    ></EventBlock>
                {/if}
                {/each}
            </div>
            </Tabs.Panel>
            <Tabs.Panel value="technical">
                <div class="event">
                {#each events as e}
                {#if Array.isArray(e.category) 
                    ? e.category.includes("technical") 
                    : e.category === "technical"}
                    <EventBlock
                        eventTitle={e.name} 
                        date={e.date}
                        location={e.location}
                        eventDescription={e.description}
                        thumbnail={e.thumbnail}
                        registrationLink={e.reglink}
                        paymentLink={e.paylink}
                        eventCategory={e.category}
                    ></EventBlock>
                {/if}
                {/each}
            </div>
            </Tabs.Panel>
        {/snippet}
    </Tabs>
</Section>
