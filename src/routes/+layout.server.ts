import { getFromCMS } from '$lib/utils.js';
import type { Homepage } from '$lib/schemas';

const homepageQuery = `*[_type == "homepage"][0]{
    notification,
    "councilPhoto": councilPhoto.asset->url + "?h=1200&fm=webp",
    "councilGoofyPic": councilGoofyPic.asset->url + "?h=1200&fm=webp",
    "faqs": faqs[]{ question, answer }
  }`;

export const load = async () => {
	try {
		const homepage = (await getFromCMS(homepageQuery)) as Homepage | null;
		return {
			notification: homepage?.notification ?? null,
			thumbnail: homepage?.councilPhoto ?? null
		};
	} catch (err) {
		console.error('Failed to fetch homepage data from CMS:', err);
		return { notification: null, thumbnail: null };
	}
};
