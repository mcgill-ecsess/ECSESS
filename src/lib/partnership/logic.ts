import type { TierId, TierThresholds } from './types';

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0
});

export function formatCurrency(value: number): string {
	return currencyFormatter.format(value);
}

export function calculateTier(total: number, thresholds: TierThresholds): TierId {
	if (total >= thresholds.strategic) return 'strategic';
	if (total >= thresholds.platinum) return 'platinum';
	if (total >= thresholds.gold) return 'gold';
	if (total >= thresholds.silver) return 'silver';
	return 'none';
}

export function nextTierInfo(total: number, thresholds: TierThresholds) {
	const ordered = [
		{ id: 'silver' as const, label: 'Silver', threshold: thresholds.silver },
		{ id: 'gold' as const, label: 'Gold', threshold: thresholds.gold },
		{ id: 'platinum' as const, label: 'Platinum', threshold: thresholds.platinum },
		{ id: 'strategic' as const, label: 'Strategic', threshold: thresholds.strategic }
	];

	const next = ordered.find((tier) => total < tier.threshold);
	if (!next) return null;

	return {
		id: next.id,
		label: next.label,
		amount: next.threshold - total,
		threshold: next.threshold
	};
}

export function tierLabel(tier: TierId): string {
	switch (tier) {
		case 'silver':
			return 'Silver';
		case 'gold':
			return 'Gold';
		case 'platinum':
			return 'Platinum';
		case 'strategic':
			return 'Strategic';
		default:
			return 'None';
	}
}
