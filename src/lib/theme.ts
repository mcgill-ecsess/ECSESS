/** Hex values matching `ecsess-*` tokens in `src/app.css` (for Chart.js and canvas APIs). */
export const ECSSESS_CHART_COLORS = {
	400: '#6a9a6a',
	200: '#a9d0a0',
	50: '#e8ffd9'
} as const;

export const DEMOGRAPHICS_CHART_COLORS = [
	ECSSESS_CHART_COLORS[400],
	ECSSESS_CHART_COLORS[200],
	ECSSESS_CHART_COLORS[50]
];
