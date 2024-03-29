<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KCalendarProps } from './types';

	export let cls: KCalendarProps['cls'] = undefined;
	export let attrs: KCalendarProps['attrs'] = {};

	const prefixCls = getPrefixCls('calendar');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
