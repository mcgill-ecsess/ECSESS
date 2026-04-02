<script lang="ts">
	let { children, onclick = null, disabled = false, class: className = '' } = $props();
</script>

<button
	{disabled}
	{onclick}
	class="win-btn {className}"
>
	{@render children()}
</button>
