import { redirect } from '@sveltejs/kit';
import { getFromCMS } from '$lib/utils.js';
import type { Redirect } from '$lib/schemas';

const redirectQuery = `*[_type == "redirects"]{ name, shortname, url }`;

export const load = async ({ params, url }: { params: { shortname: string }; url: URL }) => {
	const allRedirects: Redirect[] = await getFromCMS(redirectQuery);
	const { shortname } = params;

	for (const entry of allRedirects) {
		if (entry.shortname === shortname) {
			throw redirect(302, entry.url);
		}
	}

	return {
		shortname,
		availableShortnames: allRedirects,
		canonical: url.href
	};
};
