<script>
	import Section from 'components/Section.svelte';
	let { data } = $props();
</script>

<Section>
	<p class="page-title">Can't redirect you to <code>"r/{data.shortname}"</code>!</p>
	<hr class="border-2 w-1/2">
	<div>
		Maybe you were trying to get to:
		<ul>
			{#each data.availableShortnames as s}
			<li class="list-disc list-inside">
				<a href={s.url}>
					/r/{s.shortname}
				</a>
			</li>
			{/each}
		</ul>
	</div>
</Section>
