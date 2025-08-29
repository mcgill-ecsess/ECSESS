import type { EventPost } from '$lib/schemas';
import { getFromCMS } from '$lib/utils.js';

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
	let listOfEvents: EventPost[] = await getFromCMS(eventQuery);
	//TODO: Why is this mad?
	let sortedEvents = listOfEvents.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	return {
		events: sortedEvents
	};
};
