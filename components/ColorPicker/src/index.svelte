<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KColorPickerProps } from './types';
	import { KPopover } from '@ikun-ui/popover';
	import { colord, type HsvaColor } from 'colord';
	import KColorPickerPalette from './palette.svelte';
	import { createEventDispatcher } from 'svelte';
	export let allowClear: KColorPickerProps['allowClear'] = false;
	export let value: KColorPickerProps['value'] = '';
	export let defaultValue: KColorPickerProps['defaultValue'] = '';
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

	// TODO: 三色的传入和穿出，内部统一使用 hsv来处理

	function formatColor(format: KColorPickerProps['format'], color: KColorPickerProps['value']) {
		if (format === 'rgb') {
			return colord(color).toRgb();
		} else if (format === 'hex') {
			return colord(color).toHex();
		} else if (format === 'hsv') {
			return colord(color).toHsv();
		}
	}

	const dispatch = createEventDispatcher();
	function handleChangeComplete(e: CustomEvent) {
		dispatch('changeComplete', genReturnColor(e));
	}
	function handleChange(e: CustomEvent) {
		dispatch('change', genReturnColor(e));
	}

	function genReturnColor(e: CustomEvent) {
		return {
			rgb: formatColor('rgb', e.detail),
			hex: formatColor('hex', e.detail),
			hsv: formatColor('hsv', e.detail)
		};
	}

	$: hsvColor = formatColor('hsv', value) as HsvaColor;
	$: defaultHsvColor = formatColor('hsv', defaultValue) as HsvaColor;

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
	<div slot="contentEl">
		<KColorPickerPalette
			value={hsvColor}
			defaultValue={defaultHsvColor}
			on:change={handleChange}
			on:changeComplete={handleChangeComplete}
		></KColorPickerPalette>
	</div>
</KPopover>
