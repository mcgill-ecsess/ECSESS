import type { SubcommitteeMember } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';
import {
	filterSubcommitteeMembers,
	subcommitteeMembersQuery,
	subcommitteePages,
	type SubcommitteePageKey
} from '$lib/subcommittee';

/** Server-only: must not be imported from client components (uses `$env/static/private`). */
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
