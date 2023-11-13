<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KPaginationProps } from './types';
	export let total: KPaginationProps['total'] = 0;
	export let size: KPaginationProps['size'] = 'md';
	export let disabled: KPaginationProps['disabled'] = false;
	const prefixCls = getPrefixCls('pagination-total');
	$: cnames = clsx(prefixCls, {
		[`${prefixCls}__dark`]: !disabled,
		[`${prefixCls}__${size}`]: true,
		[`${prefixCls}__disabled`]: disabled
	});
</script>

<span class={cnames}>
	Total {total}
</span>
