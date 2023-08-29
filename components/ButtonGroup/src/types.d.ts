/// <reference types="svelte" />
import type { IKunTypePro } from '@ikun-ui/utils/src';

export type KButtonGroupProps = {
	type: IKunTypePro;
	size: 'sm' | 'md' | 'lg';
	iconSize: number | null;
	isBorder: boolean;
	disabled: boolean;
	cls: string;
	attrs: Record<string, string>;
};
