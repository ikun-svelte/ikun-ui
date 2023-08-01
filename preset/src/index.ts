import shortcuts from './shortcuts/index';
import { setMainColorToTheme, defaultTheme } from './theme';
import { defaultRules, setMainColorToRules } from './rules';
import type { Theme } from '@unocss/preset-uno';
import type { Preset } from 'unocss';
import { hex2rgba } from '@unocss/preset-mini/utils';

const DEFAULT_COLOR = '#a855f7';
export function presetIkun(
	name: string = '@ikun-ui/preset',
	mainColor: string = DEFAULT_COLOR,
	theme: Theme = defaultTheme,
	rules: Record<string, any> = defaultRules
) {
	const mainColorRGBArr = hex2rgba(mainColor) || hex2rgba(DEFAULT_COLOR);
	const mainColorRGB = mainColorRGBArr!.join(',');
	return {
		name,
		theme: setMainColorToTheme(theme, mainColorRGB),
		rules: setMainColorToRules(rules, mainColorRGB),
		shortcuts
	} as Preset<Theme>;
}

export { getSafeList } from './shortcuts/index';
// custom theme: colors + theme + rules
export { defaultColors as ikunColors, getCSSPreflights } from './colors';
export { defaultTheme as ikunTheme } from './theme';
export { defaultRules as ikunRules } from './rules';
