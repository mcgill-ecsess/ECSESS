<script lang="ts">
	let { children, onclick = null, disabled = false, class: className = '' } = $props();
</script>

<button
	{disabled}
	{onclick}
	class="bg-ecsess-600 text-ecsess-50
		hover:bg-ecsess-700 w-fit rounded-md
		px-6 py-3 text-sm font-semibold transition-colors hover:cursor-pointer {className}"
>
	{@render children()}
</button>
