import type { Resource } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

const query = `*[_type == "resources"] | order(category asc, title asc) {
  title,
  url,
  description,
  category,
}`;

export const load = async ({ url }) => {
	const resources: Resource[] = await getFromCMS(query);
	return {
		resources: resources,
		canonical: url.href
	};
};
