import type { CouncilMember } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';
import { councilMembersQuery, normalizeCouncilMember } from '$lib/subcommittee';

const councilQuery = `{
  "members": ${councilMembersQuery},
  "councilGoofyPic": *[_type == "homepage"]{
    "url": councilGoofyPic.asset->url+"?h=1200&fm=webp"
  }[0]
}`;

export const load = async ({ url }: { url: URL }) => {
	const {
		members: rawMembers,
		councilGoofyPic
	}: {
		members: Parameters<typeof normalizeCouncilMember>[0][];
		councilGoofyPic: { url: string } | null;
	} = await getFromCMS(councilQuery);

	const members: CouncilMember[] = (rawMembers ?? []).map(normalizeCouncilMember);

	return {
		members,
		councilGoofyPic: councilGoofyPic ?? { url: '' },
		canonical: url.href
	};
};
