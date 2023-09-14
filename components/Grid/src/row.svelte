<script lang="ts">
	import { getPrefixCls, KSymbolKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KGridProps } from './types';
	import { setContext } from 'svelte';
	export let cls: KGridProps['cls'] = undefined;
	export let attrs: KGridProps['attrs'] = {};
	export let gutter: KGridProps['gutter'] = 0;
	export let justify: KGridProps['justify'] = 'start';
	export let align: KGridProps['align'] = undefined;
	export let tag: KGridProps['tag'] = 'div';

	$: gutterValue = gutter;
	setContext(KSymbolKey, {
		gutter: gutterValue
	});

	$: mxStyle = undefined;
	$: {
		if (gutterValue) {
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

<div class={cnames} {...$$restProps} {...attrs}></div>

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
