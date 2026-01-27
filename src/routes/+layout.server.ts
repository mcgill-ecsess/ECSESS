import { getFromCMS } from '$lib/utils.js';

const thumbnailQuery = `*[_type == "homepage"]{
	"thumbnail": councilPhoto.asset->url+"?h=800&fm=webp",
}[0]`;

export const load = async () => {
	try {
		return { thumbnail: (await getFromCMS(thumbnailQuery)).thumbnail };
	} catch (err) {
		console.error('Failed to fetch homepage thumbnail from CMS:', err);
		return { thumbnail: null };
	}
};
