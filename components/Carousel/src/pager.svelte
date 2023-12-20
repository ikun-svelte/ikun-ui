<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCarouselPagerProps } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';

	export let defaultPageIndex: KCarouselPagerProps['defaultPageIndex'] = 0;
	export let count: KCarouselPagerProps['count'] = 0;
	export let cls: KCarouselPagerProps['cls'] = undefined;
	export let attrs: KCarouselPagerProps['attrs'] = {};

	$: pageIndex = defaultPageIndex;

	// let resolveIndex = defaultPageIndex
	// const setPageIndex = (current: number) => {
	// 	pageIndex = current
	// }

	// export const getPageIndex = () => pageIndex

	const dispatch = createEventDispatcher();
	const jumpPage = (page: number) => {
		let resolveIndex = pageIndex + page;
		resolveIndex = resolveIndex < 0 ? 0 : resolveIndex >= count ? count - 1 : resolveIndex;
		dispatch('change', resolveIndex);
	};

	const gotoPrev = () => jumpPage(-1);

	const gotoNext = () => jumpPage(1);

	const prefixCls = getPrefixCls('carousel-pager');
	$: cnames = clsx(prefixCls, cls);
	$: iconCls = clsx(`${prefixCls}-icon`);
	$: prevCls = clsx(`${iconCls}`, `${prefixCls}-prev`);
	$: nextCls = clsx(`${iconCls}`, `${prefixCls}-next`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot name="prev">
		<div role="button" class={prevCls} aria-hidden="true" on:click={gotoPrev}>
			<KIcon icon="i-carbon-chevron-left" width="16px" height="16px" />
		</div>
	</slot>
	<slot name="next">
		<div role="button" class={nextCls} aria-hidden="true" on:click={gotoNext}>
			<KIcon icon="i-carbon-chevron-right" width="16px" height="16px" />
		</div>
	</slot>
</div>
