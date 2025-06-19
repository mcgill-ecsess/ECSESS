import { getFromCMS } from 'utils/utils.js';

const homepageQuery = `*[_type == "homepage"]{
	"description": description[],
	"councilPhoto": councilPhoto.asset->url
}[0]`;

const ohQuery = `*[_type=="oh"].schedule[]{
  day,
  startTime,
  endTime,
  "host": member->name
}`;

export const load = async () => {
	let CMSresponse = await getFromCMS(homepageQuery);

	return {
		description: CMSresponse.description,
		councilPhoto: CMSresponse.councilPhoto
		// ohs: await getFromCMS(ohQuery),
		// FAQs: "",
	};
};
