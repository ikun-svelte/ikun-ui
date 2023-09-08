/// <reference types="svelte" />
import { type ClassValue } from 'clsx';

export type KCollapseWrapperProps = {
	accordion: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type collapseMapType = Record<string, () => void>;
