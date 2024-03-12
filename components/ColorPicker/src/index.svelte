<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KColorPickerProps } from './types';
	import { KPopover } from '@ikun-ui/popover';
	import { colord, type HsvaColor } from 'colord';
	import KColorPickerPalette from './palette.svelte';
	import KColorPickerSlider from './slider.svelte';
	import KColorPickerBlock from './block.svelte';
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
		dispatch('changeComplete', genReturnColor(e.detail));
	}
	function handleChange(e: CustomEvent) {
		dispatch('change', genReturnColor(e.detail));
	}

	function genReturnColor(val: HsvaColor) {
		return {
			rgb: formatColor('rgb', val),
			hex: formatColor('hex', val),
			hsv: formatColor('hsv', val)
		};
	}

	function handleHValueInput(e: CustomEvent) {
		hsvColor.h = e.detail.h;
		defaultHsvColor.h = e.detail.h;
		dispatch('change', genReturnColor(hsvColor));
	}

	function handleAValueInput(e: CustomEvent) {
		hsvColor.a = e.detail.a;
		dispatch('change', genReturnColor(hsvColor));
	}

	$: hsvColor = formatColor('hsv', value) as HsvaColor;
	$: defaultHsvColor = formatColor('hsv', defaultValue) as HsvaColor;

	const prefixCls = getPrefixCls('color-picker');
	const hsbCls = getPrefixCls('color-picker--hsb');
	const hsCls = getPrefixCls('color-picker--hs');
	const alphaCls = getPrefixCls('color-picker--alpha');
	$: cnames = clsx(prefixCls, cls);

	let focus = false;
	function onDisplayChange(e: CustomEvent) {
		focus = e.detail;
	}
</script>

<KPopover {placement} {trigger} on:change={onDisplayChange}>
	<div slot="triggerEl">
		{#if $$slots.default}
			<slot />
		{:else}
			<KColorPickerBlock value={hsvColor} trigger {size} {focus} />
		{/if}
	</div>
	<div slot="contentEl" class={cnames} {...$$restProps} {...attrs}>
		<KColorPickerPalette
			value={hsvColor}
			defaultValue={defaultHsvColor}
			on:change={handleChange}
			on:changeComplete={handleChangeComplete}
		></KColorPickerPalette>
		<div class={hsbCls}>
			<div class={hsCls}>
				<KColorPickerSlider max={360} min={0} step={1} on:input={handleHValueInput} value={hsvColor}
				></KColorPickerSlider>
				<KColorPickerSlider
					isAlpha
					on:input={handleAValueInput}
					cls={alphaCls}
					max={1}
					min={0}
					step={0.01}
					value={hsvColor}
				></KColorPickerSlider>
			</div>
			<KColorPickerBlock value={hsvColor} />
		</div>
	</div>
</KPopover>
