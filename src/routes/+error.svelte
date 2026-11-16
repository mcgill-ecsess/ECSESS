<script lang="ts">
	import { page } from '$app/state';
	import Section from '#lib/components/layout/Section.svelte';
	import SeoMetaTags from '#lib/components/layout/SeoMetaTags.svelte';
	import Link from '#lib/components/Link.svelte';
	import Button from '#lib/components/Button.svelte';

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
			<h1 class="text-8xl font-black tracking-tighter text-ecsess-100 md:text-9xl">
				Segmentation Fault
			</h1>
			<Link href="/">
				<Button class="mb-2 cursor-pointer text-lg text-ecsess-50">Reboot to Homepage</Button>
			</Link>

			<p class="text-lg leading-relaxed text-ecsess-200 md:text-xl">
				The page you are looking for is not implemented because we are too lazy to do it.
				<br />
				But if you really want to see it, you can reboot to the homepage and try again.
				<br />
				<br />
				Or even better, you can join us and help us implement it.
			</p>

			<div
				class="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-ecsess-800/60 bg-ecsess-950/50 text-left shadow-lg"
				aria-label="Error log terminal"
			>
				<div class="flex items-center gap-2 border-b border-ecsess-800/60 px-4 py-2.5">
					<span class="size-2.5 rounded-full bg-red-400/80" aria-hidden="true"></span>
					<span class="size-2.5 rounded-full bg-amber-400/70" aria-hidden="true"></span>
					<span class="size-2.5 rounded-full bg-ecsess-400/70" aria-hidden="true"></span>
					<span class="ml-2 font-mono text-xs text-ecsess-400">bash — ecsess@mcgill</span>
				</div>

				<pre
					class="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-ecsess-200 sm:text-sm"><code
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
							class="inline-block h-3.5 w-2 animate-pulse bg-ecsess-300 align-middle"
							aria-hidden="true"></span></code
					></pre>
			</div>
		</div>
	</Section>
</div>
