/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KCountdownProps = {
	format: string;
	value: number;
	prefix: string | undefined;
	suffix: string | undefined;
	title: string | undefined;
	valueStyle: string | undefined;
	cls: ClassValue;
	attrs: Record<string, string>;
};
