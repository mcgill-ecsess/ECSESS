<script lang="ts">
	let { children, onclick = null } = $props();
</script>

<button
	class="bg-ecsess-600 hover:bg-ecsess-500 active:bg-ecsess-700
            inline-block rounded-md border-none px-4
            py-2 text-white transition-all
            duration-200 ease-out
            hover:scale-105 hover:shadow-xl"
	{onclick}
>
	{@render children()}
</button>
