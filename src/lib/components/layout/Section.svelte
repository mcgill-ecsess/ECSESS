<script>
	/**
	 * Transparent layout band — page background/texture is global on html/body.
	 * Props:
	 * - contentStart: align content to the top instead of center
	 */
	let { children = () => 'Section placeholder', contentStart = false } = $props();

	const base = 'mx-auto flex min-h-[90vh] flex-col items-center gap-4 p-4 text-left text-ecsess-50';

	let className = $derived(`${base} ${contentStart ? 'justify-start' : 'justify-center'}`);
</script>

<div class={className}>
	{@render children()}
</div>
