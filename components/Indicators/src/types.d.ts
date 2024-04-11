/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KIndicatorsProps = {
	defaultPageIndex: number;
	trigger: 'click' | 'hover';
	count: number;
	cls: ClassValue;
	attrs: Record<string, string>;
};
