/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KRadioProps = {
	value: boolean;
	label: string;
	uid: string | number;
	size: IKunSize;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
