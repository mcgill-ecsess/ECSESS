<script>
	import { PortableText } from '@portabletext/svelte';
	import Section from 'components/Section.svelte';
	let { data } = $props();
</script>

<title> ECSESS Events </title>

<Section>
	<p class="page-title">Events</p>
	{#each data.events as event}
		<div class="rounded-lg border-4 p-4">
			<p>{event.name}</p>
			<p>{event.date}</p>
			<p>{event.location}</p>
			{#if event.description}
				<PortableText value={event.description} />
			{/if}
			Category:
			<div class="list">
				<ul class="list-inside list-disc space-y-2">
					{#each event.category as cat}
						<li>{cat}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</Section>
