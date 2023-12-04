<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KDropdownProps } from './types';

	export let cls: KDropdownProps['cls'] = undefined;
	export let attrs: KDropdownProps['attrs'] = {};

	const prefixCls = getPrefixCls('dropdown');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
