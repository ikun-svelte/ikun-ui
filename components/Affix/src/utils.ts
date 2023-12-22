import type { IKunUncertainFunction } from '@ikun-ui/utils';

export type ScrollTarget = Window | Document | HTMLElement;

export function getScrollTop(target: ScrollTarget): number {
	return target instanceof HTMLElement ? target.scrollTop : window.scrollY;
}

export function getRect(target: ScrollTarget): { top: number; bottom: number } {
	return target instanceof HTMLElement
		? target.getBoundingClientRect()
		: { top: 0, bottom: window.innerHeight };
}

type GetElement = () => HTMLElement;

function unwrapElement<T>(
	target: T | string | GetElement
): T extends HTMLElement ? HTMLElement : HTMLElement | null;
function unwrapElement(target: HTMLElement | string | GetElement) {
	if (typeof target === 'string') return document.querySelector(target);
	if (typeof target === 'function') return target();
	return target;
}

export { unwrapElement };

let onceCbs: IKunUncertainFunction[] = [];
const paramsMap: WeakMap<IKunUncertainFunction, any[]> = new WeakMap();

function flushOnceCallbacks(): void {
	// @ts-ignore
	onceCbs.forEach((cb) => cb(...paramsMap.get(cb)!));
	onceCbs = [];
}

function beforeNextFrameOnce(cb: IKunUncertainFunction, ...params: any[]): void {
	paramsMap.set(cb, params);
	if (onceCbs.includes(cb)) return;
	onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks);
}
export { beforeNextFrameOnce };
