import { EventLinkKind, type EventPost, type LinkType } from '#lib/schemas.ts';

const DAY_MS = 86_400_000;

const CATEGORY_IMAGES: Record<string, string> = {
	social: '/Social.jpg',
	technical: '/Technical.jpg',
	professional: '/Professional.jpg',
	academic: '/Academic.jpg'
};

export type EventWhenDisplay = {
	date: string;
	time?: string;
};

function parseDate(value?: string): Date | null {
	if (!value) return null;
	const d = new Date(value);
	return Number.isNaN(d.getTime()) ? null : d;
}

function resolveBounds(from?: string, to?: string): { start: Date; end: Date } | null {
	const start = parseDate(from ?? to);
	const end = parseDate(to ?? from);
	return start && end ? { start, end } : null;
}

/** Sanity date-only datetimes are stored at midnight UTC. */
const isDateOnly = (d: Date) => !d.getUTCHours() && !d.getUTCMinutes() && !d.getUTCSeconds();

const sameUtcDay = (a: Date, b: Date) =>
	a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);

const formatDate = (d: Date, includeYear = true, utc = false) =>
	d.toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		...(includeYear && { year: 'numeric' }),
		...(utc && { timeZone: 'UTC' })
	});

const formatTime = (d: Date) =>
	d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

const formatDateTime = (d: Date) =>
	isDateOnly(d) ? formatDate(d, true, true) : `${formatTime(d)}, ${formatDate(d)}`;

/** True when from/to fall on the same UTC calendar day (or only one bound exists). */
export function isSameDayEvent(from?: string, to?: string): boolean {
	const bounds = resolveBounds(from, to);
	return !bounds || sameUtcDay(bounds.start, bounds.end);
}

/**
 * Formats event start/end for cards (`detailed = false`) and dialogs (`detailed = true`):
 * - same day → date line + optional time range line
 * - multi-day card → compact date range on one line
 * - multi-day dialog → detailed start / end datetimes on two lines
 */
export function formatEventWhen(
	from?: string,
	to?: string,
	{ detailed = false } = {}
): EventWhenDisplay {
	const bounds = resolveBounds(from, to);
	if (!bounds) return { date: 'TBA' };

	const { start, end } = bounds;
	if (sameUtcDay(start, end)) {
		const startTime = isDateOnly(start) ? null : formatTime(start);
		const endTime = isDateOnly(end) ? null : formatTime(end);
		const time =
			startTime && endTime
				? `${startTime} – ${endTime}`
				: endTime
					? `ends ${endTime}`
					: (startTime ?? undefined);
		return { date: formatDate(start, true, true), time };
	}

	if (detailed) {
		return { date: formatDateTime(start), time: formatDateTime(end) };
	}

	const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
	return { date: `${formatDate(start, !sameYear, true)} – ${formatDate(end, true, true)}` };
}

/** True when the event has ended (`to`, else 24h after `from`). */
export function isPastEvent(from?: string, to?: string): boolean {
	const endDate = parseDate(to);
	if (endDate) return Date.now() > endDate.getTime();
	const startDate = parseDate(from);
	return startDate ? Date.now() > startDate.getTime() + DAY_MS : false;
}

export function getEventStartTime(event: EventPost): number {
	return parseDate(event.from ?? event.to)?.getTime() ?? 0;
}

export function getEventImage(event: EventPost): string {
	return event.thumbnail || CATEGORY_IMAGES[event.category?.[0] ?? ''] || '/ECSESS.png';
}

export function getEventLink(event: EventPost, kind: EventLinkKind): LinkType | undefined {
	return event.links?.find((l) => l.kind === kind && Boolean(l.url));
}

export function getEventLinks(event: EventPost, kind: EventLinkKind, limit = 4): LinkType[] {
	return (event.links ?? []).filter((l) => l.kind === kind && Boolean(l.url)).slice(0, limit);
}

export function eventMatchesCategory(event: EventPost, category: string): boolean {
	return category === 'allEvents' || Boolean(event.category?.includes(category));
}
