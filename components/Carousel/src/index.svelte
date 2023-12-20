<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCarouselProps } from './types';
	import KIndicators from './indicators.svelte';
	import KCarouselPager from './pager.svelte';
	export let cls: KCarouselProps['cls'] = undefined;
	export let attrs: KCarouselProps['attrs'] = {};
	export let trigger: KCarouselProps['trigger'] = 'click';
	export let arrow: KCarouselProps['arrow'] = 'hover';
	export let count: KCarouselProps['count'] = 0;
	export let height: KCarouselProps['count'] = 0;
	export let initialIndex: KCarouselProps['initialIndex'] = 0;
	$: wrapWidth = `${count * 100}%`;

	let pageIndex = initialIndex;
	let resolveHeight = height ? `${height}px` : '';
	const handlePageChange = (e: CustomEvent) => {
		pageIndex = e.detail;
		const children = document.querySelector('.k-carousel-wrap')?.children;
		if (children) {
			resolveHeight = `${children[pageIndex].clientHeight}px`;
		}
	};

	const showPager = (show: boolean) => {
		if (arrow === 'always') return true;
		if (arrow === 'never') return false;
		if (arrow === 'hover') return show;
	};
	let isShowPager = showPager(false);
	const handleMouseenter = () => {
		isShowPager = showPager(true);
	};

	const handleMouseleave = () => {
		isShowPager = showPager(false);
	};

	$: wrapLeft = `-${pageIndex * 100}%`;
	const prefixCls = getPrefixCls('carousel');
	$: cnames = clsx(prefixCls, cls);
	$: wrapCls = clsx(`${prefixCls}-wrap`);
</script>

<div
	style:height={resolveHeight}
	aria-hidden="true"
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
	class={cnames}
	{...$$restProps}
	{...attrs}
>
	<div class={wrapCls} style:width={wrapWidth} style:left={wrapLeft} data-carousel-container>
		<slot />
	</div>

	<slot name="pager">
		<KCarouselPager
			show={isShowPager}
			defaultPageIndex={pageIndex}
			on:change={handlePageChange}
			{count}
		/>
	</slot>
	<slot name="indicators">
		<KIndicators {count} {trigger} on:change={handlePageChange} defaultPageIndex={pageIndex} />
	</slot>
</div>
