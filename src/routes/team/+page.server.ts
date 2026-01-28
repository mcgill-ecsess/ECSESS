//Wait for CMS to setup
import type { DevTeam } from '$lib/schemas';
import { getFromCMS } from '$lib/utils';

const query = `*[_type == "devTeam"]{
  name,
  role,
  yearProgram,
  email,
  funFact,
  github,
  "image": image.asset->url+"?h=300&fm=webp",
}`;

export const load = async ({ url }) => {
	let devTeam: DevTeam[] = await getFromCMS(query);

	return {
		devTeam: devTeam,
		canonical: url.href
	};
};
