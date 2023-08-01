import type { Rule } from 'unocss';
import type { Theme } from '@unocss/preset-uno';

/* const SwitchSizeMap = {
	sm: ['2rem', '1.125rem', '0.85rem'],
	md: ['2.5rem', '1.375rem', '1.1rem'],
	lg: ['3rem', '1.625rem', '1.375rem']
}; */

const inputRules = {
		'k-input-shadow': { 'box-shadow': '0 0 0 2px #ff787542' }
}
const btnRules = {
	'k-btn-shadow--success': {'box-shadow': '0 0 0 2px rgba(74,222,128,0.5)'},
	'k-btn-shadow--error': {'box-shadow': '0 0 0 2px rgba(251,113,133,0.5)'},
	'k-btn-shadow--warning': {'box-shadow': '0 0 0 2px rgba(251,191,36,0.5)'},
	'k-btn-shadow--info': {'box-shadow': '0 0 0 2px rgba(148,163,184,0.5)'},
	'k-btn-shadow--primary': {'box-shadow': '0 0 0 2px rgba(45,212,191,0.5)'},
}
const iconRules = {
	'k-icon-transition': { transition: 'all 0.3s linear' }
}

const notifyRules = {
	'k-notify-transition': { transition: 'top 0.3s linear' }
}

const switchRules = {
	'k-switch-transition': { transition: 'right .1s linear' }
}
// 自定義的原子樣式規則
export const defaultRules = {
	...inputRules,
	...btnRules,
	...iconRules,
	...notifyRules,
	...switchRules
} as Record<string, any>

export const setMainColorToRules = (rules: Record<string, any>, mainColorRGB: string) => {
	// set main color to input shadow
	rules['k-input-shadow'] = { 'box-shadow': `0 0 0 2px rgb(${mainColorRGB}, 0.5)` }
	// transform rule
	const finalRules: Array<Array<Record<string, any>>> = []
	Object.keys(rules).forEach((name) => {
		const rule = [name, rules[name]]
		finalRules.push(rule)
	})
	return finalRules as Rule<Theme>[]
}
