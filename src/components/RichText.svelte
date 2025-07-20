<script>
    // NOTE: I think there could be a better way to do this
	import { PortableText } from '@portabletext/svelte';
	let { value } = $props();
</script>

<div id="test" class="prose prose-base lg:prose-lg **:text-ecsess-200">
	<PortableText {value} />
</div>
