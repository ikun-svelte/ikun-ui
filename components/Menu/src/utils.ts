import type { KMenuInstance, KMenuInstanceOption } from './types';

export const createKMenu = (
	options: KMenuInstanceOption,
	onOpenChange: KMenuInstance['onOpenChange'],
	onSelect: KMenuInstance['onSelect'],
	onClick: KMenuInstance['onClick'],
): KMenuInstance => {
	return {
		/**
		 * @internal
		 */
		__propHandleEvtMap: [],
		__dynamicProps: {
			...options
		},
		__renderRecord: {},
		onOpenChange,
		onSelect,
		onClick,
	};
};

export function transitionIn(node: HTMLElement) {
	return {
		duration: 300,
		tick: (t: number) => {
			if (t === 0) {
				node.style.height = '0';
			} else if (t === 1) {
				node.style.removeProperty('height');
			} else {
				node.style.height = node.scrollHeight + 'px';
			}
		}
	};
}

export function transitionOut(node: HTMLElement) {
	const orgHeight = node.scrollHeight
	return {
		duration: 300,
		tick: (t: number) => {
			if (t <= 1 && t >= 0.9) {
				node.style.height = orgHeight + 'px';
			} else if (t === 0) {
				node.style.removeProperty('height');
			} else {
				node.style.height = '0';
			}
		}
	};
}

