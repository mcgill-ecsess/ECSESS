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

<div class="pointer-events-none relative aspect-3/2 w-full overflow-hidden md:aspect-4/5">
	<img class="pointer-events-none h-full w-full object-cover" src={imageSrc} alt={imageAlt} />
	<div
		class="via-ecsess-800/20 to-ecsess-950 pointer-events-none absolute inset-0 bg-linear-to-b from-transparent"
	></div>
	<div class="pointer-events-none absolute right-0 bottom-0 left-0 p-4 md:p-6">
		<h3 class="line-clamp-2 text-xl leading-tight font-bold text-white md:text-2xl">
			{eventTitle}
		</h3>
	</div>
</div>
