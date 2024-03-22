<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTimelineProps } from './types';

	export let cls: KTimelineProps['cls'] = undefined;
	export let attrs: KTimelineProps['attrs'] = {};

	const prefixCls = getPrefixCls('timeline');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
