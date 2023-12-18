<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type {KCarouselPagerProps, KCarouselProps} from './types';
	import { KIcon } from "@ikun-ui/icon";
	import {createEventDispatcher} from "svelte";

	export let defaultPageIndex: KCarouselPagerProps['defaultPageIndex'] = 0;
	export let count: KCarouselPagerProps['count'] = 0;
	export let cls: KCarouselProps['cls'] = undefined;
	export let attrs: KCarouselProps['attrs'] = {};

	let pageIndex = defaultPageIndex

	const setPageIndex = (current: number) => {
		pageIndex = current
	}

	export const getPageIndex = () => pageIndex

	const dispatch = createEventDispatcher();
	const jumpPage = (page: number) => {
		pageIndex += page
		pageIndex = pageIndex < 0 ? 0 : pageIndex >= count ? count - 1 : pageIndex
		dispatch('change', pageIndex)
	}

	const gotoPrev= () => jumpPage(-1)

	const  gotoNext = () => jumpPage(1)

	const prefixCls = getPrefixCls('carousel--pager');
	$: cnames = clsx(prefixCls, cls);
	$: iconCls = clsx(
		`${prefixCls}--icon`
	);
	$: prevCls = clsx(
		`${iconCls}`,
		`${prefixCls}--prev`
	);
	$: nextCls = clsx(
		`${iconCls}`,
		`${prefixCls}--next`
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot name="prev">
		<div role="button"
			 class={prevCls}
			 aria-hidden="true"
			 on:click={gotoPrev}>
			<KIcon icon="i-carbon-chevron-left" width="16px" height="16px"/>
		</div>
	</slot>
	<slot name="next">
		<div role="button"
			 class={nextCls}
			 aria-hidden="true"
			 on:click={gotoNext}>
			<KIcon icon="i-carbon-chevron-right" width="16px" height="16px"/>
		</div>
	</slot>
</div>
