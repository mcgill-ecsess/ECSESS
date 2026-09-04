<script lang="ts">
	import { page } from '$app/state';
	import Section from '$lib/components/layout/Section.svelte';
	import SeoMetaTags from '$lib/components/layout/SeoMetaTags.svelte';
	import Link from '$lib/components/Link.svelte';
	import Button from '$lib/components/Button.svelte';

	const status = $derived(page.status ?? 'Unknown');
	const errorMessage = $derived(page.error?.message ?? 'Segmentation Fault');
	const path = $derived(page.url.pathname);
</script>

<div id="ErrorPage" data-component="ErrorPage">
	<SeoMetaTags
		title="{page.status ?? 'Error'} — ECSESS"
		description="The page you requested could not be found."
	/>

	<Section contentStart={true}>
		<div class="w-full max-w-7xl pb-16 text-center">
			<h1 class="text-ecsess-100 text-8xl font-black tracking-tighter md:text-9xl">
				Segmentation Fault
			</h1>
			<Link href="/">
				<Button class="text-ecsess-50 mb-2 cursor-pointer text-lg">Reboot to Homepage</Button>
			</Link>

			<p class="text-ecsess-200 text-lg leading-relaxed md:text-xl">
				The page you are looking for is not implemented because we are too lazy to do it.
				<br />
				But if you really want to see it, you can reboot to the homepage and try again.
				<br />
				<br />
				Or even better, you can join us and help us implement it.
			</p>

			<div
				class="border-ecsess-800/60 bg-ecsess-950/50 mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border text-left shadow-lg"
				aria-label="Error log terminal"
			>
				<div class="border-ecsess-800/60 flex items-center gap-2 border-b px-4 py-2.5">
					<span class="size-2.5 rounded-full bg-red-400/80" aria-hidden="true"></span>
					<span class="size-2.5 rounded-full bg-amber-400/70" aria-hidden="true"></span>
					<span class="bg-ecsess-400/70 size-2.5 rounded-full" aria-hidden="true"></span>
					<span class="text-ecsess-400 ml-2 font-mono text-xs">bash — ecsess@mcgill</span>
				</div>

				<pre
					class="text-ecsess-200 overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"><code
						><span class="text-ecsess-400">ecsess@mcgill:~$</span> ./load_page {path}
<span class="text-red-400">ERROR:</span> failed to map '{path}' into address space
<span class="text-amber-400/90">segfault</span> (core dumped) — page not found in /dev/null
---
status: {status}
message: {errorMessage}
---
<span class="text-ecsess-400">ecsess@mcgill:~$</span> echo $?
{typeof status === 'number' ? status : 139}
<span class="text-ecsess-400">ecsess@mcgill:~$</span> <span
							class="bg-ecsess-300 inline-block h-3.5 w-2 animate-pulse align-middle"
							aria-hidden="true"></span></code
					></pre>
			</div>
		</div>
	</Section>
</div>
