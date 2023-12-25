<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KInputNumberProps } from './types';

	export let cls: KInputNumberProps['cls'] = undefined;
	export let attrs: KInputNumberProps['attrs'] = {};

	const prefixCls = getPrefixCls('input-number');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
