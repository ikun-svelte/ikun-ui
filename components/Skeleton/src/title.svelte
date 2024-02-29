<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonTitleProps } from './types';

	export let width: KSkeletonTitleProps['width'] = undefined;
	export let active: KSkeletonTitleProps['active'] = false;
	export let size: KSkeletonTitleProps['size'] = 'md';
	export let cls: KSkeletonTitleProps['cls'] = '';
	export let attrs: KSkeletonTitleProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton-title');
  const prefixClsSke = getPrefixCls('skeleton');
	$: cnames = clsx(prefixCls,
    `${prefixCls}--${size}`,
    {
      [`${prefixClsSke}--active`]: active,
    },
    cls
  );

	$: styleWidth = width === undefined || width === null ? '50%' : `${width}`;
</script>

<div class={cnames} style:width={styleWidth} {...$$restProps} {...attrs}></div>
