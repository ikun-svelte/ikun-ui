/// <reference types="svelte" />
import { ClassValue } from 'clsx/clsx';
import { type BaseSchema } from 'valibot';

export type KFormItemProps = {
	label: string;
	field: string;
	required: boolean;
	initialValue?: string;
	rules?: BaseSchema;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type IKunUpdateField = (value?: any) => void;
export type Contexts = {
	[key: string]: Contexts;
} & {
	__this__: FormContext;
};
export type IKunFormInstance = {
	//record Field value
	values: any;
	//record Field Contexts
	contexts: Contexts;
	//get Field Values
	submit: () => void;
	//validate all Field value
	validateValues: () => boolean;
	//get specific Field value
	getValue: (path: string) => any;
	//set specific Field value
	setValue: (path: string, value: any) => void;
	//set all Field value
	setValues: (values: any) => void;
	//record specific contexts into IKunFormInstance.contexts
	setContext: (path: string, context: FormContext) => void;
	//reset Field Values using field contexts inititalValue
	resetValue: (path: string) => void;
	//reset all Field Values
	resetValues: () => void;
	//subscribe specific Field change ,callback will be called when change
	subscribe: (path: string, callback: (values: any) => void) => void;
	//subscribe all Field change,callback will be called when change
	subscribes: (callback: (values: any) => void) => void;
};

export type FormContext = {
	form: IKunFormInstance;
	path: string;
	__FormContext__: true;
	initialValue: any;
	validateField: () => Issue[];
	updateField: IKunUpdateField;
	subscribe: (value?: any) => void;
	initialField: (value?: any) => void;
	resetField: () => void;
};
// TODO: 由 KFrom 和 KFormItem 两个字段组成
// TODO: 无障碍

// TODO: KFormItem props -- value 表单对象
// TODO: KFormItem props -- disabled 表单禁用
// TODO: KFormItem props -- rules 表单规则
// TODO: KFormItem props -- size 表单尺寸
// TODO: KFormItem event -- validate 任一表单项被校验后触发 (prop: FormItemProp, isValid: boolean, message: string) => void
// TODO: KFormItem slot -- default 自定义默认内容 FormItem
// TODO: KFormItem Api -- validate 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。
// TODO: KFormItem Api -- validateField 验证具体的某个字段。
// TODO: KFormItem Api -- resetFields 重置该表单项，将其值重置为初始值，并移除校验结果
// TODO: KFormItem Api -- clearValidate 清理某个字段的表单验证信息。

// TODO: KFormItem 可以嵌套使用
// TODO: KFormItem props -- prop    value 的键名。 它可以是一个属性的值(如 a.b.0 或 [a', 'b', '0'])
// TODO: KFormItem props -- label   标签文本
// TODO: KFormItem props -- label-width 标签宽度
// TODO: KFormItem props -- show-message 是否显示校验错误信息
// TODO: KFormItem slot -- label 标签位置显示的内容
// TODO: KFormItem slot -- error 验证错误信息的显示内容

export interface KFormRule = {

}

export interface KFormRules = {

}
