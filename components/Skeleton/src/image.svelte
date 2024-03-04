<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx } from 'clsx';
	import type { KSkeletonImageProps } from './types';
	export let active: KSkeletonImageProps['active'] = false;
	export let cls: KSkeletonImageProps['cls'] = '';
	export let attrs: KSkeletonImageProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton-image');
	const prefixClsSke = getPrefixCls('skeleton');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixClsSke}--active`]: active,
			[`${prefixCls}-un--active`]: !active
		},
		'k-skeleton-image-un--active__dark',
		cls
	);
	const iconCls = clsx(`${prefixCls}--icon`, 'k-skeleton-image--icon__dark');
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot>
		<KIcon cls={iconCls} icon="i-carbon-image" width="50px" height="50px"></KIcon>
	</slot>
</div>
