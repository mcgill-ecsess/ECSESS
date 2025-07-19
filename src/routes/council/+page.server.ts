import type { CouncilMember } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

// Note: council member image has height of 200px for
// CouncilCard: image is `size-32` ~ 128px
// CouncilCardPopUp: image is `size-42` ~ 168px
const councilQuery = `*[_type == "members"]{
  name,
  email,
  position,
  positionDescription,
  "image": image.asset->url+"?h=200&fm=webp",
  yearProgram
}`;

const councilGoofyPicQuery = `*[_type == "homepage"]{
  "url": councilGoofyPic.asset->url+"?h=1200&fm=webp" 
}[0]`;

export const load = async () => {
	let councilMembers: CouncilMember[] = await getFromCMS(councilQuery);
	return {
		members: councilMembers,
		councilGoofyPic: await getFromCMS(councilGoofyPicQuery)
	};
};
