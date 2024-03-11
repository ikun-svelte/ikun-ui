<script lang="ts">
	import type { KColorPickerBlockProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { colord } from 'colord';
	// TODO: border
	// TODO: focus
	export let value: KColorPickerBlockProps['value'] = '';
	export let cls: KColorPickerBlockProps['cls'] = '';
	export let attrs: KColorPickerBlockProps['attrs'] = {};

	const prefixCls = getPrefixCls('color-picker-block');
	const contentCls = `${prefixCls}--content`;
	$: cnames = clsx(prefixCls, cls);
	$: blockBg = colord(value).toHex();
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<div class={contentCls} style:background-color={blockBg}></div>
</div>
