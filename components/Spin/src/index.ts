import Spin from './index.svelte';
import type { SpinOptions } from './types';

const mountSpin = <T>(options: SpinOptions<T>, target: HTMLElement) => {
	return new Spin({
		target: target,
		props: {
			...options,
			target
		}
	});
};

const SpinFn = <T>(node: HTMLElement, options: SpinOptions<T>) => {
	const { show, fullScreen } = options;
	const finalOption = options;
	Reflect.deleteProperty(finalOption, 'fullScreen');
	let SpinInst: Spin;
	const initSpin = () => {
		SpinInst = mountSpin<T>(finalOption, fullScreen ? document.body : node);
	};
	if (show) {
		initSpin();
	}
	return {
		update<T>(options: SpinOptions<T>) {
			if (SpinInst) {
				SpinInst.$set({ show: options.show });
			} else {
				initSpin();
			}
		}
	};
};

export const KSpin = SpinFn;
