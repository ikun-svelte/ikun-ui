export declare type IKunTypeBase = 'success' | 'error' | 'warning' | 'info';
export declare type IKunTypePro = IKunTypeBase | 'primary';
export type IKunUncertainFunction<T = any> = (...arg: any[]) => T | void;
export type IKunSize = 'sm' | 'md' | 'lg';
export type IKunPlacement = 'top' | 'left' | 'right' | 'bottom';
export type IKunTrigger = 'manual' | 'click' | 'hover';
