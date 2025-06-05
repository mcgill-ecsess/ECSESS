import { getFromCMS } from 'utils/utils.js';

const query = `*[_type == "members"]{
  name,
  email,
  position,
  positionDescription,
  "image": image.asset->url,
  yearProgram
}`;

export const load = async () => {
	return {
		members: await getFromCMS(query)
	};
};
