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
	let camelCase: string = name[0].toLocaleUpperCase();
	let point: number = 1;
	while (point < name.length) {
		if (name[point] === '-') {
			++point;
			camelCase += name[point].toUpperCase();
		} else {
			camelCase += name[point];
		}
		point++;
	}
	return camelCase;
};
