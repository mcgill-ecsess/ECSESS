import type { InputValue } from '@portabletext/svelte';

export type EventPost = {
	id: string;
	name: string;
	description: string;
	date: string;
	time: string;
	location: string;
	thumbnail: string;
	category: EventCategory;
	links: LinkType[];
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
};

export type Resource = {
	title: string;
	url: string;
	description: string;
};

export type Sponsors = {
	name: string;
	url: string;
	tier: string;
	logo: string;
};

export type Benefits = {
	benefit: string;
	category: string;
	description: string;
	platinum: string;
	gold: string;
	silver: string;
	custom: string;
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
