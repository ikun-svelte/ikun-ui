/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
import { IKunSize } from "@ikun-ui/utils";
export type KInputNumberProps = {
	size: IKunSize; // TODO 🤡
	value: number | null; // TODO
	min: number; // TODO
	max: number; // TODO
	step: number; // TODO
	stepStrictly: boolean; // TODO
	precision: number | null // TODO
	disabled: boolean; // TODO
	controls: boolean // TODO
	valueOnClear: string // TODO
	/**
	 * TODO: native attr 🤡
	 */
	readonly: boolean
	/**
	 * TODO: native attr 🤡
	 */
	id: string
	/**
	 *  TODO: native attr 🤡
	 */
	name: string
	/**
	 * TODO: native attr 🤡
	 */
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
// TODO: KForm input-number
// TODO: KForm input-number unit test
// TODO: events change
// TODO: events blur
// TODO: events focus
