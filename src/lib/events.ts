import type { EventPost } from '#lib/schemas.ts';
import { EventLinkKind, type LinkType } from '#lib/schemas.ts';

export function parseEventDate(dateString: string): Date {
	const parsed = new Date(dateString);
	return isNaN(parsed.getTime()) ? new Date() : parsed;
}

/** Sanity date-only datetimes are stored at midnight UTC. */
function isDateOnly(date: Date): boolean {
	return date.getUTCHours() === 0 && date.getUTCMinutes() === 0 && date.getUTCSeconds() === 0;
}

function sameUtcDay(a: Date, b: Date): boolean {
	return (
		a.getUTCFullYear() === b.getUTCFullYear() &&
		a.getUTCMonth() === b.getUTCMonth() &&
		a.getUTCDate() === b.getUTCDate()
	);
}

function formatDateOnly(
	date: Date,
	{ includeYear = true }: { includeYear?: boolean } = {}
): string {
	return date.toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		...(includeYear ? { year: 'numeric' as const } : {}),
		timeZone: 'UTC'
	});
}

function formatDateTime(
	date: Date,
	{ includeYear = true }: { includeYear?: boolean } = {}
): string {
	const datePart = date.toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		...(includeYear ? { year: 'numeric' as const } : {})
	});
	return `${formatTime(date)}, ${datePart}`;
}

function formatTime(date: Date): string {
	return date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
}

/** Date + optional second line for event cards / dialogs. */
export type EventWhenDisplay = {
	date: string;
	time?: string;
};

function resolveBounds(from?: string, to?: string): { start: Date; end: Date } | null {
	if (!from && !to) return null;
	const start = parseEventDate(from ?? to!);
	const end = parseEventDate(to ?? from!);
	return { start, end };
}

/** True when from/to fall on the same UTC calendar day (or only one bound exists). */
export function isSameDayEvent(from?: string, to?: string): boolean {
	const bounds = resolveBounds(from, to);
	if (!bounds) return true;
	return sameUtcDay(bounds.start, bounds.end);
}

function sameDayWhen(start: Date, end: Date): EventWhenDisplay {
	const date = formatDateOnly(start);
	const startDateOnly = isDateOnly(start);
	const endDateOnly = isDateOnly(end);

	if (startDateOnly && endDateOnly) return { date };
	if (startDateOnly) return { date, time: `ends ${formatTime(end)}` };
	if (endDateOnly) return { date, time: formatTime(start) };
	return { date, time: `${formatTime(start)} – ${formatTime(end)}` };
}

/**
 * Preview card when:
 * - same day → date row + time row (if times exist)
 * - different days → date-only range (no times)
 */
export function formatEventCardWhen(from?: string, to?: string): EventWhenDisplay {
	const bounds = resolveBounds(from, to);
	if (!bounds) return { date: 'TBA' };

	const { start, end } = bounds;
	if (sameUtcDay(start, end)) return sameDayWhen(start, end);

	const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
	return {
		date: `${formatDateOnly(start, { includeYear: !sameYear })} – ${formatDateOnly(end)}`
	};
}

/**
 * Dialog when:
 * - same day → date row + time row (if times exist)
 * - different days → detailed from / to datetimes on separate rows
 */
export function formatEventDialogWhen(from?: string, to?: string): EventWhenDisplay {
	const bounds = resolveBounds(from, to);
	if (!bounds) return { date: 'TBA' };

	const { start, end } = bounds;
	if (sameUtcDay(start, end)) return sameDayWhen(start, end);

	const startLine = isDateOnly(start) ? formatDateOnly(start) : formatDateTime(start);
	const endLine = isDateOnly(end) ? formatDateOnly(end) : formatDateTime(end);

	return { date: startLine, time: endLine };
}

/** Format a single datetime (date-only when midnight UTC). */
export function formatEventDate(dateString: string): string {
	const date = parseEventDate(dateString);
	return isDateOnly(date) ? formatDateOnly(date) : formatDateTime(date);
}

/** True when the event has ended (`to`, else end of `from` day). */
export function isPastEvent(from?: string, to?: string): boolean {
	if (to) return new Date() > parseEventDate(to);
	if (from) {
		const start = parseEventDate(from);
		return new Date() > new Date(start.getTime() + 24 * 60 * 60 * 1000);
	}
	return false;
}

export function getEventStart(event: EventPost): string | undefined {
	return event.from ?? event.to;
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
