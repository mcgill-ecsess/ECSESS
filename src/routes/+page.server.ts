import { getFromCMS } from '$lib/utils.js';
import type { HomepageCMSResponse, OfficeHour } from '$lib/schemas';

const homepageQuery = `*[_type == "homepage"]{
	"description": description[],
	"councilPhoto": councilPhoto.asset->url+"?h=1200&fm=webp",
	"faqs": faqs[]{ question, answer },
}[0]`;

const ohQuery = `*[_type=="officeHours"]{
  day,
  startTime,
  endTime,
  "member": {
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
	let officeHourResp: OfficeHour[] = await getFromCMS(ohQuery);

	return {
		description: homepageResp.description,
		councilPhoto: homepageResp.councilPhoto,
		faqs: homepageResp.faqs,
		allOHs: officeHourResp
	};
};
