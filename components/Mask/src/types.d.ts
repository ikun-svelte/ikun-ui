/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KMaskProps = {
	target: null | HTMLElement;
	value: boolean;
	color: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
