/// <reference types="svelte" />
import { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KSliderProps = {
	size: IKunSize;
	min: number;
	max: number;
	value: number;
	step: number;
	disabled: boolean;
	vertical: boolean;
	showTooltip: boolean;
	format: (value: number) => number | string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
