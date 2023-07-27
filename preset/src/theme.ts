import type { Theme } from '@unocss/preset-uno';

// 獲得主題顔色，根據主題前綴匹配主題color

export default {
	colors: {
		'primary': 'var(--ikun-teal-400)',
		'primary-100': 'var(--ikun-teal-100)',
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
