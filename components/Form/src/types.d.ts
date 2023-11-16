/// <reference types="svelte" />
import { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export declare type ShowMsg = (msg: string) => void;
export interface IKunFormInstanceOption {
	initValue: any;
	rules?: KFormRules;
	size: IKunSize;
	disabled: boolean;
	manualValidate: boolean;
}
export interface IKunFormInstance {
	__default_value: any;
	__value: any;
	__disabled: boolean;
	__manual_validate: boolean;
	__size: IKunSize;
	__rules?: KFormRules;
	__showMsgMap: Record<string, showMsg>;
	__updateMap: Record<string, () => void>;
	getValueByPath: typeof getValueByPath;
	updateField(path: string, value: unknown, isValidate?: boolean): void;
	setEntireForm(values?: any, isValidate?: boolean): void;
	updateErrorMsg(key: string, msg: string): void;
	updateDomText(key: string): void;
	// public
	validateForm(callback: FormValidateCallback): void;
	resetForm(): void;
	setForm(values: any, isValidate: boolean): void;
	getForm<T>(): T;
	validateField(path: string): void;
	clearValidateField(path: string): void;
	setFields(path: string, values: any, isValidate: boolean): void;
}

export type Value = any;
export type Values = Record<string, Value>;
export interface ValidateError {
	message?: string;
	fieldValue?: Value;
	field?: string;
}

export type FormValidateCallback = (
	data: any,
	isValid: boolean,
	invalidFields?: ValidateError[]
) => void;
// ⭕TODO: 由 KFrom 和 KFormItem 两个字段组成
// TODO: 无障碍
// TODO: 字段变化，这些都是不合法的


// ⭕TODO: KFormItem props -- initValue 表单初始值对象
// TODO: KFormItem props -- disabled 表单禁用
// TODO: KFormItem props -- rules 表单规则
// TODO: KFormItem props -- size 表单尺寸
// ⭕TODO: KFormItem props -- manualValidate 不自动触发校验
// TODO: KFormItem event -- validate 任一表单项被校验后触发 (prop: FormItemProp, isValid: boolean, message: string) => void
// ⭕TODO: KFormItem slot -- default 自定义默认内容 FormItem

// ⭕TODO: KFormItem Api -- validate 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
// ⭕TODO: KFormItem Api -- validateField 验证具体的某个字段。
// ⭕TODO: KFormItem Api -- resetFields 重置该表单项，将其值重置为初始值，并移除校验结果
// ⭕TODO: KFormItem Api -- clearValidate 清理某个字段的表单验证信息。（输入和validate重新校验）
// ⭕TODO: KFormItem Api -- setForm 设置表单对象值,并清理校验信息, 可选触发校验(请保证表单对象数据结构与初始值一致)
// ⭕TODO: KFormItem Api -- setFields 设置表单对象值(生层次对象,整个替换的话，会递归校验符合规则的子对象字段)
// ⭕TODO: KFormItem Api -- getForm 获取表单对象，请确保校验全部通过再调用

// ⭕TODO: KFormItem 可以嵌套使用
// ⭕TODO: KFormItem props -- field    value 的键名。 它可以是一个属性的值(如 a.b.0 或 [a', 'b', '0'])
// ⭕TODO: KFormItem props -- label   标签文本
// TODO: KFormItem props -- label-width 标签宽度
// ⭕TODO: KFormItem props -- showMsg 是否显示校验错误信息
// ⭕TODO: KFormItem slot -- label 标签位置显示的内容
// ⭕TODO: KFormItem slot -- error 验证错误信息的显示内容

export type KFormProps = {
	initValue: any;
	rules?: KFormRules;
	size: IKunSize;
	disabled: boolean;
	manualValidate: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KFormItemProps = {
	label: string;
	field: string;
	cls: ClassValue;
	attrs: Record<string, string>;
	labelWidth?: number;
	showMsg: boolean;
};

export interface KFormRule {
	max?: number;
	min?: number;
	required?: boolean;
	validator?: (value: any, callback: any) => void;
	msg?: string;
}

export type KFormRules = Record<string, KFormRule[]>;
