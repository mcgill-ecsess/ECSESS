type UrlModule = Record<string, string>;

const companyLogoModules = import.meta.glob<string>(
	'/src/assets/company_logo/*.{png,jpg,jpeg,svg}',
	{
		eager: true,
		query: '?url',
		import: 'default'
	}
);

const eventImageModules = import.meta.glob<string>('/src/assets/events/*.{png,jpg,jpeg,webp}', {
	eager: true,
	query: '?url',
	import: 'default'
});

function filenameFromPath(path: string): string {
	return (path.split('/').pop() ?? '').replace(/\.[^.]+$/, '');
}

function sortedAssetUrls(modules: UrlModule): string[] {
	return Object.entries(modules)
		.map(([path, url]) => ({
			name: filenameFromPath(path).toLowerCase(),
			url
		}))
		.sort((a, b) => a.name.localeCompare(b.name))
		.map(({ url }) => url);
}

/** Company logos for the partnership marquee, sorted alphabetically. */
export function getCompanyLogos(): string[] {
	return sortedAssetUrls(companyLogoModules);
}

/** Resolved production URL for a partnership event image slug (filename without extension). */
export function getEventImageUrl(slug: string): string {
	const normalizedSlug = slug.toLowerCase();

	for (const [path, url] of Object.entries(eventImageModules)) {
		if (filenameFromPath(path).toLowerCase() === normalizedSlug) {
			return url;
		}
	}

	return '';
}
