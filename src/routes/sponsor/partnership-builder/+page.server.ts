import { availability } from '$lib/partnership/availability';

export const load = ({ url }) => {
	return {
		canonical: url.href,
		availability
	};
};
