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
	{ type: 'link', href: '/council', label: 'Council' },
	{
		type: 'group',
		label: 'Subcommittee',
		items: [
			{ href: '/social-subcom', label: 'Social Committee' },
			{ href: '/external-subcom', label: 'External Committee' },
			{ href: '/dev-team', label: 'Dev Team' },
			{ href: '/ecsessbits', label: 'ECSESS Bits' }
		]
	},
	{ type: 'link', href: '/alumni', label: 'Alumni' },
	{ type: 'link', href: '/partnership', label: 'Partnership' },
	{ type: 'link', href: '/join', label: 'Join ECSESS' },
	{ type: 'link', href: '/resources', label: 'Resources' }
];
