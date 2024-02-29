<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonAvatarProps } from './types';

	export let active: KSkeletonAvatarProps['active'] = false;
	export let size: KSkeletonAvatarProps['size'] = 'md';
	export let shape: KSkeletonAvatarProps['shape'] = 'circle';
	export let cls: KSkeletonAvatarProps['cls'] = '';
	export let attrs: KSkeletonAvatarProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton-avatar');
	const prefixClsSke = getPrefixCls('skeleton');
	const prefixClsContainer = getPrefixCls('skeleton-avatar-container');
	$: containerCls = clsx(`${prefixClsContainer}--${size}`);
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}--${size}`,
		`${prefixCls}--${shape}`,
		{
			[`${prefixClsSke}--active`]: active
		},
		cls
	);
</script>

<div class={containerCls} {...$$restProps} {...attrs}>
	<div class={cnames}></div>
</div>
