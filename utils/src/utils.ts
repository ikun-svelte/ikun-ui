export const isRewritten = (target: Record<string, any>): boolean => {
	return (
		target.toString !== Object.prototype.toString &&
		!target.toString.toString().includes('[native code]')
	);
};

/**
 * to converts the kebab case into pascal case
 * e.g., pnpm run new check-box -> `CheckBox`
 */
export const kebabToPascal = (name: string): string => {
	return name
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
};
