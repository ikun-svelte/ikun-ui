/// <reference types="svelte" />
import { ClassValue } from 'clsx';

export type KSelectProps = {
	iconPrefix: string;
	iconSuffix: string;
	value: string | number | Record<string, any>;
	label: string;
	placeholder: string;
	disabled: boolean;
	isActive: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};
