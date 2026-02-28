export type EngagementFocus = 'networking' | 'codejam' | 'factory' | 'combination';

export type ModuleCategory = 'networking' | 'codejam' | 'factory' | 'media';

export type Module = {
	id: string;
	category: ModuleCategory;
	name: string;
	price: number;
	description: string;
	deliverables: string[];
	tierEligible: boolean;
};

export type CodeJamTier = {
	id: string;
	category: 'codejam';
	name: string;
	price: number;
	exclusivity: boolean;
	contributesToEcsessTier: boolean;
};

export type FactoryTierThresholds = {
	silver: number;
	gold: number;
	platinum: number;
};

export type TierThresholds = {
	silver: number;
	gold: number;
	platinum: number;
	strategic: number;
};

export type Availability = {
	platinumAvailable: boolean;
	codejamNamePartnerAvailable: boolean;
};

export type TierId = 'none' | 'silver' | 'gold' | 'platinum' | 'strategic';
