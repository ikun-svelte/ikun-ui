import { isArray, isString } from 'baiwusanyu-utils';

// a.b.0 or ['a', 'b', '0']
export const getValueByPath = (path: string | string[], target: Record<string, any>) => {
	const resolvePath = parsePath(path);
	let result: any = target;

	for (const key of resolvePath) {
		if (result && typeof result === 'object' && key in result) {
			result = result[key];
		} else {
			console.warn(`[KFormItem]: The accessed field "${key}" does not exist`);
			return undefined;
		}
	}
	return result;
};

export const setValueByPath = (
	path: string | string[],
	target: Record<string, any>,
	value: unknown
) => {
	const resolvePath = parsePath(path);
	let result: any = target;

	for (let i = 0; i < resolvePath.length - 1; i++) {
		const key = resolvePath[i];
		if (!(key in result)) {
			result[key] = {};
		}
		result = result[key];
	}

	result[resolvePath[resolvePath.length - 1]] = value;
	return target;
};

export const parsePath = (path: string | string[]) => {
	if (isArray(path)) return path as string[];
	if (isString(path)) {
		return (path as string).split('.');
	}
	console.error('[KFormItem]: prop format error');
	return [];
};
