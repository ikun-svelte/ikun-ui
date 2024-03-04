/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KDrawerProps = {
	placement: 'right' | 'left';
	value: boolean;
	header: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
