/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import {IKunSize} from "@ikun-ui/utils";
export type KAutoCompleteProps = {
  size: IKunSize;
  // TODO:
  value: string;
  placeholder: string;
  disabled: boolean;
  iconPrefix: string;
  iconSuffix: string;
  append: string;
  prepend: string;
  // TODO:
  isError: boolean;
  // TODO:
  center: boolean;
  // TODO:输入触发，或聚焦触发
  triggerOnFocus: boolean;
  // TODO:
  fetchSuggestions: undefined | ((params: string | number) => AutoCompleteItems[])
  cls: ClassValue;
  attrs: Record<string, string>;
  useCompositionInput: boolean;
  clearable: boolean;
}

export type AutoCompleteItems = {
  [key: string]: string | number;
  value: string | number;
};

// TODO: KAutoComplete events updatedValue

// TODO: KAutoComplete slot prefix
// TODO: KAutoComplete slot suffix
// TODO: KAutoComplete slot default
// TODO: KAutoComplete loading default

// TODO: KForm
