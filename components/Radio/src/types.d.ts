/// <reference types="svelte" />

import type { ClassValue } from 'clsx';
export type KRadioProps = {
	value: boolean;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
	label: string;
	uid: string | number;
};
