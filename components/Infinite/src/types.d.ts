/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KInfiniteProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
	/**
	 * Threshold to call loadMore
	 * @default 0
	 */
	threshold: number;
	/**
	 * Element to bind scroll
	 */
	elementScroll: HTMLElement | undefined;
	/**
	 * Bind scroll in window
	 * @default false
	 */
	window: boolean;
	/**
	 * Tells you if there are more items to load
	 * @default true
	 */
	hasMore: boolean;
	/**
	 * Changing orientation
	 * @default false
	 */
	horizontal: boolean;
	/**
	 * Revese scroll direction
	 * @default false
	 */
	reverse: boolean;
};
