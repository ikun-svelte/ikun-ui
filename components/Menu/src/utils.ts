import type { KMenuInstance, KMenuInstanceOption } from './types';

export const createKMenu = (options: KMenuInstanceOption): KMenuInstance => {
	return {
		/**
		 * @internal
		 */
		__propHandleEvtMap: [],
		__dynamicProps: {
			...options
		}
	};
};

export function transitionIn(node: HTMLElement) {
	return {
		duration: 300,
		tick: (t: number) => {
			if (t === 0) {
				node.style.overflow = 'hidden';
				node.style.transition = 'height 0.3s';
				node.style.height = '0';
			} else if (t === 100) {
				node.style.removeProperty('height');
			} else {
				node.style.height = node.scrollHeight + 'px';
			}
		}
	};
}

export function transitionOut(node: HTMLElement) {
	return {
		duration: 300,
		tick: (t: number) => {
			if (t === 0) {
				node.style.overflow = 'hidden';
				node.style.transition = 'height 0.3s';
				node.style.height = node.scrollHeight + 'px';
			} else if (t === 100) {
				node.style.removeProperty('height');
			} else {
				node.style.height = '0';
			}
		}
	};
}
