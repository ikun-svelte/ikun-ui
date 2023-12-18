<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCarouselProps } from './types';
	import KIndicators from './indicators.svelte';
	import KCarouselPager from './pager.svelte';
	export let cls: KCarouselProps['cls'] = undefined;
	export let attrs: KCarouselProps['attrs'] = {};

	const prefixCls = getPrefixCls('carousel');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
	<slot name="pager">
		<KCarouselPager />
	</slot>
	<slot name="indicators">
		<KIndicators />
	</slot>
</div>
