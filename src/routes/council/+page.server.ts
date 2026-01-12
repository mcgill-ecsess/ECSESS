import type { CouncilMember } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

// Note: council member image has height of 200px for
// CouncilCard: image is `size-32` ~ 128px
// CouncilCardPopUp: image is `size-42` ~ 168px
const councilQuery = `{
  "members": *[_type == "members"]{
    name,
    email,
    position,
    positionDescription,
    "image": image.asset->url+"?h=300&fm=webp",
    yearProgram
  },
  "councilGoofyPic": *[_type == "homepage"]{
    "url": councilGoofyPic.asset->url+"?h=1200&fm=webp" 
  }[0]
}`;

export const load = async ({ url }) => {
	const {
		members,
		councilGoofyPic
	}: { members: CouncilMember[]; councilGoofyPic: { url: string } } =
		await getFromCMS(councilQuery);

	return {
		members: members,
		councilGoofyPic,
		canonical: url.href
	};
};
