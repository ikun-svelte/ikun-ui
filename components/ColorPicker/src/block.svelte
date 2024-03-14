<script lang="ts">
	import type { KColorPickerBlockProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import tinycolor from 'tinycolor2';
	export let focus: KColorPickerBlockProps['focus'] = false;
	export let trigger: KColorPickerBlockProps['trigger'] = false;
	export let isClear: KColorPickerBlockProps['isClear'] = false;
	export let size: KColorPickerBlockProps['size'] = 'md';
	export let value: KColorPickerBlockProps['value'] = '';
	export let cls: KColorPickerBlockProps['cls'] = '';
	export let attrs: KColorPickerBlockProps['attrs'] = {};

	const prefixCls = getPrefixCls('color-picker-block');
	const contentCls = `${prefixCls}-content`;

	$: cnames = clsx(prefixCls, cls);
	$: blockBg = `#${tinycolor(value).toHex()}`

	$: contentSizeCls = clsx({
		[`${prefixCls}-content--${size}`]: trigger,
		[`${prefixCls}-content--clear`]: isClear
	});
	$: wrapperCls = clsx(`${prefixCls}-w`, {
		[`${prefixCls}-w--${size}`]: trigger,
		[`${prefixCls}-w--focus`]: focus
	});
	$: cnamesSize = clsx(
		{
			[`${prefixCls}`]: !isClear,
			[`${prefixCls}-clear`]: isClear,
			[`${prefixCls}--${size}`]: trigger
		},
		{
			[`${prefixCls}--${size}`]: trigger
		},
		cls
	);
</script>

{#if trigger}
	<div class={wrapperCls}>
		<div class={cnamesSize} {...$$restProps} {...attrs}>
			<div class={contentSizeCls} style:background-color={blockBg}></div>
		</div>
	</div>
{:else}
	<div class={cnames} {...$$restProps} {...attrs}>
		<div class={contentCls} style:background-color={blockBg}></div>
	</div>
{/if}
