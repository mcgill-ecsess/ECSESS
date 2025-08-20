<script lang="ts">
	let { children, onclick = null } = $props();
</script>

<button
	class="bg-ecsess-600 hover:bg-ecsess-400 active:bg-ecsess-800
            inline-block rounded-lg border-none px-4
            py-2 text-white transition-all
            duration-200 ease-out
            hover:shadow-2xl"
	{onclick}
>
	{@render children()}
</button>
