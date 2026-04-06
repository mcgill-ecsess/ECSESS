<script>
	// NOTE: I think there could be a better way to do this
	import { PortableText } from '@portabletext/svelte';
	let { value } = $props();
</script>

<div class="typography text-base-content flex flex-col justify-center-safe">
	<PortableText {value} />
</div>
