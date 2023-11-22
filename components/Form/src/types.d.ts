/// <reference types="svelte" />
import { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export type KFormComponent =
	| 'select'
	| 'switch'
	| 'input'
	| 'radio'
	| 'checkbox'
	| 'rate'
	| 'slider';
export declare type ShowMsg = (msg: string) => void;
export interface IKunFormDynamicProps {
	size: KFormProps['size'];
	disabled: KFormProps['disabled'];
	labelAlign: KFormProps['labelAlign'];
	labelPosition: KFormProps['labelPosition'];
	labelWidth: KFormProps['labelWidth'];
}
export interface IKunFormInstanceOption {
	initValue: any;
	rules?: KFormRules;
	manualValidate: boolean;
	dynamicProps: IKunFormDynamicProps;
	validateEmitEvt: FormValidateCallback;
}
export interface IKunFormInstance {
	__default_value: any;
	__value: any;
	__manual_validate: boolean;
	__rules?: KFormRules;
	__showMsgMap: Record<string, showMsg>;
	__itemCompMap: Record<string, { type: KFormComponent; update: () => Promise<void> | void }>;
	__errorCompEvtMap: Record<string, (isError: boolean) => void>;
	__propHandleEvtMap: Array<(props: Record<any, any>) => void>;
	__dynamicProps: IKunFormDynamicProps;
	__validateEmitEvt: FormValidateCallback;
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
	setField(path: string, values: any, isValidate: boolean): void;
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
// TODO: submit
// TODO: dark mode

// ✅TODO: KForm props -- label-width 标签宽度(可动态)
// ✅TODO: KForm props -- labelAlign 标签对其(可动态)
// ✅TODO: KForm props -- disabled 表单禁用(可动态)
// ✅TODO: KForm props -- size 表单尺寸(可动态)
// ✅TODO: KForm props -- labelPosition label 位置(可动态)

// ✅TODO: KForm props -- initValue 表单初始值对象
// 🎯TODO: KForm props -- rules 表单规则
// ✅TODO: KForm props -- manualValidate 不自动触发校验
// ⭕TODO: KForm event -- validate 任一表单项被校验后触发 (prop: FormItemProp, isValid: boolean, message: string) => void(validate api 调用时不会被触发)
// ✅TODO: KForm slot -- default 自定义默认内容 FormItem

// ✅TODO: KForm Api -- validateForm 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
// ⭕TODO: KForm Api -- validateField 验证具体的某个字段。
// ✅TODO: KForm Api -- resetForm 重置该表单项，将其值重置为初始值，并移除校验结果
// ⭕TODO: KForm Api -- clearValidateField 清理某个字段的表单验证信息。（输入和validate重新校验）
// ✅TODO: KForm Api -- setForm 设置表单对象值,并清理校验信息, 可选触发校验(请保证表单对象数据结构与初始值一致)
// ✅TODO: KForm Api -- setField 设置表单对象值
// ✅TODO: KForm Api -- getForm 获取表单对象，请确保校验全部通过再调用


// ⭕TODO: KFormItem 可以嵌套使用
// ⭕TODO: KFormItem props -- field    value 的键名。 它可以是一个属性的值(如 a.b.0 或 [a', 'b', '0'])
// ⭕TODO: KFormItem props -- label   标签文本

// ⭕TODO: KFormItem props -- showMsg 是否显示校验错误信息
// ⭕TODO: KFormItem slot -- label 标签位置显示的内容
// ⭕TODO: KFormItem slot -- error 验证错误信息的显示内容

// 🎯TODO: KInput 支持
// 🎯TODO: KCheckbox 支持
// 🎯TODO: KSwitch  支持
// 🎯TODO: KRadio 支持
// 🎯TODO: KRate 支持
// 🎯TODO: KSelect 支持
// TODO: KSlider 支持
export type KFormProps = {
	initValue: any;
	rules?: KFormRules;
	size: IKunSize;
	disabled: boolean;
	manualValidate: boolean;
	labelWidth?: number;
	labelPosition: 'horizontal' | 'vertical';
	labelAlign: 'left' | 'right' | 'center';
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KFormItemProps = {
	label: string | undefined;
	field: string;
	cls: ClassValue;
	attrs: Record<string, string>;
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
