<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonInputProps } from './types';
	export let active: KSkeletonInputProps['active'] = false;
	export let block: KSkeletonInputProps['block'] = false;
	export let size: KSkeletonInputProps['size'] = 'md';
	export let cls: KSkeletonInputProps['cls'] = '';
	export let attrs: KSkeletonInputProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton-input');
	const prefixClsSke = getPrefixCls('skeleton');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--${size}`]: !block,
			[`${prefixCls}--block--${size}`]: block
		},
		{
			[`${prefixClsSke}--active`]: active
		},
		'k-skeleton-input__dark',
		cls
	);
</script>

<input class={cnames} {...$$restProps} {...attrs} readonly />
