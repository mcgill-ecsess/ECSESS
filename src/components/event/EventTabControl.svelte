<script>
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
    let { value, children } = $props();
</script>

<Tabs.Control
	{value}
	classes="hover:border-b-ecsess-200 border-b-4 transition-all ease-in-out pb-2 text-lg  active:border-b-ecsess-600 px-2"
	stateActive="border-b-ecsess-400"
>
	{@render children()}
</Tabs.Control>
