<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KColorPickerPaletteProps } from './types.js';
	export let cls: KColorPickerPaletteProps['cls'] = '';
	export let attrs: KColorPickerPaletteProps['attrs'] = {};
	export let value: KColorPickerPaletteProps['value'] = '';
	const prefixCls = getPrefixCls('color-picker-palette');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}></div>
