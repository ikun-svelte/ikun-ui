/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KImageViewProps = {
	urls: string[];
	show: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
