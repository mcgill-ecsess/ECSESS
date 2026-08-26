/** McGill semester label from a date (office hours / sponsors "last updated"). */
export function formatMcGillSemester(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	const month = d.getMonth() + 1;
	const year = d.getFullYear();

	if (month >= 1 && month <= 4) return `Winter ${year} Semester`;
	if (month >= 8 && month <= 12) return `Fall ${year} Semester`;
	return 'Closed for the summer';
}
