/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KEllipsisProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
	content: string;
	text: string;
	expand: boolean;
	lineClamp: number | null;
	num: number;
	placement: 'left' | 'right' | 'center';
};
