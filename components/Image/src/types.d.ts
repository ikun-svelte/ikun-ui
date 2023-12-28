/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KImageProps = {
	loading: 'eager' | 'lazy' | undefined
	previewSrcList: string[]
	fit: undefined | 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | string
	lazy: boolean
	src: string
	alt: string
	cls: ClassValue;
	attrs: Record<string, string>;
};
