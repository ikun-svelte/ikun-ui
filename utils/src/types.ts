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
