/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KIconProps = {
	icon: string;
	btn: boolean;
	width: string;
	height: string;
	color: string;
	cls: ClassValue;
	attrs: Record<string, string>;
};
