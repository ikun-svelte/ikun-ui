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

const SpinFn = <T>(node: HTMLElement, options: SpinOptions<T>, setInstance?: (inst: Spin) => void) => {
	const { show, fullScreen } = options;
	const finalOption = options;
	Reflect.deleteProperty(finalOption, 'fullScreen');
	let spinInst: Spin
	const initSpin = () => {
		spinInst = mountSpin<T>(finalOption, fullScreen ? document.body : node);
		setInstance && setInstance(spinInst)
	};
	if (show) {
		initSpin();
	}
	return {
		update<T>(options: SpinOptions<T>) {
			if (spinInst) {
				spinInst.$set({ show: options.show });
			} else {
				initSpin();
			}
		}
	};
};


export const KSpin = SpinFn;

/**
 * @internal
 */
export const useKSpin = () => {
	let SpinInst: Spin
	function getSpinInst(inst: Spin){
		return inst
	}

	function setSpinInst(inst: Spin){
		SpinInst = inst
	}

	return {
		KSpin: <T>(node: HTMLElement, options: SpinOptions<T>) => SpinFn(node, options, setSpinInst),
		getSpinInst: () => {
			return getSpinInst(SpinInst)
		}
	}
};
