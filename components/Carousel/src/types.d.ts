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
};

export type KCarouselPagerProps = {
	defaultPageIndex: number;
	show: boolean;
	count: number;
	loop: boolean;
	cls: ClassValue;
	attrs: Record<string, string>;
};

export type KIndicatorsProps = {
	defaultPageIndex: number;
	trigger: 'click' | 'hover';
	count: number;
	cls: ClassValue;
	attrs: Record<string, string>;
};
// TODO: KCarousel 自定义分页器
// TODO: KCarousel 自定义指示器

// TODO: KCarousel - props direction 展示的方向(next version enhancement)
