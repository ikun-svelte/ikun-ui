/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import type { IKunTypePro } from '@ikun-ui/utils';

export type KBadgeProps = {
	value: string | number;
	max: number;
	isDot: boolean;
	show: boolean;
	type: IKunTypePro;
	cls: ClassValue;
	attrs: Record<string, string>;
};
