<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KAffixProps } from './types';

	export let cls: KAffixProps['cls'] = undefined;
	export let attrs: KAffixProps['attrs'] = {};

	const prefixCls = getPrefixCls('affix');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
