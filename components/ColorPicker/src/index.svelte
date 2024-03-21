<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { HsvaColor, KColorPickerProps } from './types';
	import { KPopover } from '@ikun-ui/popover';
	import { toRgbString, toHsvString, toHex8String, toHsv } from './utils';
	import KColorPickerPalette from './palette.svelte';
	import KColorPickerSlider from './slider.svelte';
	import KColorPickerBlock from './block.svelte';
	import KColorPickerFormat from './format.svelte';
	import KColorPickerPreset from './preset.svelte';
	import { createEventDispatcher } from 'svelte';
	export let allowClear: KColorPickerProps['allowClear'] = false;
	export let title: KColorPickerProps['title'] = '';
	export let value: KColorPickerProps['value'] = '';
	export let defaultValue: KColorPickerProps['defaultValue'] = '';
	export let format: KColorPickerProps['format'] = 'hex';
	export let disabled: KColorPickerProps['disabled'] = false;
	export let disabledAlpha: KColorPickerProps['disabledAlpha'] = false;
	export let placement: KColorPickerProps['placement'] = 'top';
	export let presets: KColorPickerProps['presets'] = [];
	export let size: KColorPickerProps['size'] = 'md';
	export let showText: KColorPickerProps['showText'] = false;
	export let trigger: KColorPickerProps['trigger'] = 'click';
	export let cls: KColorPickerProps['cls'] = '';
	export let attrs: KColorPickerProps['attrs'] = {};

	function formatColor(format: KColorPickerProps['format'], value: KColorPickerProps['value']) {
		if (format === 'rgb') {
			return toRgbString(value);
		}
		if (format === 'hsv') {
			return toHsvString(value);
		}
		return toHex8String(value);
	}

	const dispatch = createEventDispatcher();
	function handleChangeComplete(e: CustomEvent) {
		isDragging = false;
		const res = { ...e.detail, a: aColor.a };
		aColor = res;
		blockColor = res;
		formatterColor = res;
		isClear = false;
		dispatch('changeComplete', formatColor(formatValue, blockColor));
	}

	let isDragging = false;
	function handleChange(e: CustomEvent) {
		isDragging = true;
		const res = { ...e.detail, a: aColor.a };
		aColor = res;
		blockColor = res;
		formatterColor = res;
		isClear = false;
		dispatch('change', formatColor(formatValue, blockColor));
	}

	function handleHValueInput(e: CustomEvent) {
		// console.log(aColor)
		const res = { ...e.detail, a: aColor.a };
		aColor = { ...aColor, h: res.h, a: res.a };
		// console.log(aColor)
		blockColor = { ...blockColor, h: res.h, a: res.a };
		formatterColor = { ...formatterColor, h: res.h, a: res.a };
		defaultPaletteColor = { ...defaultPaletteColor, h: res.h, a: res.a };
		isClear = false;

		const resolveColor = formatColor(formatValue, blockColor);
		dispatch('change', resolveColor);
		dispatch('changeComplete', resolveColor);
	}

	function handleAValueInput(e: CustomEvent) {
		aColor.a = e.detail.a;
		blockColor = e.detail;
		formatterColor = e.detail;
		isClear = false;
		dispatch('changeComplete', formatColor(formatValue, blockColor));
	}

	let focus = false;
	function onDisplayChange(e: CustomEvent) {
		focus = e.detail;
		dispatch('openChange', focus);
	}

	let isClear = false;
	function handleClear() {
		aColor.a = 0;
		blockColor = aColor;
		formatterColor = aColor;
		isClear = true;
		dispatch('clear');
		dispatch('change', null);
	}

	let paletteRef: any = null;
	$: formatValue = format;
	function handleFormatInput(e: CustomEvent) {
		const hsv = toHsv(e.detail.value) as HsvaColor;
		formatValue = e.detail.format;

		blockColor = hsv;
		paletteColor = hsv;
		aColor = hsv;
		hColor = hsv;
		defaultPaletteColor = { ...hColor, s: 1, v: 1, a: 1 };
		formatterColor = hsv;
		if (paletteRef) {
			paletteRef.setPickerPos(paletteColor);
		}
		dispatch('change', formatColor(formatValue, blockColor));
	}

	function handleFormatChange(e: CustomEvent) {
		formatValue = e.detail;
		dispatch('formatChange', formatValue);
	}

	function handlePresetChange(e: CustomEvent) {
		const v = toHsv(e.detail[0]) as HsvaColor;
		const res = { ...v, a: aColor.a };
		defaultPaletteColor = { ...defaultPaletteColor, h: res.h, a: res.a };
		blockColor = { ...res, a: res.a };
		formatterColor = { ...res, a: res.a };
		paletteColor = { ...res, a: res.a };
		presetColor = res;
		if (paletteRef) {
			paletteRef.setPickerPos(paletteColor);
		}
		isClear = false;
		const resolveColor = formatColor(formatValue, blockColor);
		dispatch('change', resolveColor);
		dispatch('changeComplete', resolveColor);
	}

	let hsvValue: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
	$: {
		if (!isDragging) {
			hsvValue = toHsv(value) as HsvaColor;
		}
	}

	let hsvDefaultValue: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
	$: {
		hsvDefaultValue = toHsv(defaultValue);
	}
	$: paletteColor = hsvValue;
	$: defaultPaletteColor = hsvDefaultValue;
	$: hColor = hsvValue;
	$: aColor = hsvValue;
	$: blockColor = hsvValue;
	$: formatterColor = hsvValue;
	$: presetColor = hsvValue;

	const prefixCls = getPrefixCls('color-picker');
	const hsbCls = getPrefixCls('color-picker--hsb');
	const hsCls = getPrefixCls('color-picker--hs');
	const headerCls = getPrefixCls('color-picker-header');
	const clearCls = getPrefixCls('color-picker-clear');
	const lineCls = getPrefixCls('color-picker-line');
	$: triggerCls = clsx({
		[`${prefixCls}-trigger--disabled`]: disabled
	});

	$: txtCls = clsx(`${prefixCls}-txt__dark`, {
		[`${prefixCls}-txt`]: showText
	});
	$: titleCls = clsx({
		[`${prefixCls}-title`]: title
	});
	const clearClsx = clsx(clearCls, lineCls);
	const alphaCls = getPrefixCls('color-picker--alpha');
	$: cnames = clsx(prefixCls, cls);

	let popoverRef: any = null;
	/**
	 * @public
	 * api handleOpen
	 */
	export function handleOpen() {
		popoverRef.updateShow(true);
	}

	/**
	 * @public
	 * api handleClose
	 */
	export function handleClose() {
		popoverRef.updateShow(false);
	}
</script>

<KPopover
	bind:this={popoverRef}
	{placement}
	{disabled}
	{trigger}
	on:change={onDisplayChange}
	arrow={false}
>
	<div slot="triggerEl" class={triggerCls}>
		{#if $$slots.default}
			<slot {blockColor} />
		{:else}
			<KColorPickerBlock {disabled} value={blockColor} trigger {size} {focus} {isClear}>
				<div slot="text" class={txtCls} style:display={showText ? 'initial' : 'none'}>
					{#if showText}
						<slot name="text">
							{formatColor(formatValue, blockColor)}
						</slot>
					{/if}
				</div>
			</KColorPickerBlock>
		{/if}
	</div>
	<div slot="contentEl" class={cnames} {...$$restProps} {...attrs}>
		<div class={headerCls}>
			<slot name="title">
				<span class={titleCls}>{title}</span>
			</slot>
			{#if allowClear}
				<div class={clearClsx} aria-hidden="true" on:click={handleClear}></div>
			{/if}
		</div>
		<div>
			<KColorPickerPalette
				bind:this={paletteRef}
				value={paletteColor}
				defaultValue={defaultPaletteColor}
				on:change={handleChange}
				on:changeComplete={handleChangeComplete}
			></KColorPickerPalette>
			<div class={hsbCls}>
				<div class={hsCls}>
					<KColorPickerSlider max={360} min={0} step={1} on:input={handleHValueInput} value={hColor}
					></KColorPickerSlider>
					{#if !disabledAlpha}
						<KColorPickerSlider
							isAlpha
							on:input={handleAValueInput}
							cls={alphaCls}
							max={1}
							min={0}
							step={0.01}
							value={aColor}
						></KColorPickerSlider>
					{/if}
				</div>
				<KColorPickerBlock value={blockColor} />
			</div>
			<KColorPickerFormat
				value={formatterColor}
				{disabledAlpha}
				on:change={handleFormatInput}
				on:formatChange={handleFormatChange}
				format={formatValue}
			></KColorPickerFormat>
			<slot name="preset" {presetColor} {handlePresetChange} {presets}>
				{#if presets && presets.length}
					<KColorPickerPreset value={presetColor} on:change={handlePresetChange} {presets}
					></KColorPickerPreset>
				{/if}
			</slot>
		</div>
	</div>
</KPopover>
