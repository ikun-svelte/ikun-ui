/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export type KCheckboxProps = {
	checkColor: string;
	bgCheckColor: string;
	bgUnCheckColor: string;
	label: string;
	value: boolean;
	canCancel: boolean;
	uid: string | number;
	size: IKunSize;
	disabled: boolean;
	indeterminate: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
