import type { Theme } from '@unocss/preset-uno';
import { extend } from 'baiwusanyu-utils';
// TODO: 根據主題色設置dark模式下的陰影
// TODO: how to set scroll bar style ?
// TODO: 根據主題色設置input focus 颜色
export const defaultTheme = {
	colors: {
		disabled: 'var(--ikun-zinc-200)',

		primary: 'var(--ikun-teal-400)',
		'primary-100': 'var(--ikun-teal-100)',

		error: 'var(--ikun-rose-400)',
		'error-100': 'var(--ikun-rose-100)',

		warning: 'var(--ikun-amber-400)',
		'warning-100': 'var(--ikun-amber-100)',

		info: 'var(--ikun-slate-400)',
		'info-100': 'var(--ikun-slate-100)',

		success: 'var(--ikun-green-400)',
		'success-100': 'var(--ikun-green-100)',

		'tx-base': 'var(--ikun-slate-900)',
		'tx-gr': 'var(--ikun-slate-400)',

		'bd-base': 'var(--ikun-zinc-300)'
	},
	fontFamily: {
		sans: 'Avenir, Helvetica, Arial, sans-serif'
	}
} as Theme;

const setAnimation = (mainColor: string) => {
	return {
		keyframes: {
			'ikun-checking': `{
			 		0% { box-shadow: 0 0 0 2px rgba(${mainColor},0.4)}
          60% { box-shadow: 0 0 0 4px rgba(${mainColor},0.2)}
          80% { box-shadow: 0 0 0 6px rgba(${mainColor},0.1)}
          100% { box-shadow: 0 0 0 8px rgba(${mainColor},0.05)}
					}`,
			'ikun-switching': `{
			 	  0% { box-shadow: 0 0 0 2px rgba(${mainColor},0.4)}
          60% { box-shadow: 0 0 0 4px rgba(${mainColor},0.2)}
          80% { box-shadow: 0 0 0 6px rgba(${mainColor},0.1)}
          100% { box-shadow: 0 0 0 8px rgba(${mainColor},0.05)}
			}`
		},
		durations: {
			'ikun-checking': '.3s',
			'ikun-switching': '.3s'
		},
		timingFns: {
			'ikun-checking': 'linear',
			'ikun-switching': 'linear'
		}
	};
};

export const setMainColorToTheme = (theme: Theme, mainColorRGB: string) => {
	theme.colors!.main = `rgb(${mainColorRGB})`;
	theme.animation = extend(theme.animation || {}, setAnimation(mainColorRGB));
	return theme;
};
