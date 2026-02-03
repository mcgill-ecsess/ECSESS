/**
 * Get initials from a name (e.g. "Jane Doe" → "JD", "Mary Jane Watson" → "MJW").
 * Uses first letter of up to 3 words. Safe for null/undefined/empty.
 */
export function getInitials(name: string | null | undefined): string {
	if (name == null || typeof name !== 'string') return '';
	const words = name.trim().split(/\s+/).filter(Boolean);
	if (words.length === 0) return '';
	return words
		.slice(0, 3)
		.map((w) => w.charAt(0).toUpperCase())
		.join('');
}
