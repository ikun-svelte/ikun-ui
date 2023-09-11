/// <reference types="svelte" />
import { ClassValue } from 'clsx';
export type KCheckboxGroupProps = {
	value: string[] | number[];
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface checkboxMapItem {
	doUpdatedValue: (
		v: boolean,
		inner?:boolean) => void,
	setDisabled: (v: boolean) => void
}

export type checkboxMapType = Map<string, checkboxMapItem>;
