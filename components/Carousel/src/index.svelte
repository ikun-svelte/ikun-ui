<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCarouselProps } from './types';
	import KIndicators from './indicators.svelte';
	import KCarouselPager from './pager.svelte';
	import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
	export let cls: KCarouselProps['cls'] = undefined;
	export let attrs: KCarouselProps['attrs'] = {};
	export let trigger: KCarouselProps['trigger'] = 'click';
	export let arrow: KCarouselProps['arrow'] = 'hover';
	export let count: KCarouselProps['count'] = 0;
	export let loop: KCarouselProps['loop'] = true;
	export let autoplay: KCarouselProps['autoplay'] = true;
	export let pauseOnHover: KCarouselProps['pauseOnHover'] = true;
	export let interval: KCarouselProps['interval'] = 3000;
	export let height: KCarouselProps['count'] = 0;
	export let initialIndex: KCarouselProps['initialIndex'] = 0;
	$: wrapWidth = `${count * 100}%`;

	let pageIndex = initialIndex;
	let resolveHeight = height ? `${height}px` : '';
	let transition = 'left .5s ease 0s';
	const dispatch = createEventDispatcher();
	let oldIndex = pageIndex;
	const handlePageChange = async (e: CustomEvent) => {
		const { index, type: actionType } = e.detail;
		const children = document.querySelector('.k-carousel-wrap')?.children;
		oldIndex = pageIndex;
		if (!loop) {
			pageIndex = index;
			wrapLeft = `-${pageIndex * 100}%`;
			if (children) {
				resolveHeight = `${children[pageIndex].clientHeight}px`;
			}
			dispatch('change', { index: pageIndex, oldIndex });
			return;
		} else {
			if (children) {
				transition = 'left .5s ease 0s';
				resolveHeight = `${children[index].clientHeight}px`;

				if (actionType === 'etf' && loop) {
					pageIndex = count;
					wrapLeft = `-${pageIndex * 100}%`;
					const firstElm = children[0];
					if (firstElm) {
						(firstElm as HTMLElement).style.transform = `translateX(${wrapWidth}) scale(1)`;
						resetChild(firstElm as HTMLElement, index);
					}
				} else if (actionType === 'fte' && loop) {
					pageIndex = count;
					wrapLeft = `100%`;
					await tick();
					const lastElm = children[count - 1];
					if (lastElm) {
						(lastElm as HTMLElement).style.transform = `translateX(-${count * 100}%) scale(1)`;
						resetChild(lastElm as HTMLElement, index);
					}
				} else {
					pageIndex = index;
					wrapLeft = `-${pageIndex * 100}%`;
					dispatch('change', { index: pageIndex, oldIndex });
				}
			}
		}
	};

	function resetChild(el: HTMLElement, index: number) {
		setTimeout(() => {
			pageIndex = index;
			// reset
			el.style.transform = '';
			transition = '';
			wrapLeft = `-${pageIndex * 100}%`;
			dispatch('change', { index, oldIndex });
		}, 400);
	}

	const showPager = (show: boolean) => {
		if (arrow === 'always') return true;
		if (arrow === 'never') return false;
		if (arrow === 'hover') return show;
	};
	let isShowPager = showPager(false);
	const handleMouseenter = () => {
		pauseOnHover && timer && clearInterval(timer);
		isShowPager = showPager(true);
	};

	const handleMouseleave = () => {
		pauseOnHover && doAutoplay();
		isShowPager = showPager(false);
	};

	let pagerRef: any = null;
	let timer: null | number = null;
	const doAutoplay = () => {
		if (autoplay) {
			timer = window.setInterval(() => {
				pagerRef && pagerRef.gotoNext();
			}, interval);
		}
	};

	onMount(doAutoplay);

	onDestroy(() => {
		timer && clearInterval(timer);
	});

	/**
	 * api goto
	 * manual switch
	 * @public
	 */
	export function goto(page: number) {
		pagerRef && pagerRef.setPage(page);
	}

	/**
	 * api prev
	 * Switch to previous picture
	 * @public
	 */
	export function prev() {
		pagerRef && pagerRef.gotoPrev();
	}

	/**
	 * api next
	 * Switch to next picture
	 * @public
	 */
	export function next() {
		pagerRef && pagerRef.gotoNext();
	}

	let wrapLeft = `-${initialIndex * 100}%`;
	$: {
		wrapLeft = `-${initialIndex * 100}%`;
	}
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
	<div
		class={wrapCls}
		style:width={wrapWidth}
		style:left={wrapLeft}
		style:transition
		data-carousel-container
	>
		<slot />
	</div>

	<slot name="pager">
		<KCarouselPager
			bind:this={pagerRef}
			show={isShowPager}
			{loop}
			defaultPageIndex={pageIndex}
			on:change={handlePageChange}
			{count}
		/>
	</slot>
	<slot name="indicators">
		<KIndicators {count} {trigger} on:change={handlePageChange} defaultPageIndex={pageIndex} />
	</slot>
</div>
