/// <reference types="svelte" />
import type { IKunTypePro } from '@ikun-ui/utils/src';
import type { ClassValue } from 'clsx'

export type KButtonGroupProps = {
	type: IKunTypePro;
	size: 'sm' | 'md' | 'lg';
	iconSize: number | null;
	isBorder: boolean;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
