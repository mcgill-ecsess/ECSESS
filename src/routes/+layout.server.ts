import { getFromCMS } from '$lib/utils.js';

const thumbnailQuery = `*[_type == "homepage"]{
	"thumbnail": councilPhoto.asset->url+"?h=800&fm=webp",
}[0]`;

export const load = async () => {
	return { thumbnail: (await getFromCMS(thumbnailQuery)).thumbnail };
};
