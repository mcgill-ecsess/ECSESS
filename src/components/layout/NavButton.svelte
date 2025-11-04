<script>
	import { page } from '$app/stores';

	let { href, children } = $props();

	// Check if this button's href matches the current page
	const isActive = $derived($page.url.pathname === href);
</script>

<!-- border-ecsess-black hover:border-ecsess-150 active:border-ecsess-300 border-b-4 px-6 py-2
font-semibold transition-all hover:text-ecsess-100 -->

<a {href} class="w-full md:w-auto">
	<button
		class="hover:text-ecsess-100 w-full rounded-md px-6 py-2 font-semibold transition-all md:mx-0.5 md:w-auto md:rounded-none
		{isActive
			? 'border-ecsess-300 bg-ecsess-800 md:border-b-4 md:bg-transparent'
			: 'border-ecsess-black hover:border-ecsess-150 active:border-ecsess-300 hover:bg-ecsess-800 active:bg-ecsess-700 md:border-b-4 md:hover:bg-transparent md:active:bg-transparent'}"
	>
		{@render children()}
	</button>
</a>
