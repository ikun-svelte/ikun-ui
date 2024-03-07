<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KColorPickerProps } from './types';
	import { KPopover } from '@ikun-ui/popover';
	export let allowClear: KColorPickerProps['allowClear'] = false;
	export let value: KColorPickerProps['value'] = '';
	export let format: KColorPickerProps['format'] = 'rgb';
	export let disabled: KColorPickerProps['disabled'] = false;
	export let disabledAlpha: KColorPickerProps['disabledAlpha'] = false;
	export let placement: KColorPickerProps['placement'] = 'top';
	export let presets: KColorPickerProps['presets'] = undefined;
	export let size: KColorPickerProps['size'] = 'md';
	export let showText: KColorPickerProps['showText'] = false;
	export let trigger: KColorPickerProps['trigger'] = 'click';
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

<KPopover {placement} {trigger}>
	<div slot="triggerEl" class={cnames} {...$$restProps} {...attrs}>
		{#if $$slots.default}
			<slot />
		{:else}
			<div>trigger</div>
		{/if}
	</div>
	<div slot="contentEl">color</div>
</KPopover>
