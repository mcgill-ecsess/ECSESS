import type { Resource } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

const query = `*[_type == "resources"] | order(title asc) {
  title,
  url,
  description,
  category,
}`;

/** CMS stores category as string | string[] | null — always coerce to string[]. */
function toCategoryArray(category: unknown): string[] {
	if (Array.isArray(category)) {
		return category.filter((c): c is string => typeof c === 'string' && c.length > 0);
	}
	if (typeof category === 'string' && category.length > 0) return [category];
	return [];
}

export const load = async ({ url }) => {
	const raw = await getFromCMS(query);
	const resources: Resource[] = (raw ?? []).map(
		(resource: Omit<Resource, 'category'> & { category: unknown }) => ({
			...resource,
			category: toCategoryArray(resource.category)
		})
	);

	return {
		resources,
		canonical: url.href
	};
};
