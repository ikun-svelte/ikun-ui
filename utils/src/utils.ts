export const isRewritten = (target: Record<string, any>): boolean => {
	return (
		target.toString !== Object.prototype.toString &&
		!target.toString.toString().includes('[native code]')
	);
};
