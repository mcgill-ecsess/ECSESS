import { json } from '@sveltejs/kit';
import { availability } from '$lib/partnership/availability';
import { codejamTiers, factoryTierThresholds, modules, tierThresholds } from '$lib/partnership/data';
import { calculateTier } from '$lib/partnership/logic';

export async function POST({ request }) {
	let payload: { selectedModules?: string[]; codejamTierId?: string } | null = null;
	try {
		payload = await request.json();
	} catch {
		payload = null;
	}

	if (!payload) {
		return json({ ok: false, reason: 'Invalid request payload.' }, { status: 400 });
	}

	const selectedModules = Array.isArray(payload.selectedModules) ? payload.selectedModules : [];
	const codejamTierId = typeof payload.codejamTierId === 'string' ? payload.codejamTierId : '';

	const moduleTotal = modules
		.filter(
			(module) =>
				selectedModules.includes(module.id) &&
				module.category !== 'factory' &&
				module.category !== 'codejam'
		)
		.reduce((sum, module) => sum + module.price, 0);

	const factoryTotal = modules
		.filter((module) => selectedModules.includes(module.id) && module.category === 'factory')
		.reduce((sum, module) => sum + module.price, 0);

	const codejamTier = codejamTiers.find((tier) => tier.id === codejamTierId) ?? null;

	if (codejamTier?.id === 'name_partner' && !availability.codejamNamePartnerAvailable) {
		return json(
			{ ok: false, reason: 'CodeJam Name Partner is currently reserved.' },
			{ status: 409 }
		);
	}

	const ecsessTotal = moduleTotal;
	const total = ecsessTotal + (codejamTier?.price ?? 0) + factoryTotal;
	const tier = calculateTier(ecsessTotal, tierThresholds);
	const factoryTier = calculateTier(factoryTotal, {
		silver: factoryTierThresholds.silver,
		gold: factoryTierThresholds.gold,
		platinum: factoryTierThresholds.platinum,
		strategic: Number.POSITIVE_INFINITY
	});

	if (tier === 'platinum' && !availability.platinumAvailable) {
		return json(
			{ ok: false, reason: 'Platinum partnership is currently reserved.' },
			{ status: 409 }
		);
	}

	return json({
		ok: true,
		total,
		ecsessTotal,
		codejamTotal: codejamTier?.price ?? 0,
		factoryTotal,
		tier,
		factoryTier,
		platinumReserved: !availability.platinumAvailable && ecsessTotal >= tierThresholds.platinum
	});
}
