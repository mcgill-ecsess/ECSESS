<script lang="ts">
	let { children, onclick = null, disabled = false, class: className = '' } = $props();
</script>

<button
	{disabled}
	{onclick}
	class="w-fit rounded-md
		bg-ecsess-600 px-6 py-3
		text-sm font-semibold text-ecsess-50 transition-colors hover:cursor-pointer hover:bg-ecsess-700 {className}"
>
	{@render children()}
</button>
