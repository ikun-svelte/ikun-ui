/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KCollapseProps = {
	title: string;
	content: string;
	show: boolean;
	showClose: boolean;
	uid: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
