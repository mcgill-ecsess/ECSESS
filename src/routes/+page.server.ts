import { getFromCMS } from '$lib/utils.js';
import { formatMcGillSemester } from '$lib/format.js';
import type { FAQ, OfficeHour, Partnership } from '$lib/schemas';

const homepageQuery = `{
  "homepage": *[_id == "homepage"]{
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
  "ohLastUpdated": *[_type == "officeHours"] | order(_updatedAt desc)[0]._updatedAt,
  "partnerships": *[_type == "partnerships"] | order(tier asc, name asc) {
    name,
    url,
    tier,
    "logo": logo.asset->url + "?h=100&fm=webp"
  }
}`;

export const load = async ({ url }: { url: URL }) => {
	const homePageResp = await getFromCMS(homepageQuery);

	return {
		councilPhoto: homePageResp.homepage.councilPhoto as string,
		allOHs: homePageResp.officeHours as OfficeHour[],
		partnerships: (homePageResp.partnerships ?? []) as Partnership[],
		faqs: (homePageResp.homepage.faqs ?? []) as FAQ[],
		canonical: url.href,
		ohLastUpdated: formatMcGillSemester(homePageResp.ohLastUpdated)
	};
};
