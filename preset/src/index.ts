import shortcuts from './shortcuts/index';
import defaultTheme from './theme';
import { lightTheme, darkTheme } from './theme'
import defaultRules from './rules';
import type { Theme } from '@unocss/preset-uno';
import type { Rule, Preset } from "unocss";

export function presetIkun(
	name: string = '@ikun-ui/preset',
	mainColor:string = '#ea580c', // 简单的主题色
	theme: Theme = defaultTheme,
	rules:Rule<Theme>[] = defaultRules){
	theme.colors!.main = mainColor
	return {
		name,
		theme,
		rules,
		shortcuts
	} as Preset<Theme>;
}

export { getSafeList } from './shortcuts/index';
export const presetIkunLight = () => presetIkun('@ikun-ui/preset-light', undefined, lightTheme)
export const presetIkunDark = () => presetIkun('@ikun-ui/preset-dark', undefined, darkTheme)

// 导出颜色和主题对象、规则用于定制化主题
export * from './colors';
export * from './theme';
export * from './rules';
