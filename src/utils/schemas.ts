export default interface CouncilMember {
	name: string;
	email: string;
	position: string;
	positionDescription: string;
	image: string; // URL
	yearProgram: string;
}

export default interface Event {
	category: [string];
	date: string;
	description: any;
	name: string;
	location: string;
	link: string;
	image: string;
	payment: string;
}
