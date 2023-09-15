import { Theme } from '@unocss/preset-uno';
import { Preset, UserShortcuts } from 'unocss';
import { defaultShortcuts } from '../shortcuts';
import { defaultRules, setMainColorToRules } from '../rules';
import { hex2rgba } from '@unocss/preset-mini/utils';
import { DEFAULT_COLOR, DEFAULT_PRESET_NAME } from '../utils/constant';
import { setMainColorToTheme, defaultTheme } from '../theme';
import { defaultColors } from '../colors';

export function presetIkun(
	name: string = DEFAULT_PRESET_NAME,
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
