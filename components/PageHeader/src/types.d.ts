/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KPageHeaderProps = {
	icon: string;
	title: string;
	content: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
