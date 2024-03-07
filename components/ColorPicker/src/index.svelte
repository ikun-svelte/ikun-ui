<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KColorPickerProps } from './types';

	export let cls: KColorPickerProps['cls'] = '';
	export let attrs: KColorPickerProps['attrs'] = {};

	const prefixCls = getPrefixCls('color-picker');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
