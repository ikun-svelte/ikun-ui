<script lang="ts">
	import type { KColorPickerPresetProps } from './types';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import tinycolor from 'tinycolor2';
	import { KIcon } from '@ikun-ui/icon';
	export let presets: KColorPickerPresetProps['presets'] = [];
	export let value: KColorPickerPresetProps['value'] = '';
	export let cls: KColorPickerPresetProps['cls'] = '';
	export let attrs: KColorPickerPresetProps['attrs'] = {};

	let normalPresets: KColorPickerPresetProps['presets'] = [];
	$: {
		normalPresets = (presets || []).map((v) => {
			return {
				...v,
				colors: v.colors.map((color) => tinycolor(color).toHexString())
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

	const getColor = (c: KColorPickerPresetProps['value']) => c as string;
	const prefixCls = getPrefixCls('color-picker-preset');
	$: cnames = clsx(prefixCls, cls);
	const containerCls = getPrefixCls('color-picker-preset--container mt-12px cursor-pointer');
	const headCls = getPrefixCls('color-picker-preset--head fsc');
	const labelCls = getPrefixCls('color-picker-preset--label text-12px ml-4px');
	const iconCls = getPrefixCls('color-picker-preset--icon');
	const colorCls = getPrefixCls('color-picker-preset--color grid mt-12px gap-6px grid-cols-11');
</script>

<div class={cnames} {...$$restProps} {...attrs}>
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
				<div class={colorCls}>
					{#each preset.colors as color (color)}
						<div class="w-18px h-18px rounded-4px" style:background={getColor(color)}></div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>
