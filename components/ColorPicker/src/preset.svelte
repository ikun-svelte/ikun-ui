<script lang="ts">
	import type { KColorPickerPresetProps } from './types';
	import { fade } from 'svelte/transition';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { isLightColor, toHexString } from './utils';
	import { KIcon } from '@ikun-ui/icon';
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';
	import { createEventDispatcher } from 'svelte';
	export let presets: KColorPickerPresetProps['presets'] = [];
	export let value: KColorPickerPresetProps['value'] = '';
	export let cls: KColorPickerPresetProps['cls'] = '';
	export let attrs: KColorPickerPresetProps['attrs'] = {};

	let normalPresets: KColorPickerPresetProps['presets'] = [];
	$: {
		normalPresets = (presets || []).map((v) => {
			return {
				...v,
				colors: v.colors.map((color) => toHexString(color))
			};
		}) as KColorPickerPresetProps['presets'];
	}

	// expend icon
	function handleExpendIcon(open: boolean | undefined) {
		return open ? 'i-carbon-chevron-down' : 'i-carbon-chevron-down -rotate-90';
	}

	function handleExpend(index: number) {
		normalPresets[index].defaultOpen = !normalPresets[index].defaultOpen;
	}

	const dispatch = createEventDispatcher();
	let checkValue = [toHexString(value)];
	function handleCheck(e: CustomEvent) {
		checkValue = e.detail.length ? [e.detail.pop()] : [];
		dispatch('change', checkValue);
	}

	const getColor = (c: KColorPickerPresetProps['value']) => c as string;
	const getCheckColor = (c: KColorPickerPresetProps['value']) =>
		isLightColor(c) ? 'text-ikun-dark-300' : 'text-white';
	const prefixCls = getPrefixCls('color-picker-preset');
	$: cnames = clsx(prefixCls, cls);
	const containerCls = getPrefixCls('color-picker-preset--container');
	const headCls = getPrefixCls('color-picker-preset--head');
	const labelCls = getPrefixCls('color-picker-preset--label');
	const iconCls = getPrefixCls('color-picker-preset--icon');
	const colorCls = getPrefixCls('color-picker-preset--color');
	const checkCls = getPrefixCls('color-picker-preset--checkbox');
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<KCheckboxGroup value={checkValue} on:updateValue={handleCheck}>
		{#each normalPresets as preset, index (preset.label + index)}
			<div class={containerCls}>
				<div class={headCls} on:click={() => handleExpend(index)} aria-hidden="true">
					<KIcon
						cls={iconCls}
						icon={handleExpendIcon(preset.defaultOpen)}
						width="14px"
						height="14px"
					/>
					<span class={labelCls}>{preset.label}</span>
				</div>
				{#if preset.defaultOpen}
					<div class={colorCls} transition:fade>
						{#each preset.colors as color (color)}
							<KCheckbox
								uid={getColor(color)}
								cls={checkCls}
								canCancel
								checkColor={getCheckColor(color)}
								bgUnCheckColor={getColor(color)}
								bgCheckColor={getColor(color)}
							></KCheckbox>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</KCheckboxGroup>
</div>
