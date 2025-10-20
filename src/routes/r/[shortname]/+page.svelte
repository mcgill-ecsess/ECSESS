<script>
	import Section from 'components/layout/Section.svelte';
	import Link from 'components/Link.svelte';
	let { data } = $props();
</script>

<title> Hmm... you're not supposed to be here :/ </title>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<p class="page-title">Can't redirect you to <code>"r/{data.shortname}"</code>!</p>
	<hr class="border-2 w-1/2">
	<div>
		Maybe you were trying to get to:
		<ul>
			{#each data.availableShortnames as redirect}
			<li class="list-disc list-inside text-lg my-1">
				{redirect.name} ~
				<Link href={redirect.url}>
					/r/{redirect.shortname}
				</Link>
			</li>
			{/each}
		</ul>
	</div>
</Section>
