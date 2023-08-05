import defaultShortcuts from './shortcuts/index';
import { setMainColorToTheme, defaultTheme } from './theme';
import { defaultRules, setMainColorToRules } from './rules';
import { defaultColors } from './colors';
import type { Theme } from '@unocss/preset-uno';
import type { Preset } from 'unocss';
import { hex2rgba } from '@unocss/preset-mini/utils';
import { UserShortcuts } from 'unocss';

const DEFAULT_COLOR = '#f8a153';
export function presetIkun(
	name: string = '@ikun-ui/preset',
	themeColor: string = DEFAULT_COLOR,
	theme: Theme = defaultTheme,
	colors: any = defaultColors,
	shortcuts: UserShortcuts<Theme> = defaultShortcuts,
	rules: Record<string, any> = defaultRules
) {
	const themeColorRGBArr = hex2rgba(themeColor) || hex2rgba(DEFAULT_COLOR);
	const themeColorRGB = themeColorRGBArr!.join(',');
	return {
		name,
		theme: setMainColorToTheme(theme, themeColorRGB),
		rules: setMainColorToRules(rules, themeColorRGB, colors),
		shortcuts
	} as Preset<Theme>;
}

export * from './shortcuts/index';
// custom theme: colors + theme + rules
export { defaultColors as ikunColors, getCSSPreflights } from './colors';
export { defaultTheme as ikunTheme } from './theme';
export { defaultRules as ikunRules } from './rules';
export const ikunShortcuts = defaultShortcuts;
