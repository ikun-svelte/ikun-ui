<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { HsvaColor, KColorPickerProps } from "./types";
	import { KPopover } from '@ikun-ui/popover';
	import tinycolor from 'tinycolor2';
	import KColorPickerPalette from './palette.svelte';
	import KColorPickerSlider from './slider.svelte';
	import KColorPickerBlock from './block.svelte';
	import KColorPickerFormat from './format.svelte';
	import { createEventDispatcher } from 'svelte';
	export let allowClear: KColorPickerProps['allowClear'] = false;
	export let title: KColorPickerProps['title'] = '';
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

	const dispatch = createEventDispatcher();
	function handleChangeComplete(e: CustomEvent) {
		const res = {...e.detail, a: aColor.a}
		aColor = res
		blockColor = res
		formatterColor = res
		isClear = false;
		//dispatch('changeComplete', e.detail);
	}
	function handleChange(e: CustomEvent) {
		const res = {...e.detail, a: aColor.a}
		aColor = res
		blockColor = res
		formatterColor = res
		isClear = false;
		//dispatch('change', e.detail);
	}

	function handleHValueInput(e: CustomEvent) {
		const res = {...e.detail, a: aColor.a}
		aColor = res
		blockColor = res
		formatterColor = res
		defaultPaletteColor = e.detail
		isClear = false;
		// dispatch('change', e.detail);
	}

	function handleAValueInput(e: CustomEvent) {
		blockColor = e.detail
		formatterColor = e.detail
		isClear = false;
		// dispatch('changeComplete', e.detail);
	}

	let focus = false;
	function onDisplayChange(e: CustomEvent) {
		focus = e.detail;
	}

	let isClear = false;
	function handleClear() {
		aColor.a = 0
		blockColor = aColor
		formatterColor = aColor
		isClear = true;
		// dispatch('clear');
		// dispatch('change', null);
	}

	$: formatValue = format
	function handleFormatInput(e: CustomEvent) {
		// colorValue = e.detail
		// colorHsvValue = colord(colorValue).toHsv();
	}


	let hsvValue:HsvaColor = { h:0, s: 0, v: 0, a: 100}
	let hsvDefaultValue:HsvaColor = { h:0, s: 0, v: 0, a: 100}
  $: {
		hsvValue = tinycolor(value).toHsv() as HsvaColor;
		hsvValue.s = hsvValue.s * 100
		hsvValue.v = hsvValue.v * 100

		hsvDefaultValue = tinycolor(defaultValue).toHsv();
		hsvDefaultValue.s = hsvDefaultValue.s * 100
		hsvDefaultValue.v = hsvDefaultValue.v * 100
	}
	$: paletteColor = hsvValue
	$: defaultPaletteColor = hsvDefaultValue
	$: hColor = hsvValue
	$: aColor = hsvValue
	$: blockColor = hsvValue
	$: formatterColor = hsvValue

	const prefixCls = getPrefixCls('color-picker');
	const hsbCls = getPrefixCls('color-picker--hsb');
	const hsCls = getPrefixCls('color-picker--hs');
	const headerCls = getPrefixCls('color-picker-header');
	const clearCls = getPrefixCls('color-picker-clear');
	const lineCls = getPrefixCls('color-picker-line');
	$: titleCls = clsx({
		[`${prefixCls}-title`]: title
	});
	const clearClsx = clsx(clearCls, lineCls);
	const alphaCls = getPrefixCls('color-picker--alpha');
	$: cnames = clsx(prefixCls, cls);
</script>

<KPopover {placement}
		  {trigger}
		  on:change={onDisplayChange}>
	<div slot="triggerEl">
		{#if $$slots.default}
			<slot />
		{:else}
			<KColorPickerBlock value={blockColor} trigger {size} {focus} {isClear} />
		{/if}
	</div>
	<div slot="contentEl" class={cnames} {...$$restProps} {...attrs}>
		<div class={headerCls}>
			<slot name="title">
				<span class="{titleCls}">{title}</span>
			</slot>
			{#if allowClear}
				<div class={clearClsx} aria-hidden="true" on:click={handleClear}></div>
			{/if}
		</div>
		<KColorPickerPalette
			value={paletteColor}
			defaultValue={defaultPaletteColor}
			on:change={handleChange}
			on:changeComplete={handleChangeComplete}
		></KColorPickerPalette>
		<div class={hsbCls}>
			<div class={hsCls}>
				<KColorPickerSlider
						max={360}
						min={0}
						step={1}
						on:input={handleHValueInput}
						value={hColor}>
				</KColorPickerSlider>
				<KColorPickerSlider
					isAlpha
					on:input={handleAValueInput}
					cls={alphaCls}
					max={1}
					min={0}
					step={0.01}
					value={aColor}
				></KColorPickerSlider>
			</div>
			<KColorPickerBlock value={blockColor} />
		</div>
		<KColorPickerFormat value={formatterColor}
							{disabledAlpha}
							on:change={handleFormatInput}
							format ={formatValue}>
		</KColorPickerFormat>
	</div>
</KPopover>
