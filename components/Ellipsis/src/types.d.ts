/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KEllipsisProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
	textcontent: string;
	text: string;
	expend: boolean;
	lineClamp: number | null;
	num: number;
	placement: 'left' | 'right' | 'center';
};
