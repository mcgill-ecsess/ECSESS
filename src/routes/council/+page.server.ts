import { getFromCMS } from '$lib/utils.js';

const query = `*[_type == "members"]{
  name,
  email,
  position,
  positionDescription,
  "image": image.asset->url,
  yearProgram
}`;

const councilGoofyPicQuery = `*[_type == "homepage"]{
  "url": councilGoofyPic.asset->url+"?h=1000&fm=webp" 
}[0]`;

export const load = async () => {
	return {
		members: await getFromCMS(query),
    councilGoofyPic: await getFromCMS(councilGoofyPicQuery),
	};
};
