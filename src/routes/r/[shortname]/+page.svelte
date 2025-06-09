<script>
	import Section from 'components/Section.svelte';
	let { data } = $props();
</script>

<Section>
	<p class="page-title">Where am I?</p>
	<p>
        Oops! We don't have a page for <code>"r/{data.shortname}"</code>.
	</p>
	<p>Please try again!</p>
</Section>
