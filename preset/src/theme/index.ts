import type { Theme } from '@unocss/preset-uno';

const PREFIX_THEME = '--ikun-theme';

// 獲得主題顔色，根據主題前綴匹配主題color
const getColorsTheme = (theme: string) => {
	return {
		[`${theme}`]: `var(${PREFIX_THEME}-${theme}Hsl)`,
		[`${theme}Base`]: `var(${PREFIX_THEME}-${theme})`,
		[`${theme}Light`]: `var(${PREFIX_THEME}-${theme}Light)`,
		[`${theme}LightHover`]: `var(${PREFIX_THEME}-${theme}LightHover)`,
		[`${theme}LightActive`]: `var(${PREFIX_THEME}-${theme}LightActive)`,
		[`${theme}LightContrast`]: `var(${PREFIX_THEME}-${theme}LightContrast)`,
		[`${theme}Border`]: `var(${PREFIX_THEME}-${theme}Border)`,
		[`${theme}BorderHover`]: `var(${PREFIX_THEME}-${theme}BorderHover)`,
		[`${theme}BorderActive`]: `var(${PREFIX_THEME}-${theme}BorderActive)`,
		[`${theme}SolidHover`]: `var(${PREFIX_THEME}-${theme}SolidHover)`,
		[`${theme}SolidContrast`]: `var(${PREFIX_THEME}-${theme}SolidContrast)`,
		[`${theme}Shadow`]: `var(${PREFIX_THEME}-${theme}Shadow)`
	};
};

export default {
	colors: {
		// 基於主題的顔色
		...getColorsTheme('primary'),
		...getColorsTheme('secondary'),
		...getColorsTheme('success'),
		...getColorsTheme('warning'),
		...getColorsTheme('error'),
		...getColorsTheme('info'),
		// 固定的主題變量
		context: 'rgba(var(--ikun-c-context),%alpha)',
		baseText: 'var(--ikun-colors-text)',
		baseBorder: 'var(--ikun-colors-border)',
		lightBorder: 'var(--ikun-colors-border-light)',
		darkerBorder: 'var(--ikun-colors-border-darker)',
		baseBackground: 'var(--ikun-colors-background)',
		lightBackground: 'var(--ikun-colors-background-light)',
		placeholder: 'var(--ikun-colors-placeholder)',
		grayBd: 'var(--ikun-colors-background-gray)',
		arrow: 'var(--ikun-colors-arrow)',
		title: 'var(--ikun-colors-title)',
		darkText: 'var(--ikun-colors-text-darker)',
		darkSubText: 'var(--ikun-colors-text-light)',
		grayBg: 'var(--ikun-colors-grayBg)',
		embed: 'var(--ikun-colors-embed)',
		darkContext: 'var(--ikun-colors-darkContext)',
		lightContext: 'var(--ikun-colors-lightContext)'
	},
	fontFamily: {
		sans: 'Avenir, Helvetica, Arial, sans-serif'
	},
	boxShadow: {
		xs: 'var(--un-shadow-inset) 0 1px 1px 0 var(--un-shadow-color, rgba(0,0,0,0.03))',
		switch:
			'calc(var(--k-switch-offset) * -1) 0 0 2px var(--k-switch-bc) inset, 0 0 0 2px var(--k-switch-bc) inset;',
		switchActive:
			'calc(var(--k-switch-offset)) 0 0 2px var(--k-switch-c) inset, 0 0 0 2px var(--k-switch-c) inset;',
		trigger: '0px 4px 10px #0000001a',
		cardMD: '0px 0px 12px rgb(0 0 0 / 12%)',
		cardSM: '0px 0px 6px rgb(0 0 0 / 12%)'
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
