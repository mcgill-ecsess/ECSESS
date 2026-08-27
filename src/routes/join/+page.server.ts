import { getFromCMS } from '$lib/utils.js';
import type { Election } from '$lib/schemas';

const electionQuery = `*[_id == "election"][0]{
    isElectionSeason,
    "keyDates": keyDates[]{ title, period },
    "resources": resources[]{ title, url },
    "positions": positions[]{ title, type },
    contact{ name, email }
  }`;

export const load = async ({ url }: { url: URL }) => {
	const election = (await getFromCMS(electionQuery)) as Election | null;

	return {
		canonical: url.href,
		isElectionSeason: election?.isElectionSeason ?? false,
		keyDates: election?.keyDates ?? [],
		resources: (election?.resources ?? []).filter((r) => r?.title && r?.url),
		positions: election?.positions ?? [],
		contact: election?.contact ?? null
	};
};
