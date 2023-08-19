export declare type IKunTypeBase = 'success' | 'error' | 'warning' | 'info';
export declare type IKunTypePro = IKunTypeBase | 'primary';
export type IKunUncertainFunction<T = any> = () => T | void;
export type IKunSize = 'sm' | 'md' | 'lg';
export type IKunPlacement = 'top' | 'left' | 'right' | 'bottom';
export type IKunTrigger = 'manual' | 'click' | 'hover';
export type IKunUpdateField = (value?: any) => void;
export type IKunFormInstance = {
	values?: any;
	submit: () => void;
	setValue: (field: string, value: any) => void;
	setValues: (values: any) => void;
	subscribe: (callback: (values: any) => void) => void;
};
export type FormContext = {
	form: IKunFormInstance;
	updateField: IKunUpdateField;
};
