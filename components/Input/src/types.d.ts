/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KInputProps = {
	size: 'sm' | 'md' | 'lg';
	value: string;
	placeholder: string;
	disabled: boolean;
	iconPrefix: string;
	iconSuffix: string;
	append: string;
	prepend: string;
	isError: boolean;
	search: boolean;
	errorMsg: string;
	cls: ClassValue;
	attrs: Record<string, string>;
	useCompositionInput: boolean;
	type: 'text' | 'password';
};
