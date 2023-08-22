import Spin from './index.svelte';
import type { SpinOptions } from './types';

const mountSpin = (options: SpinOptions, target: HTMLElement) => {
	return new Spin({
		target: target,
		props: {
			...options,
			target
		}
	});
};

const SpinFn = (node: HTMLElement, options: SpinOptions) => {
	const { show, fullScreen } = options;
	let SpinInst: Spin;
	const initSpin = () => {
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
