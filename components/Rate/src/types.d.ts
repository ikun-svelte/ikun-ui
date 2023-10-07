/// <reference types="svelte" />
import { ClassValue } from 'clsx';
import type { IKunSize } from '@ikun-ui/utils';

export type KRateProps = {
	max: number;
	value: number;
	allowHalf: boolean;
	showScore: boolean;
	scoreTemplate: string;
	showText: boolean;
	texts: string | Record<number, string>;
	textColor: string;
	icons: string | Record<number, string>;
	colors: string | Record<number, string>;
	voidIcon: string;
	voidColor: string;
	disabled: boolean;
	readonly: boolean;
	readonlyVoidIcon: string;
	readonlyVoidColor: string;
	clearable: boolean;
	size: IKunSize;
	cls: ClassValue;
	attrs: Record<string, string>;
};
