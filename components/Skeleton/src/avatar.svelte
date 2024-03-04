<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonAvatarProps } from './types';

	export let active: KSkeletonAvatarProps['active'] = false;
	export let size: KSkeletonAvatarProps['size'] = 'md';
	export let shape: KSkeletonAvatarProps['shape'] = 'circle';
	export let cls: KSkeletonAvatarProps['cls'] = '';
	export let attrs: KSkeletonAvatarProps['attrs'] = {};
	/**
	 * @internal
	 */
	export let isInSK: KSkeletonAvatarProps['isInSK'] = false;

	const prefixCls = getPrefixCls('skeleton-avatar');
	const prefixClsSke = getPrefixCls('skeleton');
	const prefixClsContainer = getPrefixCls('skeleton-avatar-container');
	$: containerCls = clsx({
		[`${prefixClsContainer}--${size}`]: isInSK
	});
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}--${shape}`,
		{
			[`${prefixCls}-sk`]: isInSK,
			[`${prefixCls}-sk--${size}`]: isInSK,
			[`${prefixCls}--${size}`]: !isInSK,
			[`${prefixClsSke}--active`]: active
		},
		'k-skeleton-avatar__dark',
		cls
	);
</script>

<div class={containerCls} {...$$restProps} {...attrs}>
	<div class={cnames}></div>
</div>
