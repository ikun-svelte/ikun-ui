/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';
import {string} from "fast-glob/out/utils";
export type KAutoCompleteProps = {
	// TODO: KForm
	size: IKunSize;
	// TODO: KForm
	value: string;
	// TODO: KForm、disabled
	disabled: boolean;
	placeholder: string;
	iconPrefix: string;
	iconSuffix: string;
	append: string;
	prepend: string;
	// TODO:
	isError: boolean;
	// TODO:
	center: boolean;
	triggerOnFocus: boolean;
	fetchSuggestions: undefined | ((
		params: string | number,
		cb: (res: AutoCompleteItems[]) => void
	) => void);
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

export type AutoCompleteItems = {
	[string]: any
	value: string | number
}


// TODO: KAutoComplete slot prefix
// TODO: KAutoComplete slot suffix
// TODO: KAutoComplete slot default

// TODO: KForm
