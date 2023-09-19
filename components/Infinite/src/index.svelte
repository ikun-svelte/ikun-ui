<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KInfiniteProps } from './types';

	export let cls: KInfiniteProps['cls'] = undefined;
	export let attrs: KInfiniteProps['attrs'] = {};

	const prefixCls = getPrefixCls('infinite');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
