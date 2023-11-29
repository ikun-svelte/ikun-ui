import { getValueByPath } from './fields';
import { isArray, isEmptyObj, isNumber, isObject, isString } from 'baiwusanyu-utils';
import type { KFormComponent, KFormRule, KFormRules, ValidateError } from '../types';

/**
 * 校验整个表单
 */
export function doValidate(
	rules: KFormRules,
	target: Record<string, any>,
	errors: ValidateError[] = [],
	itemCompMap: Record<string, { type: KFormComponent; update: () => void }>
) {
	for (const field in rules) {
		const value = getValueByPath(field, target);
		const rule = rules[field];
		for (let i = 0; i < rule.length; i++) {
			const ruleOption = rule[i];
			if (ruleOption.validator) {
				ruleOption.validator(value, (msg: string) => {
					if (msg) {
						errors.push({
							message: msg,
							fieldValue: value,
							field
						});
						if (errors.length === 0) {
							throw new Error(msg);
						}
					}
				});
			} else {
				const type = (itemCompMap[field as keyof typeof itemCompMap] || {}).type;
				// switch does not require verification required
				validateRequired(ruleOption, value, field, errors, type !== 'switch' && type !== 'slider');
				validateMin(ruleOption, value, field, errors);
				validateMax(ruleOption, value, field, errors);
			}
		}
	}
}

/**
 * 校验某个字段
 */
export function doValidateField(
	rules: KFormRules | undefined,
	path: string,
	value: unknown,
	itemCompMap: Record<string, { type: KFormComponent; update: () => void }>
) {
	if (rules) {
		const fieldRule = rules[path] || [];
		for (let i = 0; i < fieldRule.length; i++) {
			const ruleOption = fieldRule[i];
			if (ruleOption.validator) {
				ruleOption.validator(value, (msg: string) => {
					if (msg) {
						throw new Error(msg);
					}
				});
			} else {
				const type = (itemCompMap[path as keyof typeof itemCompMap] || {}).type;
				// switch does not require verification required
				validateRequired(
					ruleOption,
					value,
					path,
					undefined,
					type !== 'switch' && type !== 'slider'
				);
				validateMin(ruleOption, value, path);
				validateMax(ruleOption, value, path);
			}
		}
	}
}

function validateRequired(
	rule: KFormRule,
	value: any,
	field: string,
	errors?: ValidateError[],
	isValidate = true
) {
	if (rule.required && isValidate) {
		if ((!value && value !== 0) || isEmptyObj(value) || JSON.stringify(value) === '[]') {
			const msg = rule.msg || `${field} is required`;
			errors &&
				errors.push({
					message: msg,
					fieldValue: value,
					field
				});
			if (!errors) {
				throw new Error(msg);
			}
		}
	}
}

function validateMin(rule: KFormRule, value: any, field: string, errors?: ValidateError[]) {
	if (rule.min || rule.min === 0) {
		if (isNumber(value) && value < rule.min) {
			const msg = rule.msg || `${field} cannot be less than ${rule.min}`;
			errors &&
				errors.push({
					message: msg,
					fieldValue: value,
					field
				});
			if (!errors) {
				throw new Error(msg);
			}
		}
		if ((isString(value) || isArray(value)) && value.length < rule.min) {
			const msg = rule.msg || `${field} length cannot be less than ${rule.min}`;
			errors &&
				errors.push({
					message: msg,
					fieldValue: value,
					field
				});
			if (!errors) {
				throw new Error(msg);
			}
		}
	}
}

function validateMax(rule: KFormRule, value: any, field: string, errors?: ValidateError[]) {
	if (rule.max || rule.max === 0) {
		if (isNumber(value) && value > rule.max) {
			const msg = rule.msg || `${field} cannot be greater than ${rule.max}`;
			errors &&
				errors.push({
					message: msg,
					fieldValue: value,
					field
				});
			if (!errors) {
				throw new Error(msg);
			}
		}

		if ((isString(value) || isArray(value)) && value.length > rule.max) {
			const msg = rule.msg || `${field} length cannot be greater than ${rule.max}`;
			errors &&
				errors.push({
					message: msg,
					fieldValue: value,
					field
				});
			if (!errors) {
				throw new Error(msg);
			}
		}
	}
}

export function traverseObjects(obj: any, cb: (key: string, value: any) => void, parentKey = '') {
	if (isObject(obj)) {
		for (const key in obj) {
			if (isObject(obj[key])) {
				traverseObjects(obj[key], cb, key);
			} else {
				cb(`${parentKey}.${key}`, obj[key]);
			}
		}
	}
}
