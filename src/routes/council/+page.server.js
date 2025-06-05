import { getFromCMS } from 'utils/utils.js';

// needs to concat and format this text
const query = `*[_type == "members"]`;

export const load = async () => {
	return {
		members: await getFromCMS(query)
	};
};
