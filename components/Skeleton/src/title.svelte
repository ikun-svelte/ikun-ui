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
	$: cnames = clsx(prefixCls, `${prefixCls}--${size}`, { [`${prefixCls}--active`]: active }, cls);

	$: styleWidth = width === undefined || width === null ? '50%' : `${width}px`;
</script>

<div class={cnames} style:width={styleWidth} {...$$restProps} {...attrs}></div>
