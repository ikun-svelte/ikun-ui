import { type Issue } from 'valibot';
export declare type IKunTypeBase = 'success' | 'error' | 'warning' | 'info';
export declare type IKunTypePro = IKunTypeBase | 'primary';
export type IKunUncertainFunction<T = any> = () => T | void;
export type IKunSize = 'sm' | 'md' | 'lg';
export type IKunPlacement = 'top' | 'left' | 'right' | 'bottom';
export type IKunTrigger = 'manual' | 'click' | 'hover';
export type IKunUpdateField = (value?: any) => void;
export type Contexts = {
	[key: string]: Contexts;
} & {
	__this__: FormContext;
};
export type IKunFormInstance = {
	values: any;
	contexts: Contexts;
	submit: () => void;
	validateValues: () => boolean;
	getValue: (path: string) => any;
	setValue: (path: string, value: any) => void;
	setValues: (values: any) => void;
	setContext: (path: string, context: FormContext) => void;
	resetValue: (path: string) => void;
	resetValues: () => void;
	subscribe: (path: string, callback: (values: any) => void) => void;
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
};
