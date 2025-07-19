export type EventPost = {
	id: string;
	title: string;
	description: string;
	date: string;
	time: string;
	location: string;
	image: string;
	link: string;
	category: string;
	payment: string; // event payment link (e.g., Zeffy)
};

export type FAQ = {
	question: string;
	answer: string;
}

import type { InputValue } from '@portabletext/svelte';

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

export type Redirect = { shortname: string; url: string };
