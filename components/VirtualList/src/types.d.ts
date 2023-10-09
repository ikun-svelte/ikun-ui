/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KVirtualListProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
	options: KVirtualListOptions;
};

export interface KVirtualListOptions {
	/**
	 * Source for list
	 */
	data: Array<Record<string, any>>;
	/**
	 * Unique key for getting data from `data`
	 * @default id
	 */
	key: string;
	/**
	 * Count of rendered items
	 * @default 30
	 */
	keeps?: number;
	/**
	 * Estimate size of each item, needs for smooth scrollbar
	 * @default 50
	 */
	estimateSize?: number;
	/**
	 * Scroll direction
	 * @default false
	 */
	isHorizontal?: boolean;
	/**
	 * Let virtual list using global document to scroll through the list
	 * @default false
	 */
	pageMode?: boolean;
	/**
	 * scroll position start index
	 * @default 0
	 */
	start?: number;
	/**
	 * scroll position offset
	 * @default 0
	 */
	offset?: number;
	/**
	 * The threshold to emit `top` event, attention to multiple calls.
	 * @default 0
	 */
	topThreshold?: number;
	/**
	 * The threshold to emit `bottom` event, attention to multiple calls.
	 * @default 0
	 */
	bottomThreshold?: number;
}
