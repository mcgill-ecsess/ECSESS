import { getFromCMS } from '$lib/utils.js';
import type { HomepageCMSResponse, OfficeHour, Sponsors } from '$lib/schemas';

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

const sponsorQuery = `*[_type=="sponsors"]{
    name,
    url,
    "logo": logo.asset->url+"?h=100&fm=webp"
}`;

export const load = async ({ url }) => {
	/**
	 * @description Response data type based on the `homepageQuery` above.
	 * Note that `description` is a rich/portable text type
	 */
	let homepageResp: HomepageCMSResponse = await getFromCMS(homepageQuery);
	let officeHourResp: OfficeHour[] = await getFromCMS(ohQuery);
	let sponsorsResp: Sponsors[] = await getFromCMS(sponsorQuery);

	return {
		description: homepageResp.description,
		councilPhoto: homepageResp.councilPhoto,
		faqs: homepageResp.faqs,
		allOHs: officeHourResp,
		sponsors: sponsorsResp,
		canonical: url.href
	};
};
