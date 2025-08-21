import { getFromCMS } from '$lib/utils.js';

// needs to concat and format this text
//Todo: figure out why its not grabbing the links and images
const eventQuery = `*[_type == "events"]{
  name,
  category,
  date,
  location,
  description,
  reglink, 
  paylink,
  "thumbnail": thumbnail.asset->url, 
  "lastUpdated": _updatedAt,
}`;

export const load = async () => {
	return {
		events: await getFromCMS(eventQuery)
	};
};
