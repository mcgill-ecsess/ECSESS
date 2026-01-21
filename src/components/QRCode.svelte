<script>
	import QRCodeStyling from 'qr-code-styling';

	let { data = '', size = 300 } = $props();
	let qrCodeContainer = $state(/** @type {HTMLDivElement | null} */ (null));
	let qrCodeInstance = $state(/** @type {QRCodeStyling | null} */ (null));
	let debounceTimer = $state(/** @type {any} */ (null));
	let lastData = $state('');

	function updateQRCode() {
		if (!qrCodeContainer) return;

		const trimmedData = data.trim();
		
		// Skip if data hasn't actually changed
		if (trimmedData === lastData) return;
		
		lastData = trimmedData;

		// Clean up previous instance
		if (qrCodeInstance) {
			qrCodeContainer.innerHTML = '';
			qrCodeInstance = null;
		}

		// Only create QR code if data is provided
		if (trimmedData) {
			// Create new QR code instance
			const instance = new QRCodeStyling({
				width: size,
				height: size,
				type: 'svg',
				data: trimmedData,
				margin: 0,
				qrOptions: {
					typeNumber: 0,
					mode: 'Byte',
					errorCorrectionLevel: 'M'
				},
				imageOptions: {
					hideBackgroundDots: true,
					imageSize: 0.4,
					margin: 0,
					crossOrigin: 'anonymous'
				},
				dotsOptions: {
					color: '#3f6a3f', // ecsess-600
					type: 'rounded'
				},
				backgroundOptions: {
					color: '#ffffff'
				},
				cornersSquareOptions: {
					color: '#3f6a3f', // ecsess-600
					type: 'extra-rounded'
				},
				cornersDotOptions: {
					color: '#3f6a3f', // ecsess-600
					type: 'dot'
				},
				image: '/favicon.png'
			});

			qrCodeInstance = instance;
			instance.append(qrCodeContainer);
		}
	}

	$effect(() => {
		// Clear any pending debounce
		if (debounceTimer !== null) {
			clearTimeout(debounceTimer);
		}

		// Only update if container is available
		if (qrCodeContainer) {
			// Debounce updates for smooth typing experience
			debounceTimer = setTimeout(() => {
				updateQRCode();
				debounceTimer = null;
			}, 300);
		}

		// Cleanup function
		return () => {
			if (debounceTimer !== null) {
				clearTimeout(debounceTimer);
			}
		};
	});

	export function download(format = 'png') {
		if (qrCodeInstance) {
			qrCodeInstance.download({ name: 'qrcode', extension: /** @type {'png' | 'svg' | 'jpeg' | 'webp'} */ (format) });
		}
	}
</script>

<div bind:this={qrCodeContainer} class="flex items-center justify-center"></div>
