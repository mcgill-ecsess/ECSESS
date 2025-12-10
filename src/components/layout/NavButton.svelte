<script>
	import { page } from '$app/state';

	let { href, children } = $props();

	// Check if this button's href matches the current page
	const isActive = $derived(page.url.pathname === href);
</script>

<a {href} class="w-auto mx-1">
	<button
		class="hover:text-ecsess-100 hover:border-ecsess-100 text-ecsess-200 text-shadow-xl active:border-ecsess-500
            active:text-ecsess-500 mx-0.5 w-full rounded-none border-b-4 px-6 py-2
             font-semibold transition-all hover:cursor-pointer active:scale-99
            {isActive ? 'border-ecsess-300' : 'border-transparent'}"
	>
		{@render children()}
	</button>
</a>
