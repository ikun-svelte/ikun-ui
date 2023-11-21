/// <reference types="svelte" />
import { ClassValue } from 'clsx/clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KRadioGroupProps = {
	value: string | number;
	size: IKunSize;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export interface radioMapItem {
	doUpdatedValue: (v: boolean, inner?: boolean) => void;
	setDisabled: (v: boolean) => void;
	setSizes: (v: IKunSize) =>void
}

export type radioMapType = Map<string, radioMapItem>;

export interface RadioGroupCtx {
	registerRadio: (uid: string | number, op: radioMapItem) => void;
	size: KRadioGroupProps['size'];
	disabled: KRadioGroupProps['disabled'];
	updatedValueWhenRadioChange: (v: boolean, uid: string | number) => void;
}
