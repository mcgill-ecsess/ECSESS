<script>
	/**
	 * Win2k style: renders as a classic Windows 2000 window/dialog panel.
	 */
	let {
		children = () => 'Section placeholder',
		from = '',
		to = '',
		via = '',
		direction = 'to-b',
		black = false,
		contentStart = false
	} = $props();
</script>

<!-- Each section is a Win2k-style "window" floating on the teal desktop -->
<div
	class="win-window mx-auto my-4"
	style="max-width: 1200px; width: calc(100% - 24px);"
>
	{@render children()}
</div>
