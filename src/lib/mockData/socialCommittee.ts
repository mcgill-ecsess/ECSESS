import type { CouncilMember } from '$lib/schemas';

export const socialCommittee: CouncilMember[] = [
	{
		name: 'Jane Doe',
		email: 'jane.doe@mail.mcgill.ca',
		position: 'Social Committee Chair',
		positionDescription:
			'Leads the Social Committee, setting the vision for ECSESS events and coordinating the team throughout the year.',
		image: '',
		yearProgram: 'U3 Software Engineering'
	},
	{
		name: 'Sam Lee',
		email: 'sam.lee@mail.mcgill.ca',
		position: 'Events Coordinator',
		positionDescription: 'Plans and runs ECSESS social events from start to finish, including logistics and venue booking.',
		image: '',
		yearProgram: 'U2 Computer Engineering'
	},
	{
		name: 'Priya Nair',
		email: 'priya.nair@mail.mcgill.ca',
		position: 'Marketing Coordinator',
		positionDescription: 'Designs promotional content and manages social media announcements for upcoming events.',
		image: '',
		yearProgram: 'U2 Electrical Engineering'
	},
	{
		name: 'Marc Tremblay',
		email: 'marc.tremblay@mail.mcgill.ca',
		position: 'Logistics Coordinator',
		positionDescription: 'Handles vendor bookings, budgeting, and on-site setup for social events.',
		image: '',
		yearProgram: 'U3 Software Engineering'
	},
	{
		name: 'Aisha Khan',
		email: 'aisha.khan@mail.mcgill.ca',
		position: 'U1 Social Representative',
		positionDescription: 'Represents first-year students and gathers feedback on social programming.',
		image: '',
		yearProgram: 'U1 Computer Engineering'
	},
	{
		name: 'Liam O’Connor',
		email: 'liam.oconnor@mail.mcgill.ca',
		position: 'U0 Social Representative',
		positionDescription: 'Represents Frosh-year students and helps plan orientation-focused social events.',
		image: '',
		yearProgram: 'U0 Engineering'
	}
];
