import { getFromCMS } from '$lib/utils.js';
import type { OfficeHour, Sponsors } from '$lib/schemas';

const homepageQuery = `{
  "homepage": *[_type == "homepage"]{
    "councilPhoto": councilPhoto.asset->url+"?h=1200&fm=webp",
    "faqs": faqs[]{ question, answer },
  }[0],
  "officeHours": *[_type=="officeHours"]{
    day,
    startTime,
    endTime,
    "member": {
      "name": member->name,
      "position": member->position
    }
  },
  "sponsors": *[_type=="sponsors"]{
    name,
    url,
    "logo": logo.asset->url+"?h=100&fm=webp"
  }
}`;

export const load = async ({ url }) => {
	/**
	 * @description Response data type based on the combined query above.
	 * Note that `description` is a rich/portable text type
	 */
	let homePageResp = await getFromCMS(homepageQuery);
	let councilPhotoUrl: string = homePageResp.homepage.councilPhoto;
	let officeHourResp: OfficeHour[] = homePageResp.officeHours;
	let sponsorsResp: Sponsors[] = homePageResp.sponsors;

	return {
		councilPhoto: councilPhotoUrl,
		allOHs: officeHourResp,
		sponsors: sponsorsResp,
		canonical: url.href
	};
};
