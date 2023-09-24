/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KLayoutProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
};
export type KHeaderFooterProps = {
	height: string;
};
export type KAsideProps = {
	width: string;
};
export type KContainerProps = {
	direction: 'vertical' | 'horizontal';
};
