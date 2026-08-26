<script>
	/**
	 * Transparent layout band — height hugs content with viewport-proportional padding.
	 * When it is the page's only section, layout flex-1 stretches it to fill the viewport.
	 * Props:
	 * - contentStart: align content to the top instead of center
	 */
	let { children = () => 'Section placeholder', contentStart = false } = $props();

	const base =
		'mx-auto flex w-full flex-col items-center gap-4 px-4 py-[clamp(2.5rem,8dvh,6rem)] text-left text-ecsess-50';

	let className = $derived(`${base} ${contentStart ? 'justify-start' : 'justify-center'}`);
</script>

<div class={className}>
	{@render children()}
</div>
