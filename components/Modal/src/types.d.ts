/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KModalProps = {
	show: boolean;
	footer: boolean;
	layout: 'center' | 'right';
	title: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
