<script>
	import Section from 'components/Section.svelte';
	let { data } = $props();
</script>

<title> Resources </title>

<Section>
	<p class="page-title">Resources</p>

	<h1>Resources for ECSE students at McGill University, presented by ECSESS!</h1>

	{#each data.resources as re}
		{re.title} <br>
		{re.url} <br>
		{re.description} <br>
		<p>==============</p>
	{/each}
</Section>
