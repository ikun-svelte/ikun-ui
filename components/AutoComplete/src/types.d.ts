/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export type KAutoCompleteProps = {
	size: IKunSize;
	value: string;
	disabled: boolean;
	placeholder: string;
	iconPrefix: string;
	iconSuffix: string;
	append: string;
	prepend: string;
	triggerOnFocus: boolean;
	fetchSuggestions:
		| undefined
		| ((params: string | number, cb: (res: AutoCompleteItems[]) => void) => void);
	cls: ClassValue;
	attrs: Record<string, string>;
	useCompositionInput: boolean;
	clearable: boolean;
	// option
	isActive: boolean;
	label: string;
	fitInputWidth: boolean;
	maxHeight: number;
	key: string;
};

// TODO: unit test
// TODO: document
