<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KStepsProps } from './types';

	export let cls: KStepsProps['cls'] = undefined;
	export let attrs: KStepsProps['attrs'] = {};

	const prefixCls = getPrefixCls('steps');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
