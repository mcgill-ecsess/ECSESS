import type { InputValue } from '@portabletext/svelte';

export type EventPost = {
	_id?: string;
	name: string;
	description?: InputValue;
	date: string;
	location?: string;
	thumbnail?: string;
	category?: string[];
	links?: LinkType[];
};

export enum EventCategory {
	ALL_EVENTS = 'allEvents',
	ACADEMIC = 'academic',
	PROFESSIONAL = 'professional',
	SOCIAL = 'social',
	TECHNICAL = 'technical'
}

export type LinkType = {
	title: string;
	kind: EventLinkKind;
	url: string;
};
export enum EventLinkKind {
	PAYMENT = 'payment',
	REGISTRATION = 'registration',
	GENERAL = 'general'
}

export type FAQ = {
	question: string;
	answer: string;
};

/** Homepage CMS document fields used across layout / home. */
export type Homepage = {
	notification?: InputValue | null;
	councilPhoto?: string;
	councilGoofyPic?: string;
	faqs?: FAQ[];
	subcommittees?: Subcommittee[];
};

export type Subcommittee = {
	name: string;
	description: string;
	/** Bullet highlights under the description. */
	highlights: string[];
	instagram?: string;
	website?: string;
	/** Lucide-style icon key from CMS (e.g. "wrench", "cpu", "users", "code"). */
	icon?: string;
};

export type OfficeHour = {
	day: string;
	startTime: string;
	endTime: string;
	member: {
		name: string;
		position: string;
	};
};

export type CouncilMember = {
	name: string;
	email: string;
	position: string;
	positionDescription: string;
	image: string; // URL
	yearProgram: string;
	linkedin?: string; // URL to profile, optional
};

export type Resource = {
	title: string;
	url: string;
	description: string;
	/** Always a string[]; empty when missing from CMS. */
	category: string[];
};

export type Partnership = {
	name: string;
	url: string;
	tier: string;
	logo: string;
};

export type Redirect = {
	name: string;
	shortname: string;
	url: string;
};

export type DevTeam = {
	name: string;
	role: string;
	yearProgram: string;
	email: string;
	active: boolean;
	term: string;
	funFact: string;
	github: string;
	image: string; //URL
};

export type ElectionKeyDate = {
	title: string;
	period: string;
};

export type ElectionResource = {
	title: string;
	url: string;
};

export type ElectionPosition = {
	title: string;
	type: string;
};

export type ElectionContact = {
	name: string;
	email: string;
};

export type Election = {
	isElectionSeason: boolean;
	keyDates: ElectionKeyDate[];
	resources: ElectionResource[];
	positions: ElectionPosition[];
	contact: ElectionContact | null;
};
