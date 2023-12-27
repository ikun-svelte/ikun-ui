/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from '@ikun-ui/utils';
export type KInputNumberProps = {
	size: IKunSize;
	value: number | null;
	min: number;
	max: number;
	step: number;
	stepStrictly: boolean;
	precision: number | null;
	disabled: boolean;
	controls: boolean;
	valueOnClear: number | null;
	readonly: boolean;
	id: string;
	name: string;
	placeholder: string;
	append: string;
	prepend: string;
	useCompositionInput: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
	/**
	 * @internal
	 */
	isError: boolean;
	center: boolean;
	errorMsg: string;
};
// TODO: KForm input-number 🤡
// TODO: KForm input-number unit test
