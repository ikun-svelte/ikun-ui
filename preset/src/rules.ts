import type { Rule, RuleContext } from 'unocss';
import type { Theme } from '@unocss/preset-uno';
import { parseCssColor } from '@unocss/preset-mini/utils';
import { createGridColCls } from './rules/grid';
/* const SwitchSizeMap = {
	sm: ['2rem', '1.125rem', '0.85rem'],
	md: ['2.5rem', '1.375rem', '1.1rem'],
	lg: ['3rem', '1.625rem', '1.375rem']
}; */

const inputRules = {
	'k-input-shadow': { 'box-shadow': '0 0 0 2px #ff787542' },
	'k-input-shadow--error': { 'box-shadow': '0 0 0 2px rgba(251,113,133,0.5)' }
};
const btnRules = {
	'k-btn-shadow--success': { 'box-shadow': '0 0 0 2px rgba(74,222,128,0.5)' },
	'k-btn-shadow--error': { 'box-shadow': '0 0 0 2px rgba(251,113,133,0.5)' },
	'k-btn-shadow--warning': { 'box-shadow': '0 0 0 2px rgba(251,191,36,0.5)' },
	'k-btn-shadow--info': { 'box-shadow': '0 0 0 2px rgba(148,163,184,0.5)' },
	'k-btn-shadow--primary': { 'box-shadow': '0 0 0 2px rgba(45,212,191,0.5)' }
};
const iconRules = {
	'k-icon-transition': { transition: 'all 0.3s linear' }
};

const notifyRules = {
	'k-notify-transition': { transition: 'top 0.3s linear' }
};

const switchRules = {
	'k-switch-transition': { transition: 'right .1s linear' }
};

const progressRules = {
	'k-progress-transition__cd': { transition: 'stroke-dasharray 0.28s linear' },
	'k-progress-transition': { transition: 'width 0.28s linear' }
};
const popoverRules = {
	'k-popover-shadow__left': { 'box-shadow': '10px 0px 16px rgb(0 0 0 / 0.25)' },
	'k-popover-shadow__top': { 'box-shadow': '0 6px 16px rgb(0 0 0 / 0.25)' },
	'k-popover-shadow__bottom': { 'box-shadow': '0 -6px 16px rgb(0 0 0 / 0.25)' },
	'k-popover-shadow__right': { 'box-shadow': '-10px 0px 16px rgb(0 0 0 / 0.25)' }
};

const gridRules = createGridColCls();

// 自定義的原子樣式規則
export const defaultRules = {
	...inputRules,
	...btnRules,
	...iconRules,
	...notifyRules,
	...switchRules,
	...progressRules,
	...popoverRules,
	...gridRules
} as Record<string, any>;

export const setMainColorToRules = <T>(
	rules: Record<string, any>,
	themeColorRGB: string,
	colors: T
) => {
	// set main color to input shadow
	rules['k-input-shadow'] = { 'box-shadow': `0 0 0 2px rgb(${themeColorRGB}, 0.5)` };
	// set main color to popover shadow (dark mode)
	rules['k-popover-shadow__left__dark'] = {
		'box-shadow': `4px 0px 12px rgb(${themeColorRGB}, 0.8)`
	};
	rules['k-popover-shadow__top__dark'] = { 'box-shadow': `0 6px 16px rgb(${themeColorRGB}, 0.8)` };
	rules['k-popover-shadow__bottom__dark'] = {
		'box-shadow': `0 -6px 16px rgb(${themeColorRGB}, 0.8)`
	};
	rules['k-popover-shadow__right__dark'] = {
		'box-shadow': `-4px 0px 12px rgb(${themeColorRGB}, 0.8)`
	};
	// transform rule
	const finalRules: Array<Array<Record<string, any>>> = [];
	Object.keys(rules).forEach((name) => {
		const rule = [name, rules[name]];
		finalRules.push(rule);
	});

	function parseColor<T>(content: string, op: string, color: T) {
		if (!content) return;
		const matchRes = content.match(/^var\(--ikun-(.+)\)$/);
		if (!matchRes) {
			const cssColor = parseCssColor(content);
			if (cssColor) return `rgba(${cssColor.components.join(',')},${Number(op) / 100})`;
		} else {
			const cssColor = parseCssColor(color[matchRes[1]]);
			if (cssColor) return `rgba(${cssColor.components.join(',')},${Number(op) / 100})`;
		}
	}

	finalRules.push([
		/^ikun:/,
		(inputData, { theme }: RuleContext<Theme>) => {
			const { input } = inputData;
			if (!input) return;
			const [, op, inputCls] = input.split(':');
			const variable = inputCls.match(/^(?:text|bg)-(.+)/)[1];
			if (!variable) return;
			const color = parseColor<typeof colors>(
				(theme.colors as Record<string, string>)[variable],
				op,
				colors
			);

			let attr = inputCls.startsWith('bg-') ? 'background-color' : '';
			attr = inputCls.startsWith('text-') ? 'color' : attr;

			if (!attr) return;
			return {
				'--ikun-context': color,
				[attr]: 'var(--ikun-context)'
			};
		}
	]);
	return finalRules as Rule<Theme>[];
};
