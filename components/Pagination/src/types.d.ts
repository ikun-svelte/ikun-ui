/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KPaginationProps = {
	cls: ClassValue;
	attrs: Record<string, string>;
	total: number;
	pagerCount: number;
	pageSize: number;
	currentPage: number;
	prevText: string;
	prevIcon: string;
	nextText: string;
	nextIcon: string;
	infinite: boolean;
	layout: Array<'jumper' | 'sizes' | 'total' | 'pager'>;
	// common
	disabled: boolean;
	size: IKunSize;
	// pager
	index: number | string;
	isActive: boolean;
	isBg: boolean;
	text: string;
	icon: string;
	type?: 'next' | 'prev' | 'prevPoint' | 'nextPoint';
	// sizes
	pageSizes: number[];
	pageSizesWidth: number;
};
// TODO: dark mode
