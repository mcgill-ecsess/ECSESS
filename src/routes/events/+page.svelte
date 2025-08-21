<script lang="ts">
	import Section from 'components/Section.svelte';
	import EventBlock from "components/EventBlock.svelte"
	import type { EventPost } from '../../lib/schemas';
	import { Tabs, TabItem } from "flowbite-svelte";
	// import Tabs from "components/Tabs.svelte"
	
	let { data } = $props();
	console.log(data)

	let events: EventPost[] = []
	data.events.forEach((event: EventPost) => {
		events.push(event)
	})
	console.log(events)
</script>

<title> ECSESS Events </title>
<Section>
	<p class="page-title">Events</p>
    <Tabs>
        <TabItem open title="All">
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
        </TabItem>
        <TabItem title="Academic">
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
        </TabItem>
        <TabItem title="Professional">
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
        </TabItem>
        <TabItem title="Social">
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
        </TabItem>
        <TabItem title="Technical">
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
        </TabItem>
    </Tabs>
</Section>
