/// <reference types="svelte" />

import type { ClassValue } from 'clsx';

export type KAvatarProps = {
	icon: string;
	src: string;
	srcSet: string;
	alt: string;
	fit: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
	size: string | number;
	radius: string | number;
	cls: ClassValue;
	attrs: Record<string, string>;
};
