/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export type KCheckboxProps = {
	label: string;
	value: boolean;
	uid: string | number;
	size: IKunSize;
	disabled: boolean;
	indeterminate: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
