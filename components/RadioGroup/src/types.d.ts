/// <reference types="svelte" />
import { ClassValue } from 'clsx/clsx';

export type KRadioGroupProps = {
	value: string | number;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface radioMapItem {
	doUpdatedValue: (v: boolean, inner?: boolean) => void;
	setDisabled: (v: boolean) => void;
}

export type radioMapType = Map<string, radioMapItem>;

export interface RadioGroupCtx {
	registerRadio: (uid: string | number, op: radioMapItem) => void;
	disabled: boolean;
	updatedValueWhenRadioChange: (v: boolean, uid: string | number) => void;
}
