import { BROWSER } from 'esm-env';
import { IKunUncertainFunction } from './types';
export const getStyle = (element: HTMLElement, styleName: string): string => {
	if (!BROWSER || !element || !styleName) return '';

	let key = camelize(styleName);
	if (key === 'float') key = 'cssFloat';
	try {
		const style = (element.style as any)[key];
		if (style) return style;
		const computed: any = document.defaultView?.getComputedStyle(element, '');
		return computed ? computed[key] : '';
	} catch {
		return (element.style as any)[key];
	}
};

const cacheStringFunction = (fn: IKunUncertainFunction) => {
	const cache = Object.create(null);
	return (str: string) => {
		const hit = cache[str];
		return hit || (cache[str] = fn(str));
	};
};
const camelizeRE = /-(\w)/g;
/**
 * @private
 */
const camelize = cacheStringFunction((str: string) => {
	return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});
