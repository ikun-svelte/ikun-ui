import type { Rule } from 'unocss';
import type { Theme } from '@unocss/preset-uno';
import { getColCls, getColBreakPointRules } from './src/grid';
import { inputRules } from './src/input';
import { buttonRules } from './src/button';
import { cardRules } from './src/card';
import { iconRules } from './src/icon';
import { notifyRules } from './src/notify';
import { switchRules } from './src/switch';
import { progressRules } from './src/progress';
import { popoverRules } from './src/popover';
import { getDescriptionsGridColCls } from './src/descriptions';
import { setMainColor } from './set-main-color';
import { getIkunColorRules } from './src/ikun-color';

declare type dynamicRulesFunc = (...args: any[]) => Array<RegExp | ((...args: any[]) => any)>;
export const defaultRules = {
	...inputRules,
	...buttonRules,
	...cardRules,
	...iconRules,
	...notifyRules,
	...switchRules,
	...progressRules,
	...popoverRules,
	...getColCls(),
	...getDescriptionsGridColCls()
} as Record<string, any>;

function normalizeRules(staticRules: Record<string, any>, dynamicRules: dynamicRulesFunc[]) {
	const res: Array<Array<Record<string, any>>> = [];

	// transform staticRules
	Object.keys(staticRules).forEach((name) => {
		const rule = [name, staticRules[name]];
		res.push(rule);
	});

	// add dynamicRules
	dynamicRules.forEach((rules) => {
		res.push(rules());
	});
	return res;
}

export const setMainColorToRules = <T>(
	rules: Record<string, any>,
	themeColorRGB: string,
	colors: T
) => {
	// set theme color to component rules
	rules = setMainColor(rules, themeColorRGB);
	// transform rule
	const finalRules = normalizeRules(rules, [getIkunColorRules(colors), getColBreakPointRules()]);

	return finalRules as Rule<Theme>[];
};
