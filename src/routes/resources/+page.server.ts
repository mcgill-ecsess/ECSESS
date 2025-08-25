import type { Resource } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

// needs to concat and format this text
const query = `*[_type == "resources"]{
  title,
  url,
  description,
}`;

export const load = async ({ url }) => {
	const resources: Resource[] = await getFromCMS(query);
	return {
		resources: resources,
		canonical: url.href
	};
};
