<script lang="ts">
	import { getPrefixCls, rowKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KGridProps, KRowProps } from './types';
	import { setContext } from 'svelte';
	export let cls: KGridProps['cls'] = undefined;
	export let attrs: KGridProps['attrs'] = {};
	export let gutter: KRowProps['gutter'] = 0;
	export let justify: KRowProps['justify'] = 'start';
	export let align: KRowProps['align'] = undefined;
	export let tag: KRowProps['tag'] = 'div';

	setContext(rowKey, {
		gutter
	});

	$: mxStyle = '';
	$: {
		if (gutter) {
			mxStyle = `-${gutter / 2}px`;
		}
	}

	// class
	const prefixCls = getPrefixCls('row');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true,
			[`${prefixCls}__justify__${justify}`]: true,
			[`${prefixCls}__align__${align}`]: align
		},
		cls
	);
</script>

<svelte:element
	this={tag}
	class={cnames}
	style:margin-right={mxStyle}
	style:margin-left={mxStyle}
	{...$$restProps}
	{...attrs}
>
	<slot />
</svelte:element>
