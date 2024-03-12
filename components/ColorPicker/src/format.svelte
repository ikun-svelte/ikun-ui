<script lang="ts">
	import type {KColorPickerFormatProps} from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
    import { KDropdown, KDropdownItem } from "@ikun-ui/dropdown";
    import { KIcon } from "@ikun-ui/icon";
    import { clsx } from 'clsx';
	import { colord } from 'colord';
    import {createEventDispatcher} from "svelte";
    import { KInput } from "@ikun-ui/input";
    import {KInputNumber} from "@ikun-ui/input-number";
	export let format: KColorPickerFormatProps['format'] = 'rgb';
    export let disabledAlpha: KColorPickerFormatProps['disabledAlpha'] = false;
	export let value: KColorPickerFormatProps['value'] = '';
	export let cls: KColorPickerFormatProps['cls'] = '';
	export let attrs: KColorPickerFormatProps['attrs'] = {};

    let hRValue = 0
    let sGValue = 0
    let vBValue = 0
    let alphaValue = 0
    let valueHex = ''
    $:{
        if(formatValue === 'rgb'){
            const rgbValue = colord(value).toRgb()
            hRValue = rgbValue.r
            sGValue = rgbValue.g
            vBValue = rgbValue.b
            alphaValue = rgbValue.a
        }

        if(formatValue === 'hsv'){
            const rgbValue = colord(value).toHsv()
            hRValue = rgbValue.h
            sGValue = rgbValue.s
            vBValue = rgbValue.v
            alphaValue = rgbValue.a
        }

        if(formatValue === 'hex'){
            valueHex = colord(value).toHex().replace('#', '')
        }

    }

    $: formatValue = format
    $: curFormat = formatValue!.toLocaleUpperCase()
    function onSelectFormat(e: CustomEvent){
        formatValue = e.detail
    }

    const dispatch = createEventDispatcher();

	const prefixCls = getPrefixCls('color-picker-format');
    const valueCls = `${prefixCls}--val`
    const inputNumCls = `${prefixCls}--input-num`
    const inputCls = `${prefixCls}--input`
	$: cnames = clsx(prefixCls, cls);

</script>

<div class={cnames} {...$$restProps} {...attrs}>
    <KDropdown  on:command={onSelectFormat}
                trigger="click">
        <div class={valueCls}>
            {curFormat}
            <KIcon icon="i-carbon-chevron-down"
                   width="auto"
                   height="auto"
                   cls="text-ikun-bd-base">
            </KIcon>
        </div>
        <div slot="dropdown">
            <KDropdownItem command="rgb">RGB</KDropdownItem>
            <KDropdownItem command="hex">HEX</KDropdownItem>
            <KDropdownItem command="hsv">HSV</KDropdownItem>
        </div>
    </KDropdown>
    {#if formatValue !== 'hex'}
        <KInputNumber value={hRValue}
                      cls={inputNumCls}
                      size="sm">
        </KInputNumber>
        <KInputNumber value={sGValue}
                      cls={inputNumCls}
                      size="sm">
        </KInputNumber>
        <KInputNumber value={vBValue}
                      cls={inputNumCls}
                      size="sm">
        </KInputNumber>
    {/if}
    {#if formatValue === 'hex'}
        <KInput value={valueHex}
                cls={inputCls}
                size="sm">
            <span slot="prefix">#</span>
        </KInput>
    {/if}
    {#if !disabledAlpha}
        <KInputNumber value={alphaValue}
                      cls={inputNumCls}
                      size="sm">
        </KInputNumber>
    {/if}
</div>
