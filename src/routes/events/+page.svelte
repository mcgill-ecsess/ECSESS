<script lang="ts">
	import type { EventPost } from '$lib/schemas';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import Section from 'components/layout/Section.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import EventTabsTrigger from 'components/event/EventTabsTrigger.svelte';
	import EventTabsContent from 'components/event/EventTabsContent.svelte';

	let { data } = $props();

	let events: EventPost[] = data.events ?? [];
	let group = $state('allEvents');
</script>

<SeoMetaTags
	title="Events by ECSESS"
	description="Checkout our events! ECSESS organizes academic events, professional & social networkings, technical workshops, and more!"
	canonical={data.canonical}
/>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-600" direction="to-b">
	<p class="page-title">Events</p>

	<Tabs value={group} onValueChange={(e) => (group = e.value)} composite={true}>
		<Tabs.List>
			<EventTabsTrigger value="allEvents">All Events</EventTabsTrigger>
			<EventTabsTrigger value="academic">Academic</EventTabsTrigger>
			<EventTabsTrigger value="professional">Professional</EventTabsTrigger>
			<EventTabsTrigger value="social">Social</EventTabsTrigger>
			<EventTabsTrigger value="technical">Technical</EventTabsTrigger>
		</Tabs.List>

		<EventTabsContent value="allEvents" category="allEvents" {events} />
		<EventTabsContent value="academic" category="academic" {events} />
		<EventTabsContent value="professional" category="professional" {events} />
		<EventTabsContent value="social" category="social" {events} />
		<EventTabsContent value="technical" category="technical" {events} />
	</Tabs>
</Section>
