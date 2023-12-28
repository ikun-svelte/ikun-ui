import { BROWSER } from 'esm-env';
import { getStyle } from './style';

export const isScroll = (el: HTMLElement, isVertical?: boolean): boolean => {
	if (!BROWSER) return false;

	const key = (
		{
			undefined: 'overflow',
			true: 'overflow-y',
			false: 'overflow-x'
		} as const
	)[String(isVertical)]!;
	const overflow = getStyle(el, key);
	return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s));
};

export const getScrollContainer = (
	el: HTMLElement,
	isVertical?: boolean
): Window | HTMLElement | undefined => {
	if (!BROWSER) return;

	let parent: HTMLElement = el;
	while (parent) {
		if ([window, document, document.documentElement].includes(parent)) return window;

		if (isScroll(parent, isVertical)) return parent;

		parent = parent.parentNode as HTMLElement;
	}

	return parent;
};

export const isInContainer = (el?: Element, container?: Element | Window): boolean => {
	if (!BROWSER || !el || !container) return false;

	const elRect = el.getBoundingClientRect();

	let containerRect: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>;
	if (container instanceof Element) {
		containerRect = container.getBoundingClientRect();
	} else {
		containerRect = {
			top: 0,
			right: window.innerWidth,
			bottom: window.innerHeight,
			left: 0
		};
	}
	return (
		elRect.top < containerRect.bottom &&
		elRect.bottom > containerRect.top &&
		elRect.right > containerRect.left &&
		elRect.left < containerRect.right
	);
};
