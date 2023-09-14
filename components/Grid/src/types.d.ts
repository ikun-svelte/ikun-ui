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

export interface ResponsiveSize {
	span?: number;
	offset?: number;
	pull?: number;
	push?: number;
}
export type KColProps = {
	/**
	 * number of column the grid spans
	 * @default 36
	 */
	span: number;
	/**
	 * number of spacing on the left side of the grid
	 * @default 0
	 */
	offset: number;
	/**
	 * number of columns that grid moves to the righ
	 * @default 0
	 */
	push: number;
	/**
	 * number of columns that grid moves to the left
	 * @default 0
	 */
	pull: number;
	/**
	 * `<768px` Responsive columns or column props object
	 */
	xs?: number | ResponsiveSize;
	/**
	 * `≥768px` Responsive columns or column props object
	 */
	sm?: number | ResponsiveSize;
	/**
	 * `≥992px` Responsive columns or column props object
	 */
	md?: number | ResponsiveSize;
	/**
	 * `≥1200px` Responsive columns or column props object
	 */
	lg?: number | ResponsiveSize;
	/**
	 * `≥1920px` Responsive columns or column props object
	 */
	xl?: number | ResponsiveSize;
	/**
	 * custom element tag
	 */
	tag: string;
};
