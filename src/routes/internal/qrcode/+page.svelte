<script>
	import QRCode from 'components/QRCode.svelte';
	import Button from 'components/Button.svelte';
	import SeoMetaTags from 'components/layout/SeoMetaTags.svelte';
	import Section from 'components/layout/Section.svelte';

	let inputText = $state('');
	let qrCodeRef = $state(/** @type {any} */ (null));

	function handleExport() {
		if (qrCodeRef) {
			qrCodeRef.download('png');
		}
	}
</script>

<SeoMetaTags title="QR Code Generator - ECSESS" />

<Section from="from-ecsess-black" to="to-ecsess-black" via="via-ecsess-800" direction="to-b">
	<p class="page-title">ECSESS QR Code Generator</p>

	<div class="mx-auto flex w-full max-w-4xl flex-col gap-6">
		<!-- Input Section -->
		<div class="flex flex-col gap-4">
			<label for="qr-input" class="text-ecsess-100 text-lg font-semibold">
				Enter text or URL:
			</label>
			<input
				id="qr-input"
				type="text"
				bind:value={inputText}
				placeholder="Enter text or URL to encode..."
				class="border-ecsess-400 text-ecsess-900 placeholder:text-ecsess-400 focus:border-ecsess-500 focus:ring-ecsess-500/20 w-full rounded-md border-2 bg-white px-4 py-3 focus:ring-2 focus:outline-none"
			/>
		</div>

		<!-- Preview Section -->
		{#if inputText}
			<div class="flex flex-col items-center gap-4">
				<h2 class="text-ecsess-100 text-xl font-bold">Preview</h2>
				<div class="flex justify-center rounded-lg bg-white p-2 shadow-lg md:p-4">
					<div class="mx-auto max-h-75 w-full max-w-75">
						<QRCode bind:this={qrCodeRef} data={inputText} size={300} downloadSize={1000} />
					</div>
				</div>
				<Button onclick={handleExport}>
					<span>Download QR Code as PNG</span>
				</Button>
				<span>1000x1000px</span>
			</div>
		{:else}
			<div class="flex items-center justify-center">
				<p class="text-ecsess-200 text-center">Enter text or URL above to generate a QR code</p>
			</div>
		{/if}
	</div>
</Section>
