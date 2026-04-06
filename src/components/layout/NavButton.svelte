<script>
	import { page } from '$app/state';

	let { href, children } = $props();

	const isActive = $derived(page.url.pathname === href);
</script>

<a
	{href}
	class="focus-visible:ring-ring focus-visible:ring-offset-primary-background block border-transparent px-2.5 py-2.5 text-[0.9375rem] font-medium tracking-tight transition-colors focus-visible:rounded-(--radius-control) focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none max-md:border-b-0 max-md:border-l-4 max-md:py-3 md:-mb-px md:inline-block md:border-b-2 md:px-3 {isActive
		? 'text-primary-content max-md:border-l-accent max-md:bg-primary-soft md:border-accent'
		: 'text-base-content max-md:hover:bg-primary-soft md:hover:border-border md:hover:text-primary-content'}"
	aria-current={isActive ? 'page' : undefined}
>
	{@render children()}
</a>
