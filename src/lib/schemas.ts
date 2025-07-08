export interface EventPost {
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
}

export interface CouncilMember {
	role: string;
	name: string;
	email: string;
	image: string;
	major: string;
	year: string;
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

export type OhCMSResponse = {
	day: string;
	startTime: string;
	endTime: string;
	host: {
		name: string;
		position: string;
	};
}[];
