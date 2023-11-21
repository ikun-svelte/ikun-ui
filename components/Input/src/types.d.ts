/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from "@ikun-ui/utils";

export type KInputProps = {
	size: IKunSize;
	value: string;
	placeholder: string;
	disabled: boolean;
	iconPrefix: string;
	iconSuffix: string;
	append: string;
	prepend: string;
	isError: boolean;
	center: boolean;
	search: boolean;
	errorMsg: string;
	cls: ClassValue;
	attrs: Record<string, string>;
	useCompositionInput: boolean;
	type: 'text' | 'password' | 'textarea';
	autosize: boolean | { minRows?: number; maxRows?: number };
	rows: number;
	clearable: boolean;
};
