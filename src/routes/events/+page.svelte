<script lang="ts">
	import type { EventPost } from '$lib/schemas';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import EventTabControl from 'components/event/EventTabControl.svelte';
	import EventTabPanel from 'components/event/EventTabPanel.svelte';

	let { data } = $props();

	let events = $derived(data.events ?? []);//Use $derived() instead of direct assignment
	let group = $state('allEvents');
</script>

<SeoMetaTags
	title="Events by ECSESS"
	description="Checkout our events! ECSESS organizes academic events, professional & social networkings, technical workshops, and more!"
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-600" direction="to-b">
	<p class="page-title">Events</p>
	<Tabs
		value={group}
		onValueChange={(e) => (group = e.value)}
		listClasses="flex-wrap place-content-center"
	>
		{#snippet list()}
			<EventTabControl value="allEvents">All Events</EventTabControl>
			<EventTabControl value="academic">Academic</EventTabControl>
			<EventTabControl value="professional">Professional</EventTabControl>
			<EventTabControl value="social">Social</EventTabControl>
			<EventTabControl value="technical">Technical</EventTabControl>
		{/snippet}

		{#snippet content()}
			<EventTabPanel value="allEvents" category="allEvents" {events} />
			<EventTabPanel value="academic" category="academic" {events} />
			<EventTabPanel value="professional" category="professional" {events} />
			<EventTabPanel value="social" category="social" {events} />
			<EventTabPanel value="technical" category="technical" {events} />
		{/snippet}
	</Tabs>
</Section>
