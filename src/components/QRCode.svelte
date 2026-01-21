<script>
	import QRCodeStyling from 'qr-code-styling';

	let { data = '', downloadSize = 1000, size = 300 } = $props();
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
					margin: 8,
					crossOrigin: 'anonymous'
				},
				dotsOptions: {
					color: '#3f6a3f', // ecsess-600
					type: 'rounded',
					gradient: {
						type: 'radial',
						colorStops: [
							{
								offset: 0,
								color: '#8fb98a' // ecsess-300
							},
							{
								offset: 1,
								color: '#2d5a2d' // ecsess-700
							}
						]
					}
				},
				backgroundOptions: {
					color: '#ffffff', // ecsess-white
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
		if (!lastData || !lastData.trim() || !qrCodeInstance) return;
		
		// Create a high-resolution version with extra margin for download
		const marginSize = Math.floor(downloadSize * 0.04); // 4% margin
		
		const downloadInstance = new QRCodeStyling({
			width: downloadSize,
			height: downloadSize,
			type: 'svg',
			data: lastData,
			margin: marginSize, // Add extra padding/margin
			qrOptions: {
				typeNumber: 0,
				mode: 'Byte',
				errorCorrectionLevel: 'M'
			},
			imageOptions: {
				hideBackgroundDots: true,
				imageSize: 0.4,
				margin: 8,
				crossOrigin: 'anonymous'
			},
			dotsOptions: {
				color: '#3f6a3f', // ecsess-600
				type: 'rounded',
				gradient: {
					type: 'radial',
					colorStops: [
						{
							offset: 0,
							color: '#8fb98a' // ecsess-300
						},
						{
							offset: 1,
							color: '#2d5a2d' // ecsess-700
						}
					]
				}
			},
			backgroundOptions: {
				color: '#ffffff', // ecsess-white
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
		
		// Create a temporary container for the high-res QR code
		const tempContainer = document.createElement('div');
		tempContainer.style.width = `${downloadSize + marginSize }px`;
		tempContainer.style.height = `${downloadSize + marginSize}px`;
		tempContainer.style.position = 'absolute';
		tempContainer.style.left = '-9999px';
		document.body.appendChild(tempContainer);
		
		downloadInstance.append(tempContainer);
		
		// Wait for the QR code to render, then download
		setTimeout(() => {
			downloadInstance.download({ name: 'qrcode', extension: /** @type {'png' | 'svg' | 'jpeg' | 'webp'} */ (format) });
			// Clean up temporary container
			document.body.removeChild(tempContainer);
		}, 100);
	}
</script>

<div bind:this={qrCodeContainer} class="flex items-center justify-center max-w-sm max-h-sm"></div>
