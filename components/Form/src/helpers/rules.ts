// ⭕TODO: 支持简单的规则校验 require max min
// ⭕TODO: max min 只对 string、number
// ⭕TODO: 校验顺序按照 rules 顺序
// ⭕TODO: validator
// ⭕TODO: validator 后 require max min 将失效
import { getValueByPath } from './fields';
import { isArray, isNumber, isObject, isString } from 'baiwusanyu-utils';
import type { KFormRule, KFormRules, ValidateError } from '../types';

/**
 * 校验整个表单
 */
export function doValidate(
	rules: KFormRules,
	target: Record<string, any>,
	errors: ValidateError[] = []
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
				validateRequired(ruleOption, value, field, errors);
				validateMin(ruleOption, value, field, errors);
				validateMax(ruleOption, value, field, errors);
			}
		}
	}
}

/**
 * 校验某个字段
 */
export function doValidateField(rules: KFormRules | undefined, path: string, value: unknown) {
	if (rules) {
		const fieldRule = rules[path];
		for (let i = 0; i < fieldRule.length; i++) {
			const ruleOption = fieldRule[i];
			if (ruleOption.validator) {
				ruleOption.validator(value, (msg: string) => {
					if (msg) {
						throw new Error(msg);
					}
				});
			} else {
				validateRequired(ruleOption, value, path);
				validateMin(ruleOption, value, path);
				validateMax(ruleOption, value, path);
			}
		}
	}
}

// TODO: unit test
function validateRequired(rule: KFormRule, value: any, field: string, errors?: ValidateError[]) {
	if (rule.required) {
		if (!value && value !== 0) {
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

// TODO: unit test
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

// TODO: unit test
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
