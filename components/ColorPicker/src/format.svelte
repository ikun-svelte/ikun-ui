<script lang="ts">
	import type { KColorPickerFormatProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KDropdown, KDropdownItem } from '@ikun-ui/dropdown';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx } from 'clsx';
	import { toHsv, toRgb, toHex } from './utils';
	import { createEventDispatcher } from 'svelte';
	import { KInput } from '@ikun-ui/input';
	import { KInputNumber } from '@ikun-ui/input-number';
	export let format: KColorPickerFormatProps['format'] = 'rgb';
	export let disabledAlpha: KColorPickerFormatProps['disabledAlpha'] = false;
	export let value: KColorPickerFormatProps['value'] = '';
	export let cls: KColorPickerFormatProps['cls'] = '';
	export let attrs: KColorPickerFormatProps['attrs'] = {};

	let hRValue = 0;
	let sGValue = 0;
	let vBValue = 0;
	let hRMaxValue = 255;
	let sGMaxValue = 255;
	let vBMaxValue = 255;
	let alphaValue = 0;
	let valueHex = '';
	function init(
		formatValue: KColorPickerFormatProps['format'],
		value: KColorPickerFormatProps['value']
	) {
		if (formatValue === 'rgb') {
			const rgbValue = toRgb(value);
			hRMaxValue = 255;
			sGMaxValue = 255;
			vBMaxValue = 255;
			hRValue = rgbValue.r;
			sGValue = rgbValue.g;
			vBValue = rgbValue.b;
			alphaValue = rgbValue.a * 100;
		}

		if (formatValue === 'hsv') {
			const rgbValue = toHsv(value);
			hRMaxValue = 360;
			sGMaxValue = 100;
			vBMaxValue = 100;
			hRValue = rgbValue.h;
			sGValue = rgbValue.s * 100;
			vBValue = rgbValue.v * 100;
			alphaValue = rgbValue.a * 100;
		}

		if (formatValue === 'hex') {
			const rgbValue = toHsv(value);
			alphaValue = rgbValue.a * 100;
			valueHex = toHex({ ...rgbValue, a: 1 }).toLocaleUpperCase();
		}
	}
	$: {
		init(formatValue, value);
	}

	$: formatValue = format;
	$: curFormat = formatValue!.toLocaleUpperCase();
	function onSelectFormat(e: CustomEvent) {
		formatValue = e.detail;
		dispatch('formatChange', formatValue);
	}

	const dispatch = createEventDispatcher();
	function handleInput(e: CustomEvent, type: 'hr' | 'sg' | 'vb' | 'a' | 'hex') {
		if (e.detail === null) return;
		if (type === 'hr') {
			hRValue = e.detail;
		}
		if (type === 'sg') {
			sGValue = e.detail;
		}
		if (type === 'vb') {
			vBValue = e.detail;
		}
		if (type === 'a') {
			alphaValue = e.detail;
		}
		const alpha = alphaValue / 100;
		if (formatValue === 'rgb') {
			dispatch('change', {
				value: toHsv({
					r: hRValue,
					g: sGValue,
					b: vBValue,
					a: alpha
				}),
				format: formatValue
			});
		}

		if (formatValue === 'hsv') {
			dispatch('change', {
				value: {
					h: hRValue,
					s: sGValue,
					v: vBValue,
					a: alpha
				},
				format: formatValue
			});
		}

		if (formatValue === 'hex') {
			type === 'hex' && (valueHex = e.detail);
			if (valueHex.length === 6) {
				const hsv = toHsv(`#${valueHex}`);
				hsv.a = alpha;
				dispatch('change', {
					value: hsv,
					format: formatValue
				});
			}
		}
	}

	const prefixCls = getPrefixCls('color-picker-format');
	const valueCls = clsx(`${prefixCls}--val`, `${prefixCls}--val__dark`);
	const inputNumCls = `${prefixCls}--input-num`;
	const inputCls = `${prefixCls}--input`;
	$: cnames = clsx(prefixCls, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<KDropdown on:command={onSelectFormat} trigger="click">
		<div class={valueCls}>
			{curFormat}
			<KIcon icon="i-carbon-chevron-down" width="auto" height="auto" cls="op50"></KIcon>
		</div>
		<div slot="dropdown">
			<KDropdownItem command="rgb">RGB</KDropdownItem>
			<KDropdownItem command="hex">HEX</KDropdownItem>
			<KDropdownItem command="hsv">HSV</KDropdownItem>
		</div>
	</KDropdown>
	{#if formatValue !== 'hex'}
		<KInputNumber
			value={hRValue}
			min={0}
			step={1}
			stepStrictly
			max={hRMaxValue}
			on:input={(e) => handleInput(e, 'hr')}
			cls={inputNumCls}
			ignoreForm
			size="sm"
		></KInputNumber>
		<KInputNumber
			value={sGValue}
			min={0}
			step={1}
			ignoreForm
			max={sGMaxValue}
			stepStrictly
			on:input={(e) => handleInput(e, 'sg')}
			cls={inputNumCls}
			size="sm"
		></KInputNumber>

		<KInputNumber
			value={vBValue}
			min={0}
			step={1}
			max={vBMaxValue}
			stepStrictly
			on:input={(e) => handleInput(e, 'vb')}
			cls={inputNumCls}
			size="sm"
			ignoreForm
		></KInputNumber>
	{/if}
	{#if formatValue === 'hex'}
		<KInput
			value={valueHex}
			ignoreForm
			cls={inputCls}
			on:input={(e) => handleInput(e, 'hex')}
			size="sm"
		>
			<span slot="prefix">#</span>
		</KInput>
	{/if}
	{#if !disabledAlpha}
		<KInputNumber
			value={alphaValue}
			min={1}
			max={100}
			step={1}
			stepStrictly
			ignoreForm
			on:input={(e) => handleInput(e, 'a')}
			cls={inputNumCls}
			size="sm"
		></KInputNumber>
	{/if}
</div>
