import type { EventPost } from '$lib/schemas';
import { EventLinkKind, type LinkType } from '$lib/schemas';

export function parseEventDate(dateString: string): Date {
	const parsed = new Date(dateString);
	return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function formatEventDate(dateString: string): string {
	const date = parseEventDate(dateString);
	const isMidnight = date.getUTCHours() === 0 && date.getUTCMinutes() === 0;

	if (isMidnight) {
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			timeZone: 'UTC'
		});
	}

	return date.toLocaleDateString('en-US', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
}

export function isPastEvent(dateString: string): boolean {
	const eventDate = parseEventDate(dateString);
	return new Date() > new Date(eventDate.getTime() + 24 * 60 * 60 * 1000);
}

export function getEventLink(event: EventPost, type: EventLinkKind): LinkType[] | null {
	const generalLinks: LinkType[] = [];

	for (const link of event.links ?? []) {
		if (type === EventLinkKind.GENERAL && link.kind === EventLinkKind.GENERAL && link.url !== '') {
			generalLinks.push(link);
			if (generalLinks.length >= 4) break;
		} else if (link.kind === type && link.url !== '') {
			return [link];
		}
	}

	return generalLinks.length > 0 ? generalLinks : null;
}

export function eventMatchesCategory(event: EventPost, category: string): boolean {
	if (category === 'allEvents') return true;
	const eventCategories = event.category ?? [];
	return eventCategories.includes(category);
}
