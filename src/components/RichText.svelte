<script>
    
	import { PortableText } from '@portabletext/svelte';
	// incoming rich text value
	export let value: any = null;
</script>

{#if value}
<div class="typography">
	<PortableText {value} />
</div>
{/if}