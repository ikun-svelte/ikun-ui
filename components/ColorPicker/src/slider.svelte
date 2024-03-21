<script lang="ts">
	import type { HsvaColor, KColorPickerSliderProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { createEventDispatcher } from 'svelte';
	import { toHex, toRgbString } from './utils';

	export let isAlpha: KColorPickerSliderProps['isAlpha'] = false;
	export let max: KColorPickerSliderProps['max'] = 0;
	export let min: KColorPickerSliderProps['min'] = 360;
	export let step: KColorPickerSliderProps['step'] = 1;
	export let value: KColorPickerSliderProps['value'] = '';
	export let cls: KColorPickerSliderProps['cls'] = '';
	export let attrs: KColorPickerSliderProps['attrs'] = {};

	let slider: HTMLDivElement | undefined = undefined;
	$: valueHsv = value as HsvaColor;
	$: valueHsvH = valueHsv.h;
	$: valueHsvA = !isAlpha ? 1 : valueHsv.a || 0;
	let valueHex = '';
	$: {
		const v = {
			s: !isAlpha ? 1 : valueHsv.s,
			v: !isAlpha ? 1 : valueHsv.v,
			h: valueHsvH,
			a: valueHsvA
		};
		// console.log(valueHsvA)
		valueHex = toRgbString(v);
	}

	let trackAlphaBg = '';
	$: {
		const v = toHex({ ...valueHsv, a: 1 });
		trackAlphaBg = !isAlpha ? '' : `linear-gradient(to right, rgba(255, 0, 4, 0), #${v})`;
	}
	$: position = Number((((!isAlpha ? valueHsvH : valueHsvA) - min) / (max - min)).toFixed(4));

	function bound(value: number) {
		const ratio = 1 / step;
		const rounded = Math.round(value * ratio) / ratio;
		return Math.max(min, Math.min(max, rounded));
	}

	const dispatch = createEventDispatcher();
	function updateValue(e: { clientX: number; clientY: number }) {
		const clientWidth = slider?.clientWidth || 120;
		const sliderOffsetX = slider?.getBoundingClientRect().left || 0;
		let offsetX = e.clientX - sliderOffsetX;
		if (isAlpha) {
			valueHsvA = (offsetX / clientWidth) * (max - min) + min;
			valueHsvA = bound(valueHsvA);
			valueHsv.a = valueHsvA;
		} else {
			valueHsvH = (offsetX / clientWidth) * (max - min) + min;
			valueHsvH = bound(valueHsvH);
			valueHsv.h = valueHsvH;
		}

		dispatch('input', valueHsv);
	}
	let isDragging: boolean = false;
	function jump(e: MouseEvent) {
		updateValue(e);
		isDragging = true;
	}

	function drag(e: MouseEvent) {
		if (isDragging) updateValue(e);
	}

	function endDrag() {
		isDragging = false;
	}

	const prefixCls = getPrefixCls('color-picker-slider');
	const thumbCls = clsx(`${prefixCls}--thumb`);
	const trackCls = clsx({
		[`${prefixCls}--track`]: !isAlpha,
		[`${prefixCls}--track_alpha`]: isAlpha
	});
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}_alpha`]: isAlpha
		},
		cls
	);
</script>

<svelte:window on:mousemove={drag} on:mouseup={endDrag} />
<div
	aria-hidden="true"
	class={cnames}
	{...$$restProps}
	{...attrs}
	bind:this={slider}
	on:mousedown|self={jump}
>
	<div class={trackCls} style:background={trackAlphaBg} />
	<div class={thumbCls} style:background-color={valueHex} style:left={`${position * 100}%`} />
</div>
