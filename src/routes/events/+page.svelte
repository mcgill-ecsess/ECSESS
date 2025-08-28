<script lang="ts">
	import Section from 'components/Section.svelte';
	import EventBlock from 'components/EventBlock.svelte';
	import type { EventPost } from '$lib/schemas';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
    import EventTabControl from 'components/EventTabControl.svelte';

	let { data } = $props();
	console.log(data);

	let events: EventPost[] = [];
	data.events.forEach((event: EventPost) => {
		events.push(event);
	});
	let group = $state('allEvents');
</script>

<title> ECSESS Events </title>
<Section>
	<p class="page-title">Events</p>
	<Tabs value={group} onValueChange={(e) => (group = e.value)} listClasses="flex-wrap">
		{#snippet list()}
			<EventTabControl value="allEvents">All Events</EventTabControl>
            <EventTabControl value="academic">Academic</EventTabControl>
            <EventTabControl value="professional">Professional</EventTabControl>
			<EventTabControl value="social">Social</EventTabControl>
			<Tabs.Control
				value="technical"
				classes="hover:border-b-ecsess-200 border-b-4 transition-all ease-in-out pb-2 text-lg  active:border-b-ecsess-600"
				stateActive="border-b-ecsess-400"
				>Technical
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
						{#if Array.isArray(e.category) ? e.category.includes('academic') : e.category === 'academic'}
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
						{#if Array.isArray(e.category) ? e.category.includes('professional') : e.category === 'professional'}
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
						{#if Array.isArray(e.category) ? e.category.includes('social') : e.category === 'social'}
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
						{#if Array.isArray(e.category) ? e.category.includes('technical') : e.category === 'technical'}
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
