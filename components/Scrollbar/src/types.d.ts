/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KScrollbarProps = {
	css: string;
	trackBackground: string;
	trackRadius: string;
	width: string;
	height: string;
	thumbBackground: string;
	thumbRadius: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
