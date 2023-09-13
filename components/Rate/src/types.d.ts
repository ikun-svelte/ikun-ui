/// <reference types="svelte" />
import { ClassValue } from 'clsx';

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
	cls: ClassValue;
	attrs: Record<string, string>;
};
