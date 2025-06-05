import { getFromCMS } from 'utils/utils.js';

// needs to concat and format this text
const query = `*[_type == "events"]{
  name,
  category,
  date,
  location,
  description,
  "lastUpdated": _updatedAt,
}`;

export const load = async () => {
	return {
		events: await getFromCMS(query)
	};
};
