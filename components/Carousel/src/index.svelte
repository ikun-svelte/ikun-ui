<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCarouselProps } from './types';
	import KIndicators from './indicators.svelte';
	import KCarouselPager from './pager.svelte';
	export let cls: KCarouselProps['cls'] = undefined;
	export let attrs: KCarouselProps['attrs'] = {};
	export let count: KCarouselProps['count'] = 0;

	let pagerRef = null
	$: wrapWidth = `${count * 100}%`
	// TODO
	$: wrapLeft = ``
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
		<KCarouselPager />
	</slot>
	<slot name="indicators">
		<KIndicators />
	</slot>
</div>
