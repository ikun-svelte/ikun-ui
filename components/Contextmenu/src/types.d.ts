/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KContextmenuProps = {
	disabled: boolean;
	divider: boolean;
	title: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};

declare global {
	interface Window {
		__IKUN_CONTEXTMMENU_CLOSE: Array<() => void>;
	}
}
