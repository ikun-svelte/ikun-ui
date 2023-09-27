/// <reference types="svelte" />
import type { ClassValue } from 'clsx';

export type KCardProps = {
	title: string;
	shadow: 'always' | 'never' | 'hover';
	cls: ClassValue;
	attrs: Record<string, string>;
};
