<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTourProps } from './types';

	export let cls: KTourProps['cls'] = undefined;
	export let attrs: KTourProps['attrs'] = {};

	const prefixCls = getPrefixCls('tour');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
