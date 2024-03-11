
<script lang="ts">
  import type { KColorPickerSliderProps } from "./types";
  import { colord } from "colord";
  import { getPrefixCls } from "@ikun-ui/utils";
  import { clsx } from "clsx";
  import { createEventDispatcher } from "svelte";
  // TODO: 某些初始化颜色（入黑色）会导致slider不对
  // TODO: 位置定位

  // TODO: track 背景色（h和a）
  // TODO: a的功能
  export let max: KColorPickerSliderProps['max'] = 0;
  export let min: KColorPickerSliderProps['min'] = 360;
  export let step: KColorPickerSliderProps['step'] = 1;
  export let value: KColorPickerSliderProps['value'] = '';
  export let cls: KColorPickerSliderProps['cls'] = '';
  export let attrs: KColorPickerSliderProps['attrs'] = {};


  let slider: HTMLDivElement | undefined = undefined;
  let valueHsv = colord(value).toHsv()
  $: valueHsvH = valueHsv.h
  $: valueHex = colord(valueHsv).toHex()
  $: position = Number((((valueHsvH - min) / (max - min))).toFixed(4));


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
    valueHsvH = (offsetX / clientWidth) * (max - min) + min;
    valueHsvH = bound(valueHsvH);
    console.log(valueHsvH)
    valueHsv.h = valueHsvH
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

  const prefixCls = getPrefixCls('color-picker-slider slider');
  $: cnames = clsx(
    prefixCls,
    cls
  );
</script>

<svelte:window on:mousemove={drag} on:mouseup={endDrag} />
<div
  aria-hidden="true"
  data-k-color-picker-slider-placment='horizontal'
  class={cnames}
  {...$$restProps}
  {...attrs}
  bind:this={slider}
  on:mousedown|self={jump}
>
  <div class="track" />
  <div class="thumb"
       style:background-color={valueHex}
       style:left={`${(position) * 100}%`}/>
</div>
<style>
    .slider {
        cursor: pointer;
        position: relative;
        user-select: none;
        -webkit-user-select: none;
        height: 8px;
    }


    .track {
        position: absolute;
        height: 8px;
        width: 100%;
        pointer-events: none;
        background: red;
        border-radius: 8px;
        box-sizing: border-box;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        right: 0;
        background: linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0));
    }


    .thumb {
        pointer-events: none;
        position: absolute;
        height: 14px;
        width: 14px;
        border-radius: 99px;
        background: transparent;
        border: 3px solid white;
        box-sizing: border-box;
        transform: translate(-50%, -50%);
        --at-apply: shadow;
        top: 50%;
    }
</style>
