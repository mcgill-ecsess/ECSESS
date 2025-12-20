<script>
	import Section from 'components/layout/Section.svelte';
	import Link from 'components/Link.svelte';
	let { data } = $props();
</script>

<title> Hmm... you're not supposed to be here :/ </title>

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<p class="page-title">Can't redirect you to <code>"r/{data.shortname}"</code>!</p>
	<hr class="w-1/2 border-2" />
	<div>
		Maybe you were trying to get to:
		<ul>
			{#each data.availableShortnames as redirect}
				<li class="my-1 list-inside list-disc text-lg">
					{redirect.name} ~
					<Link href={redirect.url}>
						/r/{redirect.shortname}
					</Link>
				</li>
			{/each}
		</ul>
	</div>
</Section>
