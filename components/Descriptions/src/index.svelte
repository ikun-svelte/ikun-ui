<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KDescriptionsProps } from './types';

	export let cls: KDescriptionsProps['cls'] = undefined;
	export let attrs: KDescriptionsProps['attrs'] = {};

	const prefixCls = getPrefixCls('descriptions');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
