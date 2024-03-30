/// <reference types="svelte" />
import { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export type KSelectProps = {
	size: IKunSize;
	iconPrefix: string;
	iconSuffix: string;
	value: string | number | Record<string, any>;
	placeholder: string;
	disabled: boolean;
	labelKey: string;
	valueKey: string;
	key: string;
	fitInputWidth: boolean;
	dataList: Array<KSelectList>;
	maxHeight: number;
	clearable: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
	remote?: (params: string, cb: (data: KSelectProps['dataList']) => void) => void;
	// option
	isActive: boolean;
	label: string;
};

export type KSelectList = Record<string, any> | string | number;
