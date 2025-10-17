// import type { EventPost } from '$lib/schemas';
// import { getFromCMS } from '$lib/utils.js';

// const eventQuery = `*[_type == "events"]{
//   name,
//   category,
//   date,
//   location,
//   description,
//   reglink,
//   paylink,
//   "thumbnail": thumbnail.asset->url+"?h=800&fm=webp",
//   "lastUpdated": _updatedAt,
// }`;

// export const load = async ({ url }) => {
// 	let listOfEvents: EventPost[] = await getFromCMS(eventQuery);

// 	let sortedEvents = listOfEvents.sort(
// 		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
// 	);

// 	return {
// 		events: sortedEvents,
// 		canonical: url.href
// 	};
// };

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
  "thumbnail": thumbnail.asset->url+"?h=800&fm=webp", 
  "lastUpdated": _updatedAt,
}`;

// Mock future events for testing
const getMockFutureEvents = (): EventPost[] => {
	const today = new Date();
	const nextWeek = new Date(today);
	nextWeek.setDate(today.getDate() + 7);

	const twoWeeks = new Date(today);
	twoWeeks.setDate(today.getDate() + 14);

	const nextMonth = new Date(today);
	nextMonth.setMonth(today.getMonth() + 1);

	return [
		{
			_id: 'mock-1',
			name: "Antoine's Smash Workshop",
			category: ['technical'],
			date: nextWeek.toISOString(),
			location: 'ECSESS Lounge',
			description: [
				{
					_type: 'block',
					children: [
						{
							_type: 'span',
							text: 'Antoine should reall get gud at smash'
						}
					]
				}
			],
			reglink: 'https://example.com/register',
			paylink: null,
			thumbnail: null,
			lastUpdated: today.toISOString()
		},
		{
			_id: 'mock-2',
			name: 'ECSESS Annual Networking Night',
			category: ['professional', 'social'],
			date: twoWeeks.toISOString(),
			location: 'Trottier ',
			description: [
				{
					_type: 'block',
					children: [
						{
							_type: 'span',
							text: 'I love placeholder text!'
						}
					]
				}
			],
			reglink: 'https://example.com/register',
			paylink: 'https://example.com/payment',
			thumbnail: null,
			lastUpdated: today.toISOString()
		},
		{
			_id: 'mock-3',
			name: 'Midterm Study Session',
			category: ['academic'],
			date: nextMonth.toISOString(),
			location: 'Trottier 5th floor',
			description: [
				{
					_type: 'block',
					children: [
						{
							_type: 'span',
							text: 'TIME TO LOCK THE FUCK IN'
						}
					]
				}
			],
			reglink: null,
			paylink: null,
			thumbnail: null,
			lastUpdated: today.toISOString()
		}
	];
};

export const load = async ({ url }) => {
	let listOfEvents: EventPost[] = await getFromCMS(eventQuery);

	// TEMPORARY: Add mock future events for testing the UI
	const mockEvents = getMockFutureEvents();
	listOfEvents = [...listOfEvents, ...mockEvents];
	// END TEMPORARY - Remove the above two lines when you have real future events

	let sortedEvents = listOfEvents.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return {
		events: sortedEvents,
		canonical: url.href
	};
};

// TODO: Remember to remove mock events once real future events are available in the CMS.
