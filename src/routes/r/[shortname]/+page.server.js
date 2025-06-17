import { redirect } from '@sveltejs/kit';
import { getFromCMS } from 'utils/utils.js';

const redirectQuery = `*[_type == "redirects"]{ shortname, url }`;

export const load = async ({ params }) => {
	/** @type {[{shortname: String, url: String}]} */
	let CMSresponse = await getFromCMS(redirectQuery);

	const { shortname } = params;

    CMSresponse.forEach(res => {
        if(res.shortname == shortname) {
            // if match
            throw redirect(302, res.url);
        }
    });

    return {
        shortname: shortname,
        availableShortnames: CMSresponse,
    }
};
