import type { Theme } from '@unocss/preset-uno';
import { extend } from 'baiwusanyu-utils';
export const defaultTheme = {
	colors: {
		'ikun-white': 'var(--ikun-white)',
		'ikun-black': 'var(--ikun-black)',
		'ikun-dark': 'var(--ikun-dark-50)',
		'ikun-dark-100': 'var(--ikun-dark-100)',
		'ikun-dark-200': 'var(--ikun-dark-200)',
		'ikun-dark-300': 'var(--ikun-dark-300)',
		'ikun-dark-400': 'var(--ikun-dark-400)',
		'ikun-dark-500': 'var(--ikun-dark-500)',
		'ikun-dark-600': 'var(--ikun-dark-600)',
		'ikun-dark-700': 'var(--ikun-dark-700)',
		'ikun-dark-800': 'var(--ikun-dark-800)',
		'ikun-dark-900': 'var(--ikun-dark-900)',
		'ikun-dark-950': 'var(--ikun-dark-950)',
		'ikun-disabled': 'var(--ikun-zinc-200)',
		'ikun-primary': 'var(--ikun-teal-400)',
		'ikun-primary-100': 'var(--ikun-teal-100)',
		'ikun-error': 'var(--ikun-rose-400)',
		'ikun-error-100': 'var(--ikun-rose-100)',
		'ikun-warning': 'var(--ikun-amber-400)',
		'ikun-warning-100': 'var(--ikun-amber-100)',
		'ikun-info': 'var(--ikun-gray-600)',
		'ikun-info-100': 'var(--ikun-gray-200)',
		'ikun-success': 'var(--ikun-green-400)',
		'ikun-success-100': 'var(--ikun-green-100)',
		'ikun-tx-base': 'var(--ikun-slate-900)',
		'ikun-tx-gr': 'var(--ikun-slate-400)',
		'ikun-bd-base': 'var(--ikun-zinc-300)'
	},
	fontFamily: {
		sans: 'Avenir, Helvetica, Arial, sans-serif'
	}
} as Theme;

const getAnimation = (themeColor: string) => {
	return {
		keyframes: {
			'ikun-checking': `{
			 		0% { box-shadow: 0 0 0 2px rgba(${themeColor},0.4)}
          60% { box-shadow: 0 0 0 4px rgba(${themeColor},0.2)}
          80% { box-shadow: 0 0 0 6px rgba(${themeColor},0.1)}
          100% { box-shadow: 0 0 0 8px rgba(${themeColor},0.05)}
					}`,
			'ikun-switching': `{
			 	  0% { box-shadow: 0 0 0 2px rgba(${themeColor},0.4)}
          60% { box-shadow: 0 0 0 4px rgba(${themeColor},0.2)}
          80% { box-shadow: 0 0 0 6px rgba(${themeColor},0.1)}
          100% { box-shadow: 0 0 0 8px rgba(${themeColor},0.05)}
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

export const setMainColorToTheme = (theme: Theme, themeColorRGB: string) => {
	theme.colors!['ikun-main'] = `rgb(${themeColorRGB})`;
	theme.animation = extend(theme.animation || {}, getAnimation(themeColorRGB));
	return theme;
};
