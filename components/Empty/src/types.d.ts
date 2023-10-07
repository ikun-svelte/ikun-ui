/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KEmptyProps = {
	cls: ClassValue;
	image?: string
	imageSize?: number
	emptyDescription: string
	attrs: Record<string, string>;
};
