<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { isNumber } from 'baiwusanyu-utils';
	import type { KFlexProps } from './types';
	export let elm: KFlexProps['elm'] = 'div';
	export let vertical: KFlexProps['vertical'] = false;
	export let justify: KFlexProps['justify'] = 'normal';
	export let align: KFlexProps['align'] = 'normal';
	export let wrap: KFlexProps['wrap'] = 'nowrap';
	export let flex: KFlexProps['flex'] = undefined;
	export let gap: KFlexProps['gap'] = undefined;
	export let cls: KFlexProps['cls'] = undefined;
	export let attrs: KFlexProps['attrs'] = {};

	$: gapInner = () => {
		if (gap === 'sm') {
			return '8px';
		}

		if (gap === 'md') {
			return '16px';
		}

		if (gap === 'lg') {
			return '24px';
		}

		if (isNumber(gap)) {
			return `${gap}px`;
		}
	};
	const prefixCls = getPrefixCls('flex');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--row`]: !vertical,
			[`${prefixCls}--col`]: vertical
		},
		`${prefixCls}--${wrap}`,
		`${prefixCls}--${justify}`,
		`${prefixCls}--${align}`,
		cls
	);
</script>

<svelte:element
	this={elm}
	style:gap={gapInner()}
	style:flex
	class={cnames}
	{...attrs}
	{...$$restProps}
>
	<slot />
</svelte:element>
