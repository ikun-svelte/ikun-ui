/// <reference types="svelte" />
import type { ClassValue } from 'clsx';
export type KCarouselProps = {
	initialIndex: number;
	height: number;
	trigger: 'click' | 'hover';
	arrow: 'always' | 'hover' | 'never';
	loop: boolean;
	autoplay: boolean;
	interval: number;
	pauseOnHover: boolean;
	count: number;
	cls: ClassValue;
	attrs: Record<string, string>;
	direction: 'horizontal' | 'vertical';
};

export type KCarouselArrowProps = {
	defaultPageIndex: number;
	show: boolean;
	count: number;
	loop: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

// TODO: KCarousel - props direction 展示的方向(next version enhancement)
