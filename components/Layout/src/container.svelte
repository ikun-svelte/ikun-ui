<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KContainerProps, KLayoutProps } from './types';

	export let cls: KLayoutProps['cls'] = undefined;
	export let attrs: KLayoutProps['attrs'] = {};
	export let direction: KContainerProps['direction'] = '';

	$: isVertical =
		direction === 'vertical' || (!direction && $$slots && ($$slots.header || $$slots.footer));

	const prefixCls = getPrefixCls('container');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true,
			[`${prefixCls}--base__vertical`]: isVertical
		},
		cls
	);
</script>

<section class={cnames} {...$$restProps} {...attrs}>
	<slot name="header" />
	<slot />
	<slot name="footer" />
</section>
