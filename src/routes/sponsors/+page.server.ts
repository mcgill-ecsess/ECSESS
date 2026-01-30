import type { Benefits, Sponsors } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

const query = `{
  "benefits": *[_type == "benefits"]{
    benefit,
    category,
    description,
    platinum,
    gold,
    silver,
    custom
  },
  "sponsors": *[_type == "sponsors"]{
    name,
    url,
    tier,
    "logo": logo.asset->url+"?h=100&fm=webp"
  }
}`;

export const load = async ({ url }) => {
	const response = await getFromCMS(query);
	const benefits: Benefits[] = response.benefits;
	const sponsors: Sponsors[] = response.sponsors;
	return {
		benefits,
		sponsors,
		canonical: url.href
	};
};
