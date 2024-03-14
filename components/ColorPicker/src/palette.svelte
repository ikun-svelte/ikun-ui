<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import tinycolor  from "tinycolor2";
	import type { KColorPickerPaletteProps, HsvaColor } from './types.js';
	import { extend } from 'baiwusanyu-utils';
	export let cls: KColorPickerPaletteProps['cls'] = '';
	export let attrs: KColorPickerPaletteProps['attrs'] = {};
	export let value: KColorPickerPaletteProps['value'] = { h: 0, s: 100, v: 100, a: 1 };
	export let defaultValue: KColorPickerPaletteProps['defaultValue'] = {
		h: 0,
		s: 100,
		v: 100,
		a: 1
	};
	$: hsvColor = value as HsvaColor
	let isDragging = false;
	let startX = 0;
	let startY = 0;
	let offsetX = 0;
	let offsetY = 0;
	let dragElement: null | HTMLElement = null;
	let containerElement: null | HTMLElement = null;
	let containerBounds = { x: 0, y: 0, width: 0, height: 0 };
	const dispatch = createEventDispatcher();
	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(min, value), max);
	}

	function getCurColorVal(width?: number, height?: number) {
		if (!width || !height) {
			const { width: elWidth, height: elHeight } = containerElement!.getBoundingClientRect();
			width = elWidth;
			height = elHeight;
		}

		const s = clamp(mouse.x / width, 0, 1) * 100;
		const v = clamp((height - mouse.y) / height, 0, 1) * 100;
		hsvColor.h = valueHsvH;
		return extend(hsvColor, { s, v });
	}

	function handleMouseup() {
		isDragging = false;
		dispatch('changeComplete', getCurColorVal());
	}

	function handleMousedown(e: MouseEvent) {
		if (e.button === 0 || e.button === 2) {
			onClick(e);
			pickerMousedown(e);
		}
	}

	let ClickPos = { x: 0, y: 0 };
	function pickerMousedown(event: MouseEvent) {
		isDragging = true;
		containerBounds = containerElement!.getBoundingClientRect();
		ClickPos = {
			x: event.clientX,
			y: event.clientY
		};
		startX = event.clientX - offsetX;
		startY = event.clientY - offsetY;
	}

	function handleMouseMove(event: MouseEvent) {
		if (event.clientX - ClickPos.x < 10 && event.clientY - ClickPos.y < 10) {
			return;
		}
		if (isDragging && dragElement) {
			const newX = event.clientX - startX;
			const newY = event.clientY - startY;
			const halfOffsetW = dragElement.offsetWidth / 2;
			const halfOffsetH = dragElement.offsetHeight / 2;

			const newLeft = Math.max(-halfOffsetW, Math.min(newX, containerBounds.width - halfOffsetW));
			const newTop = Math.max(-halfOffsetH, Math.min(newY, containerBounds.height - halfOffsetH));
			mouse = { x: newLeft, y: newTop };
			updatePickerPos(newLeft, newTop);
			dispatch('change', getCurColorVal());
		}
	}

	let dragLeft = '-99px';
	let dragTop = '-99px';
	function updatePickerPos<T = string | number>(x: T, y: T) {
		if (dragElement) {
			offsetX = x as number;
			offsetY = y as number;
			dragLeft = `${x}px`;
			dragTop = `${y}px`;
		}
	}

	let mouse = { x: 0, y: 0 };
	function onClick(e: { clientX: number; clientY: number }) {
		const { width, left, height, top } = containerElement!.getBoundingClientRect();
		mouse = { x: clamp(e.clientX - left, 0, width), y: clamp(e.clientY - top, 0, height) };
		updatePickerPos(mouse.x - 8, mouse.y - 8);
		dispatch('change', getCurColorVal(width, height));
	}

	export function setPickerPos(val: HsvaColor) {
		if (dragElement && containerElement) {
			const { width, height } = containerElement!.getBoundingClientRect();
			const sNormalized = val.s / 100;
			const vNormalized = val.v / 100;
			const mouseX = sNormalized * width;
			const mouseY = height - vNormalized * height;
			hsvColor.h = valueHsvH;
			updatePickerPos(mouseX - 8, mouseY - 8);
		}
	}
	onMount(() => setTimeout(() => setPickerPos(hsvColor), 300));

	$: valueHsvH = tinycolor(defaultValue).toHsv().h;
	$: bgColorVal = tinycolor(defaultValue).toHex();
	const prefixCls = getPrefixCls('color-picker-palette');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
	const pointerCls = getPrefixCls('color-picker-pointer');
</script>

<div
	class={cnames}
	aria-hidden="true"
	on:mousemove={handleMouseMove}
	on:mousedown|preventDefault={handleMousedown}
	on:mouseup|preventDefault={handleMouseup}
	bind:this={containerElement}
	style:background-color={`#${bgColorVal}`}
	{...$$restProps}
	{...attrs}
>
	<div
		class={pointerCls}
		style:left={dragLeft}
		style:top={dragTop}
		aria-hidden="true"
		bind:this={dragElement}
	></div>
</div>
