<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCarouselProps } from './types';
	import KIndicators from './indicators.svelte';
	import KCarouselPager from './pager.svelte';
	export let cls: KCarouselProps['cls'] = undefined;
	export let attrs: KCarouselProps['attrs'] = {};
	export let count: KCarouselProps['count'] = 0;
	export let initialIndex: KCarouselProps['initialIndex'] = 0;
	$: wrapWidth = `${count * 100}%`

	let pageIndex = initialIndex
	const handlePageChange = (e: CustomEvent) => {
		pageIndex = e.detail
	}
	$: wrapLeft = `-${(pageIndex) * 100}%`
	const prefixCls = getPrefixCls('carousel');
	$: cnames = clsx(
		prefixCls,
		cls
	);
	$: wrapCls = clsx(`${prefixCls}-wrap`);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={wrapCls}
		 style:width={wrapWidth}
		 style:left={wrapLeft}
		 data-carousel-container>
		<slot />
	</div>

	<slot name="pager">
		<KCarouselPager
				defaultPageIndex={initialIndex}
				on:change={handlePageChange}
				{count}/>
	</slot>
	<slot name="indicators">
		<KIndicators />
	</slot>
</div>
