<script>
	// NOTE: I think there could be a better way to do this
	import { PortableText } from '@portabletext/svelte';
	let { value } = $props();
</script>

<div class="typography flex flex-col justify-center-safe text-left text-ecsess-100">
	<PortableText {value} />
</div>
