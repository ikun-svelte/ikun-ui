import { isString, isNumber, isArray, isObject } from 'baiwusanyu-utils'
import { isRewritten } from './utils'

export function createCls(
	...args: (
		string | number | Record<string, any> | string[]
	)[]
): string | undefined {
	const hasOwn = {}.hasOwnProperty;
	const classnames: Array<string | number> = []
	for (let i = 0; i < arguments.length; i++) {
		const arg = args[i]
		if (!arg) continue
		if (isString(arg) || isNumber(arg)) {
			classnames.push((arg as string | number))
		} else if (isArray(arg)) {
			if (!(arg as string[]).length) return;
			const inner = createCls(arg)
			if (inner) {
				classnames.push(inner)
			}
		} else if (isObject(arg)) {
			if (isRewritten(arg as Record<string, any>)) {
				classnames.push(arg.toString());
				continue;
			}
			for (const key in (arg as Record<string, any>)) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classnames.push(key)
				}
			}
		}
	}
	return classnames.join(' ')
}
