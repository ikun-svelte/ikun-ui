/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KCheckboxGroupProps = {
	value: Array<string | number>;
	size: IKunSize;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface checkboxMapItem {
	doUpdatedValue: (v: boolean, inner?: boolean) => void;
	setDisabled: (v: boolean) => void;
	setSizes: (v: IKunSize) =>void
}

export type checkboxMapType = Map<string, checkboxMapItem>;

export interface checkboxGroupCtx {
	registerCheckbox: (uid: string | number, op: checkboxMapItem) => void;
	size: KCheckboxGroupProps['size'];
	disabled: KCheckboxGroupProps['disabled'];
	updatedValueWhenCheckboxChange: (v: boolean, uid: string | number) => void;
}
