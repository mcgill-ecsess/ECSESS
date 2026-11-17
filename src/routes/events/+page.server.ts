import type { EventPost } from '#lib/schemas.ts';
import { getFromCMS } from '#lib/utils.js';
import { getEventStart } from '#lib/events.js';

const eventQuery = `*[_type == "events"]{
  name,
  category,
  from,
  to,
  location,
  description,
  "links": links[]{
    "kind": kind,
    "title": title,
    "url": url
    },
  "thumbnail": thumbnail.asset->url+"?h=800&fm=webp",
  "lastUpdated": _updatedAt,
}`;

export const load = async ({ url }) => {
	let listOfEvents: EventPost[] = await getFromCMS(eventQuery);

	let sortedEvents = listOfEvents.sort((a, b) => {
		const aStart = getEventStart(a);
		const bStart = getEventStart(b);
		const aTime = aStart ? new Date(aStart).getTime() : 0;
		const bTime = bStart ? new Date(bStart).getTime() : 0;
		return bTime - aTime;
	});

	return {
		events: sortedEvents,
		canonical: url.href
	};
};
