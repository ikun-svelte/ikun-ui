/// <reference types="svelte" />
import { ClassValue } from 'clsx';

export type KSelectProps = {
	iconPrefix: string;
	iconSuffix: string;
	value: string | number | Record<string, any>;
	placeholder: string;
	disabled: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
