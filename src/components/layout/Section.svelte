<script>
	/**
	 * Props:
	 * - from/to: pass full Tailwind gradient color classes (e.g., 'from-ecsess-950', 'to-ecsess-800')
	 * - direction: Tailwind gradient direction suffix (e.g., 'to-b', 'to-r'), defaults to vertical
	 * - black: legacy toggle for solid background (kept for backward compatibility)
	 */
	let {
		children = () => 'Section placeholder',
		from = '',
		to = '',
		direction = 'to-b', // to bottom
		black = false
	} = $props();

	const base =
		'mx-auto flex min-h-[90vh] flex-col items-center justify-center gap-4 p-4 text-center text-ecsess-100';

	// Compute classes: prefer gradient when from/to provided; otherwise fallback to previous behavior
	let tailwindClasses = $state(base);

	$effect(() => {
		if (from && to) {
			tailwindClasses = `${base} bg-gradient-${direction} ${from} ${to}`;
		} else {
			tailwindClasses = base + (black ? ' bg-ecsess-black' : ' bg-ecsess-800');
		}
	});
</script>

<div class={tailwindClasses}>
	{@render children()}
</div>
