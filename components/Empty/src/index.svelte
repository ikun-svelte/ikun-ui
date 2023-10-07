<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KEmptyProps } from './types';

	export let cls: KEmptyProps['cls'] = undefined;
	export let attrs: KEmptyProps['attrs'] = {};

	const prefixCls = getPrefixCls('empty');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
