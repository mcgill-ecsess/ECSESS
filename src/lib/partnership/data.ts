import type {
	CodeJamTier,
	EngagementFocus,
	FactoryTierThresholds,
	Module,
	ModuleCategory,
	TierThresholds
} from './types';

export const moduleCategoryMeta: { id: ModuleCategory; label: string; description: string }[] = [
	{
		id: 'networking',
		label: 'Networking Activations',
		description: 'Year-round engagement touchpoints anchored in ECSESS community programming.'
	},
	{
		id: 'codejam',
		label: 'CodeJam Activations',
		description: 'Hackathon sponsorship tiers with clear deliverables and visibility.'
	},
	{
		id: 'factory',
		label: 'The Factory Activations',
		description: 'Hardware lab and build-focused opportunities with ongoing student access.'
	},
	{
		id: 'media',
		label: 'Media & Exposure Activations',
		description: 'Digital visibility across ECSESS channels and campaign placements.'
	}
];

export const focusOptions: { id: EngagementFocus; label: string; description: string }[] = [
	{
		id: 'networking',
		label: 'Networking & Year-Round Engagement',
		description: 'Prioritize student-facing activations throughout the academic year.'
	},
	{
		id: 'codejam',
		label: 'CodeJam Hackathon',
		description: 'Concentrate on the annual CodeJam hackathon experience.'
	},
	{
		id: 'factory',
		label: 'The Factory (Hardware Lab & Hardware Hackathon)',
		description: 'Support hardware innovation, lab access, and build events.'
	},
	{
		id: 'combination',
		label: 'Combination of the Above',
		description: 'Blend multiple engagement streams into one unified partnership.'
	}
];

// Placeholder activation modules. Replace with the official ECSESS activation catalog.
export const modules: Module[] = [
	{
		id: 'networking_info_session',
		category: 'networking',
		name: 'Industry Info Session Presence',
		price: 1200,
		description: 'Reserved seating and visibility at a student-facing info session.',
		deliverables: ['On-site booth', 'Logo on slide deck', 'Resume access'],
		tierEligible: true
	},
	{
		id: 'networking_mixer',
		category: 'networking',
		name: 'Networking Night Sponsor',
		price: 900,
		description: 'Brand presence at an ECSESS networking night.',
		deliverables: ['Event recognition', 'Recruitment booth', 'Post-event attendee list'],
		tierEligible: true
	},
	{
		id: 'networking_resume_access',
		category: 'networking',
		name: 'Resume Book Access',
		price: 500,
		description: 'Access to curated ECSESS resume book for recruitment follow-up.',
		deliverables: ['Resume book access', 'Targeted roles summary'],
		tierEligible: true
	},
	{
		id: 'networking_lounge_branding',
		category: 'networking',
		name: 'Lounge Branding Placement',
		price: 750,
		description: 'Brand visibility inside the ECSESS lounge.',
		deliverables: ['Logo placement', 'Monthly spotlight'],
		tierEligible: true
	},
	{
		id: 'factory_workshop',
		category: 'factory',
		name: 'Hardware Workshop Support',
		price: 800,
		description: 'Support a hands-on workshop in The Factory lab.',
		deliverables: ['Workshop branding', 'Mentor access', 'Follow-up spotlight'],
		tierEligible: true
	},
	{
		id: 'factory_lab_branding',
		category: 'factory',
		name: 'Lab Branding Placement',
		price: 600,
		description: 'Long-term visibility inside The Factory lab space.',
		deliverables: ['Logo placement', 'Quarterly feature', 'Recruitment touchpoint'],
		tierEligible: true
	},
	{
		id: 'factory_equipment_sponsor',
		category: 'factory',
		name: 'Equipment Sponsor',
		price: 900,
		description: 'Sponsor a hardware equipment upgrade in The Factory.',
		deliverables: ['Equipment plaque', 'Workshop mention'],
		tierEligible: true
	},
	{
		id: 'factory_demo_day',
		category: 'factory',
		name: 'Factory Demo Day Partner',
		price: 1100,
		description: 'Presence at the Factory demo day showcase.',
		deliverables: ['Demo day booth', 'Mentor access'],
		tierEligible: true
	},
	{
		id: 'media_newsletter',
		category: 'media',
		name: 'Newsletter Feature',
		price: 400,
		description: 'Featured placement in ECSESS student newsletter.',
		deliverables: ['Dedicated spotlight', 'Tracking link', 'Social follow-up'],
		tierEligible: true
	},
	{
		id: 'media_social_campaign',
		category: 'media',
		name: 'Social Media Campaign',
		price: 350,
		description: 'Multi-post social campaign highlighting recruiting or branding goals.',
		deliverables: ['Campaign plan', '3-post series', 'Post metrics report'],
		tierEligible: true
	},
	{
		id: 'media_event_banner',
		category: 'media',
		name: 'Event Banner Placement',
		price: 250,
		description: 'Logo placement on event banners and recap posts.',
		deliverables: ['Banner placement', 'Recap mention'],
		tierEligible: true
	},
	{
		id: 'media_website_logo',
		category: 'media',
		name: 'Website Logo Placement',
		price: 300,
		description: 'Logo placement on ECSESS website sponsor section.',
		deliverables: ['Homepage logo', 'Sponsor page listing'],
		tierEligible: true
	}
];

export const codejamTiers: CodeJamTier[] = [
	{
		id: 'kilobyte',
		category: 'codejam',
		name: 'Kilobyte',
		price: 750,
		exclusivity: false,
		contributesToEcsessTier: false
	},
	{
		id: 'megabyte',
		category: 'codejam',
		name: 'Megabyte',
		price: 1500,
		exclusivity: false,
		contributesToEcsessTier: false
	},
	{
		id: 'gigabyte',
		category: 'codejam',
		name: 'Gigabyte',
		price: 3000,
		exclusivity: false,
		contributesToEcsessTier: false
	},
	{
		id: 'terabyte',
		category: 'codejam',
		name: 'Terabyte',
		price: 5000,
		exclusivity: false,
		contributesToEcsessTier: false
	},
	{
		id: 'name_partner',
		category: 'codejam',
		name: 'Name Partner',
		price: 7000,
		exclusivity: true,
		contributesToEcsessTier: false
	}
];

export const factoryTierThresholds: FactoryTierThresholds = {
	silver: 500,
	gold: 1000,
	platinum: 2000
};

export const tierThresholds: TierThresholds = {
	silver: 1500,
	gold: 3000,
	platinum: 6000,
	strategic: 10000
};
