import { getFromCMS } from '$lib/utils.js';

// needs to concat and format this text
const eventQuery = `*[_type == "events"]{
  name,
  category,
  date,
  location,
  description,
  "lastUpdated": _updatedAt,
}`;

export const load = async () => {  
	return {
		events: await getFromCMS(eventQuery),
	};
};
