/// <reference types="svelte" />
export type KInputProps = {
	value: string;
	placeholder: string;
	disabled: boolean;
	iconPrefix: string;
	iconSuffix: string;
	isError: boolean;
	errorMsg: string;
	cls: string;
	attrs: Record<string, string>;
	useCompositionInput: boolean;
};
