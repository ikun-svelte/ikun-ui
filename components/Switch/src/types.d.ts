/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KSwitchProps = {
	value: string | number | boolean;
	checkedValue: string | number | boolean;
	unCheckedValue: string | number | boolean;
	checkedColor: string;
	unCheckedColor: string;
	size: IKunSize;
	loading: boolean;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
