<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonButtonProps } from './types';
	export let active: KSkeletonButtonProps['active'] = false;
	export let shape: KSkeletonButtonProps['shape'] = 'round';
	export let block: KSkeletonButtonProps['block'] = false;
	export let size: KSkeletonButtonProps['size'] = 'md';
	export let cls: KSkeletonButtonProps['cls'] = '';
	export let attrs: KSkeletonButtonProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton-button');
	const prefixClsSke = getPrefixCls('skeleton');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--${shape}--${size}`]: shape === 'circle'
		},
		{
			[`${prefixCls}--${size}`]: !block && shape !== 'circle',
			[`${prefixCls}--${shape}`]: shape !== 'circle',
			[`${prefixCls}--block--${size}`]: block && shape !== 'circle'
		},
		{
			[`${prefixClsSke}--active`]: active,
			[`${prefixCls}-un--active`]: !active
		},
		cls
	);
</script>

<button class={cnames} {...$$restProps} {...attrs}></button>
