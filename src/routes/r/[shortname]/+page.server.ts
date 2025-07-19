import { redirect } from '@sveltejs/kit';
import { getFromCMS } from '$lib/utils.js';
import type { Redirect } from '$lib/schemas';

const redirectQuery = `*[_type == "redirects"]{ shortname, url }`;

export const load = async ({ params }) => {
	let CMSresponse: Redirect[] = await getFromCMS(redirectQuery);

	const { shortname } = params;

	CMSresponse.forEach((res) => {
		if (res.shortname == shortname) {
			// if match
			throw redirect(302, res.url);
		}
	});

	return {
		shortname: shortname,
		availableShortnames: CMSresponse
	};
};
