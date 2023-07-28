import type { Theme } from '@unocss/preset-uno';

// 獲得主題顔色，根據主題前綴匹配主題color

export default {
	colors: {
		'primary': 'var(--ikun-teal-400)',
		'primary-100': 'var(--ikun-teal-100)',

		'error': 'var(--ikun-rose-400)',
		'error-100': 'var(--ikun-rose-100)',

		'warning': 'var(--ikun-amber-400)',
		'warning-100': 'var(--ikun-amber-100)',

		'info': 'var(--ikun-slate-400)',
		'info-100': 'var(--ikun-slate-100)',

		'success': 'var(--ikun-green-400)',
		'success-100': 'var(--ikun-green-100)',
	},
	fontFamily: {
		sans: 'Avenir, Helvetica, Arial, sans-serif'
	},
	boxShadow: {
		xs: 'var(--un-shadow-inset) 0 1px 1px 0 var(--un-shadow-color, rgba(0,0,0,0.03))',
	},
	animation: {
		keyframes: {
			switching: `{0%{ box-shadow: 0 0 0 2px #1890ff66; }
        60%{ box-shadow: 0 0 0 4px #1890ff33; }
        80%{ box-shadow: 0 0 0 6px #1890ff1a; }
        100%{ box-shadow: 0 0 0 8px #1890ff0d; }}`
		},
		durations: {
			switching: '0.3s'
		}
	}
} as Theme;
