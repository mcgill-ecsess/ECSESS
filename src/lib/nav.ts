export type NavItem = {
	href: string;
	label: string;
};

export type NavLink = {
	type: 'link';
	href: string;
	label: string;
};

export type NavGroup = {
	type: 'group';
	label: string;
	items: NavItem[];
};

export type NavEntry = NavLink | NavGroup;

export const navConfig: NavEntry[] = [
	{ type: 'link', href: '/events', label: 'Events' },
	{
		type: 'group',
		label: 'Council',
		items: [
			{ href: '/council', label: 'Council' },
			{ href: '/socialcom', label: 'Social Committee' },
			{ href: '/externalcom', label: 'External Committee' },
			{ href: '/devteam', label: 'Dev Team' },
			{ href: '/bits', label: 'ECSESS Bits' },
			{ href: '/alumni', label: 'ECSESS Alumni' }
		]
	},
	{ type: 'link', href: '/join', label: 'Join ECSESS' },
	{ type: 'link', href: '/partnership', label: 'Partnership' },
	{ type: 'link', href: '/resources', label: 'Resources' }
];
