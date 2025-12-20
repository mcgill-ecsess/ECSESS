<script>
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	let { value, children } = $props();
</script>

<Tabs.Trigger {value}>
	{#snippet element(attributes)}
		<button
			{...attributes}
			class="hover:border-b-ecsess-200 data-[state=active]:border-b-ecsess-400 border-b-4 border-b-transparent px-2 pb-2 text-lg transition-all ease-in-out"
		>
			{@render children()}
		</button>
	{/snippet}
</Tabs.Trigger>
