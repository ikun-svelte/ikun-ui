/// <reference types="svelte" />
import type { IKunTypePro } from '@ikun-ui/utils';
import type { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export type KButtonGroupProps = {
	type: IKunTypePro;
	size: IKunSize;
	iconSize: number | null;
	isBorder: boolean;
	disabled: boolean;
	cls?: ClassValue;
	attrs?: Record<string, string>;
};
