import { redirect } from '@sveltejs/kit';
import { getFromCMS } from '$lib/utils.js';
import type { Redirect } from '$lib/schemas';

const redirectQuery = `*[_type == "redirects"]{ name, shortname, url }`;

export const load = async ({ params }) => {
	let allRedirects: Redirect[] = await getFromCMS(redirectQuery);

	const { shortname } = params;

	allRedirects.forEach((res) => {
		if (res.shortname == shortname) {
			// if match
			throw redirect(302, res.url);
		}
	});

	return {
		shortname: shortname,
		availableShortnames: allRedirects
	};
};
