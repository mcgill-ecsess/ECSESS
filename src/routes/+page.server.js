import { getFromCMS } from 'utils/utils.js';

const homepageQuery = `*[_type == "homepage"]{
	"description": description[],
	"councilPhoto": councilPhoto.asset->url,
	"faqs": faqs[]{ question, answer },
}[0]`;

const ohQuery = `*[_type=="oh"].schedule[]{
  day,
  startTime,
  endTime,
  "host": member->name
}`;

export const load = async () => {
	/**
	 * @description Response data type based on the `homepageQuery` above.
	 * Note that `description` is a rich/portable text type
	 *
	 * @type {{
	 * 	description: import('@portabletext/svelte').InputValue,
	 *  councilPhoto: string,
	 * 	faqs: [{
	 * 		question: string,
	 * 		answer: string
	 * 		}],
	 * }}
	 *
	 */
	let CMSresponse = await getFromCMS(homepageQuery);

	return {
		description: CMSresponse.description,
		councilPhoto: CMSresponse.councilPhoto,
		faqs: CMSresponse.faqs
		// ohs: await getFromCMS(ohQuery),
	};
};
