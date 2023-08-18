import Loading from './index.svelte';

// types

import type { LoadingOptions } from './types.d';

const mountLoading = (options: LoadingOptions, target: HTMLElement) => {
	return new Loading({
		target: target,
		props: {
			...options
		}
	});
};

const loadingFn = (node: HTMLElement, options: LoadingOptions) => {
	const { show, fullScreen } = options;
	let LoadingInst: Loading;
	const initLoading = () => {
		node.classList.add('k-loading--parent__relative');
		LoadingInst = mountLoading(options, fullScreen ? document.body : node);
	};
	if (show) {
		initLoading();
	}
	return {
		update(options: LoadingOptions) {
			if (LoadingInst) {
				LoadingInst.$set({ show: options.show });
			} else {
				initLoading();
			}
		}
	};
};

export const KLoading = loadingFn;
