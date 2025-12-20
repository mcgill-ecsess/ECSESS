<script>
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	let { value, children } = $props();
</script>

<Tabs.Trigger {value}>
	{#snippet element(attributes)}
		<button
			{...attributes}
			class="hover:border-b-ecsess-200 border-b-4 border-b-transparent transition-all ease-in-out pb-2 text-lg px-2 data-[state=active]:border-b-ecsess-400"
		>
			{@render children()}
		</button>
	{/snippet}
</Tabs.Trigger>
