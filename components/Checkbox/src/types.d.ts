/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KCheckboxProps = {
	value: boolean;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
	label: string;
	uid: string | number;
	indeterminate: boolean;
};
