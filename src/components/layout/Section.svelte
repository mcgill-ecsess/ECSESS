<script>
	/**
	 * A transparent layout wrapper — background is handled globally on the body.
	 * Props:
	 * - contentStart: align content to the top instead of center
	 */
	let { children = () => 'Section placeholder', contentStart = false } = $props();

	const base = 'mx-auto flex min-h-[90vh] flex-col items-center gap-4 p-4 text-center text-ecsess-100';
</script>

<div class="{base} {contentStart ? 'justify-start' : 'justify-center'}">
	{@render children()}
</div>
