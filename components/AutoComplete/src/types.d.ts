/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';

export type KAutoCompleteProps = {
	size: IKunSize;
	value: string;
	disabled: boolean;

	clearable: boolean;
	placeholder: string;
	append: string;
	prepend: string;
	triggerOnFocus: boolean;
	fetchSuggestions:
		| undefined
		| ((params: string | number, cb: (res: AutoCompleteItems[]) => void) => void);
	cls: ClassValue;
	attrs: Record<string, string>;
	useCompositionInput: boolean;
	// option
	isActive: boolean;
	label: string;
	fitInputWidth: boolean;
	maxHeight: number;
	key: string;
};

// TODO: unit test
// TODO: document
