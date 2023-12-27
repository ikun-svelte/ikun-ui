/// <reference types="svelte" />
import { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export type KFormComponent =
	| 'select'
	| 'switch'
	| 'input'
	| 'input-number'
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
