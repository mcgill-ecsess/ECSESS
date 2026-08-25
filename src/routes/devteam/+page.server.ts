import type { DevTeam } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

const query = `*[_type == "devTeam"]{
  name,
  role,
  yearProgram,
  email,
  active,
  term,
  funFact,
  github,
  "image": image.asset->url+"?h=300&fm=webp",
}`;

export const load = async ({ url }: { url: URL }) => {
	const devTeam: DevTeam[] = await getFromCMS(query);

	return {
		devTeam,
		canonical: url.href
	};
};
