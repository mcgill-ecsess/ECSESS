import type { InputValue } from '@portabletext/svelte';

export type EventPost = {
	id: string;
	name: string;
	description: string;
	date: string;
	time: string;
	location: string;
	thumbnail: string;
	reglink: string;
	category: string;
	paylink: string; // event payment link (e.g., Zeffy)
};

export type Category = 'allEvents' | 'academic' | 'professional' | 'social' | 'technical';


export type FAQ = {
	question: string;
	answer: string;
};

export type HomepageCMSResponse = {
	description: InputValue;
	councilPhoto: string;
	faqs: {
		question: string;
		answer: string;
	}[];
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
	logo: string;
};

export type Redirect = {
	name: string;
	shortname: string;
	url: string;
};
