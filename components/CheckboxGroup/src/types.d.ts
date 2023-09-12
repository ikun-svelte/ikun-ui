/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KCheckboxGroupProps = {
	value: Array<string | number>;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface checkboxMapItem {
	doUpdatedValue: (v: boolean, inner?: boolean) => void;
	setDisabled: (v: boolean) => void;
}

export type checkboxMapType = Map<string, checkboxMapItem>;

export interface checkboxGroupCtx {
	registerCheckbox: (uid: string | number, op: checkboxMapItem) => void;
	disabled: boolean;
	updatedValueWhenCheckboxChange: (v: boolean, uid: string | number) => void;
}
