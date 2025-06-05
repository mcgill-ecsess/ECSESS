<script>
	import Section from 'components/Section.svelte';
	/** loading things from the server side */
	let { data } = $props();
</script>

<title> McGill ECSESS </title>

<!-- ECSESS Introduction -->
<Section>
	<div class="flex h-1/2 flex-col items-center justify-center text-center">
		<p class="page-title">What is ECSESS?</p>
		<p>{data.description}</p>
	</div>
</Section>

<!-- Picture, FAQ -->
<Section black>
	<div class="flex justify-around gap-12">
		<div>
			<p>PICTURES</p>
		</div>
		<div>
			<p>FAQ</p>
		</div>
	</div>
</Section>

<!-- Office Hours Calendar -->
<Section>
	<div>
		<p class="text-2xl">Office Hours</p>
	</div>
</Section>
