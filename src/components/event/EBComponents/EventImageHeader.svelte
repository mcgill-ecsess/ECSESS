<script lang="ts">
	let { eventTitle, thumbnail, eventCategory } = $props<{
		eventTitle: string;
		thumbnail?: string;
		eventCategory?: string[];
	}>();

	const getDefaultImage = (category?: string[]): string => {
		if (!category || category.length === 0) return '/ECSESS.png';
		const cat = category[0];
		switch (cat) {
			case 'social':
				return '/Social.jpg';
			case 'technical':
				return '/Technical.jpg';
			case 'professional':
				return '/Professional.jpg';
			case 'academic':
				return '/Academic.jpg';
			default:
				return '/ECSESS.png';
		}
	};

	const imageSrc = $derived(thumbnail || getDefaultImage(eventCategory));
	const imageAlt = $derived(thumbnail ? eventTitle : `${eventCategory?.[0] || 'Default'} Event`);
</script>

<div class="relative z-30 h-80 overflow-hidden rounded-t-2xl pointer-events-none">
	<img class="h-full w-full object-cover pointer-events-none" src={imageSrc} alt={imageAlt} />
	<div class="absolute inset-0 bg-gradient-to-b from-transparent via-ecsess-800/20 to-ecsess-950 rounded-t-2xl pointer-events-none"></div>
	<div class="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
		<h3 class="text-2xl font-bold leading-tight text-white">{eventTitle}</h3>
	</div>
</div>