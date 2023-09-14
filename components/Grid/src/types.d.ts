/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KGridProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KRowProps = {
	/**
	 * grid spacing
	 */
	gutter: number;
	/**
	 * horizontal alignment of flex layout
	 */
	justify: 'start' | 'end' | 'center' | 'around' | 'between' | 'evenly';
	/**
	 * vertical alignment of flex layout
	 */
	align?: 'top' | 'middle' | 'bottom';
	/**
	 * custom element tag
	 */
	tag: string;
};
