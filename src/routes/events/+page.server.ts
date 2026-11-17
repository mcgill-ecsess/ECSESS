import type { EventPost } from '#lib/schemas.ts';
import { getFromCMS } from '#lib/utils.js';
import { getEventStartTime } from '#lib/events.js';

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
	const listOfEvents: EventPost[] = await getFromCMS(eventQuery);
	const events = listOfEvents.sort((a, b) => getEventStartTime(b) - getEventStartTime(a));

	return {
		events,
		canonical: url.href
	};
};
