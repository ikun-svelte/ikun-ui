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
	fetchSuggestions: undefined | FetchSuggestionType;
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

export type FetchSuggestionType = (
	params: string | number,
	cb: (res: AutoCompleteItems[]) => void
) => void;
export type AutoCompleteItems = {
	[string]: any;
	value: string | number;
};
