<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KGridProps } from './types';
	export let cls: KGridProps['cls'] = undefined;
	export let attrs: KGridProps['attrs'] = {};

	const prefixCls = getPrefixCls('col');

	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
