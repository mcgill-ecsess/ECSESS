import type { CouncilMember, SubcommitteeMember } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

export const councilMembersQuery = `*[_type == "members" && !(_id in path("drafts.**"))] | order(position.name asc) {
  _id,
  name,
  yearProgram,
  linkedin,
  "image": image.asset->url+"?h=750&fm=webp",
  position {
    name,
    description,
    email
  }
}`;

export const subcommitteeMembersQuery = `*[_type == "subcommitteeMember" && !(_id in path("drafts.**"))] | order(name asc) {
  _id,
  name,
  position,
  yearProgram,
  roleName,
  linkedin,
  contactEmail,
  "image": image.asset->url+"?h=750&fm=webp",
  subcommittee->{
    _id,
    name
  }
}`;

type RawCouncilMember = {
	_id?: string;
	name?: string;
	yearProgram?: string;
	linkedin?: string;
	image?: string;
	position?: {
		name?: string;
		description?: string;
		email?: string;
	} | null;
};

export function normalizeCouncilMember(raw: RawCouncilMember): CouncilMember {
	return {
		_id: raw._id,
		name: raw.name ?? '',
		email: raw.position?.email ?? '',
		position: raw.position?.name ?? '',
		positionDescription: raw.position?.description ?? '',
		image: raw.image ?? '',
		yearProgram: raw.yearProgram ?? '',
		linkedin: raw.linkedin || undefined
	};
}

export type SubcommitteePageKey =
	| 'social-subcom'
	| 'external-subcom'
	| 'ecsessbits'
	| 'dev-team'
	| 'alumni';

export type SubcommitteePageMeta = {
	key: SubcommitteePageKey;
	title: string;
	seoTitle: string;
	seoDescription: string;
	/** Match CMS `subcommittee.name` loosely. */
	match: (cmsName: string) => boolean;
};

export const subcommitteePages: Record<SubcommitteePageKey, SubcommitteePageMeta> = {
	'social-subcom': {
		key: 'social-subcom',
		title: 'Social Committee',
		seoTitle: 'Social Committee — ECSESS',
		seoDescription: 'Meet the ECSESS Social Committee.',
		match: (n) => /social/i.test(n)
	},
	'external-subcom': {
		key: 'external-subcom',
		title: 'External Committee',
		seoTitle: 'External Committee — ECSESS',
		seoDescription: 'Meet the ECSESS External Committee.',
		match: (n) => /external/i.test(n)
	},
	ecsessbits: {
		key: 'ecsessbits',
		title: 'ECSESS Bits',
		seoTitle: 'ECSESS Bits — ECSESS',
		seoDescription: 'Meet the ECSESS Bits team.',
		match: (n) => /bits/i.test(n)
	},
	'dev-team': {
		key: 'dev-team',
		title: 'Dev Team',
		seoTitle: 'Dev Team — ECSESS',
		seoDescription: 'Meet the ECSESS Dev Team.',
		match: (n) => /dev/i.test(n)
	},
	alumni: {
		key: 'alumni',
		title: 'Alumni',
		seoTitle: 'Alumni — ECSESS',
		seoDescription: 'Meet the ECSESS alumni network.',
		match: (n) => /alumni/i.test(n)
	}
};

export function filterSubcommitteeMembers(
	members: SubcommitteeMember[],
	key: SubcommitteePageKey
): SubcommitteeMember[] {
	const { match } = subcommitteePages[key];
	return members.filter((m) => {
		const name = m.subcommittee?.name;
		return typeof name === 'string' && match(name);
	});
}

export function subcommitteeRoleLabel(member: SubcommitteeMember): string {
	return member.roleName || member.position || '';
}

export function isSubcommitteeLead(member: SubcommitteeMember): boolean {
	return /chair|lead|editor|head|chief|director/i.test(subcommitteeRoleLabel(member));
}

/** Map a subcommittee member into the flat shape CouncilCard / PopUp expect. */
export function subcommitteeToCouncilMember(member: SubcommitteeMember): CouncilMember {
	return {
		_id: member._id,
		name: member.name ?? '',
		email: member.contactEmail ?? '',
		position: subcommitteeRoleLabel(member),
		positionDescription: '',
		image: member.image ?? '',
		yearProgram: member.yearProgram ?? '',
		linkedin: member.linkedin || undefined
	};
}

export function loadSubcommitteePage(key: SubcommitteePageKey) {
	return async ({ url }: { url: URL }) => {
		const allMembers: SubcommitteeMember[] = await getFromCMS(subcommitteeMembersQuery);
		const meta = subcommitteePages[key];

		return {
			members: filterSubcommitteeMembers(allMembers ?? [], key),
			title: meta.title,
			seoTitle: meta.seoTitle,
			seoDescription: meta.seoDescription,
			canonical: url.href
		};
	};
}
