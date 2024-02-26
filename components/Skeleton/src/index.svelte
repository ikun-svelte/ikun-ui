<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSkeletonProps } from './types';

	export let cls: KSkeletonProps['cls'] = undefined;
	export let attrs: KSkeletonProps['attrs'] = {};

	const prefixCls = getPrefixCls('skeleton');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
