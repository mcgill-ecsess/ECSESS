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
		id: 'flagship_industry_tour',
		category: 'networking',
		name: 'Industry Tour',
		price: 200,
		description: 'Flagship ECSESS industry tour activation.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'flagship_company_crawl',
		category: 'networking',
		name: 'Company Crawl',
		price: 200,
		description: 'Flagship ECSESS company crawl activation.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'flagship_speed_networking',
		category: 'networking',
		name: 'Speed Networking',
		price: 200,
		description: 'Flagship ECSESS speed networking activation.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'flagship_wine_cheese',
		category: 'networking',
		name: 'Wine and Cheese',
		price: 200,
		description: 'Flagship ECSESS wine and cheese activation.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'networking_workshop',
		category: 'networking',
		name: 'Workshop',
		price: 600,
		description: 'Sponsor-led workshop session.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'networking_panel',
		category: 'networking',
		name: 'Panel',
		price: 800,
		description: 'Sponsor participation in an ECSESS panel.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'networking_private_event',
		category: 'networking',
		name: 'Private Networking Event',
		price: 800,
		description: 'Private networking event with ECSESS members.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'networking_info_session',
		category: 'networking',
		name: 'Info Session',
		price: 700,
		description: 'Host a sponsor info session.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'factory_equipment_placement',
		category: 'factory',
		name: 'Equipment Placement / Tool Sponsorship',
		price: 2000,
		description: 'Your company powers the lab — signage, onboarding doc, and demo day mention.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'factory_hackathon_sponsorship',
		category: 'factory',
		name: 'Hardware Hackathon Sponsorship',
		price: 5000,
		description: 'Prize + branding + challenge prompt + judge seat.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'factory_workshop_certification',
		category: 'factory',
		name: 'Workshop / Certification',
		price: 1500,
		description: 'Vendor workshop (ex: FPGA, embedded, robotics).',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'factory_recruiting_tiein',
		category: 'factory',
		name: 'Recruiting Tie-in',
		price: 1200,
		description: 'Curated “hardware talent” resume drop.',
		deliverables: [],
		tierEligible: true
	},
	{
		id: 'factory_lab_branding',
		category: 'factory',
		name: 'Lab Branding',
		price: 1000,
		description: 'Wall plaque / “powered by” station / equipment tags.',
		deliverables: [],
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
	gold: 2000,
	platinum: 5000
};

export const tierThresholds: TierThresholds = {
	silver: 1500,
	gold: 3000,
	platinum: 6000,
	strategic: 10000
};
