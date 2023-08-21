import Spin from './index.svelte';

// types

import type { SpinOptions } from './types.d';

const mountSpin = (options: SpinOptions, target: HTMLElement) => {
	return new Spin({
		target: target,
		props: {
			...options
		}
	});
};

const SpinFn = (node: HTMLElement, options: SpinOptions) => {
	const { show, fullScreen } = options;
	let SpinInst: Spin;
	const initSpin = () => {
		node.classList.add('k-spin--parent__relative');
		SpinInst = mountSpin(options, fullScreen ? document.body : node);
	};
	if (show) {
		initSpin();
	}
	return {
		update(options: SpinOptions) {
			if (SpinInst) {
				SpinInst.$set({ show: options.show });
			} else {
				initSpin();
			}
		}
	};
};

export const KSpin = SpinFn;
