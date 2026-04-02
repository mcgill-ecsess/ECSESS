<script>
	import { page } from '$app/state';

	let { href, children } = $props();
	const isActive = $derived(page.url.pathname === href);
</script>

<a {href} class="mx-0.5">
	<button
		class="win-btn text-sm"
		style={isActive ? 'border-top: 2px solid #404040; border-left: 2px solid #404040; border-right: 2px solid #ffffff; border-bottom: 2px solid #ffffff; background: #ece9d8;' : ''}
	>
		{@render children()}
	</button>
</a>
