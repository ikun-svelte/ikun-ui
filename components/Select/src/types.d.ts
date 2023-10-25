/// <reference types="svelte" />
import { ClassValue } from 'clsx';

export type KSelectProps = {
	iconPrefix: string;
	iconSuffix: string;
	value: string | number | Record<string, any>;
	placeholder: string;
	disabled: boolean;
	labelKey: string;
	valueKey: string;
	key: string;
	fitInputWidth: boolean;
	dataList: Array<Record<string, any>> | string[] | number[];
	maxHeight: number;
	clearable: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
	// option
	isActive: boolean;
	label: string;
};
