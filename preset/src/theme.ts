import type { Theme } from '@unocss/preset-uno';

// 獲得主題顔色，根據主題前綴匹配主題color
// TODO: 根據主題色設置漣漪
// TODO: 根據主題色設置dark模式下的陰影
// TODO: 根據主題色設置滾動條
// TODO: 根據主題色設置input focus 颜色
export default {
	colors: {
		main: '#ea580c',
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
	},
	boxShadow: {
		xs: 'var(--un-shadow-inset) 0 1px 1px 0 var(--un-shadow-color, rgba(0,0,0,0.03))'
	},
	animation: {
		keyframes: {
			LianYi: `{
          0% { box-shadow: 0 0 0 2px rgb(255 30 30 / 40%) }
          10% { box-shadow: 0 0 0 4px rgb(255 30 30 / 30%) }
          20% { box-shadow: 0 0 0 6px rgb(255 30 30 / 20%) }
          30% { box-shadow: 0 0 0 8px rgb(255 30 30 / 10%) }
          50% { box-shadow: 0 0 0 10px rgb(255 30 30 / 0%) }
          }`,
			'ikun-checking': `{
			 		0% { box-shadow: 0 0 0 2px rgb(255 30 30 / 40%) }
          60% { box-shadow: 0 0 0 4px rgb(255 30 30 / 20%) }
          80% { box-shadow: 0 0 0 6px rgb(255 30 30 / 10%) }
          100% { box-shadow: 0 0 0 8px rgb(255 30 30 / 5%) }
					}`
		},
		durations: {
			LianYi: '2s',
			'ikun-checking': '.3s'
		},
		timingFns: {
			LianYi: 'linear',
			'ikun-checking': 'linear'
		},
		counts: {
			LianYi: 'infinite'
		}
	}
} as Theme;
