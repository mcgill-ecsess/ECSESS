import { getFromCMS } from 'utils/utils.js';
import type { HomepageCMSResponse, OhCMSResponse } from '$lib/schemas';

const homepageQuery = `*[_type == "homepage"]{
	"description": description[],
	"councilPhoto": councilPhoto.asset->url,
	"faqs": faqs[]{ question, answer },
}[0]`;

const ohQuery = `*[_type=="officeHours"]{
  day,
  startTime,
  endTime,
  "host": {
    "name": member->name,
    "position": member->position
  }
}`;

export const load = async () => {
	/**
	 * @description Response data type based on the `homepageQuery` above.
	 * Note that `description` is a rich/portable text type
	 */
	let homepageResp: HomepageCMSResponse = await getFromCMS(homepageQuery);
	let officeHourResp: OhCMSResponse = await getFromCMS(ohQuery);

	return {
		description: homepageResp.description,
		councilPhoto: homepageResp.councilPhoto,
		faqs: homepageResp.faqs,
		allOHs: officeHourResp
	};
};
