import { getFromCMS } from 'utils/utils.js';

// needs to concat and format this text
const query = `*[_type == "resources"]{
  title,
  url,
  description,
  "lastUpdated":_updatedAt
}`;

export const load = async () => {
	return {
		resources: await getFromCMS(query)
	};
};
