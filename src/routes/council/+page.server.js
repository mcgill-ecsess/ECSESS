import { getFromCMS } from 'utils/utils.js';

// needs to concat and format this text
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
