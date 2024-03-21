<script lang="ts">
	import { KColorPicker } from '@ikun-ui/color-picker';
	import { KCheckbox } from '@ikun-ui/checkbox';
	import { KCheckboxGroup } from '@ikun-ui/checkbox-group';
	import { toHexString } from '@ikun-ui/color-picker';
	import type { KColorPickerPresetProps } from '@ikun-ui/color-picker/src/index.js';
	import { isLightColor } from '@ikun-ui/color-picker/src/utils.js';
	let value = '#f8a153';

	const presets = [
		{
			label: 'primary',
			colors: [
				'#e6f4ff',
				'#bae0ff',
				'#91caff',
				'#69b1ff',
				'#4096ff',
				'#1677ff',
				'#0958d9',
				'#003eb3',
				'#002c8c',
				'#001d66'
			],
			defaultOpen: true
		},
		{
			label: 'red',
			colors: [
				'#fff1f0',
				'#ffccc7',
				'#ffa39e',
				'#ff7875',
				'#ff4d4f',
				'#f5222d',
				'#cf1322',
				'#a8071a',
				'#820014',
				'#5c0011'
			],
			defaultOpen: true
		},
		{
			label: 'green',
			colors: [
				'#f6ffed',
				'#d9f7be',
				'#b7eb8f',
				'#95de64',
				'#73d13d',
				'#52c41a',
				'#389e0d',
				'#237804',
				'#135200',
				'#092b00'
			],
			defaultOpen: true
		}
	];
	const handleChangeComplete = (e) => {
		value = e.detail;
	};

	let checkValue = [toHexString(value)];
	function handleCheck(e: CustomEvent, cb: (e: CustomEvent) => void) {
		checkValue = e.detail.length ? [e.detail.pop()] : [];
		cb({
			detail: checkValue
		} as CustomEvent);
	}

	const getColor = (c: KColorPickerPresetProps['value']) => c as string;
	const getCheckColor = (c: KColorPickerPresetProps['value']) =>
		isLightColor(c) ? 'text-ikun-dark-300' : 'text-white';
</script>

<KColorPicker
	defaultValue="#f8a153"
	{value}
	{presets}
	format="hex"
	showText
	on:changeComplete={handleChangeComplete}
>
	<div slot="preset" let:handlePresetChange>
		<KCheckboxGroup value={checkValue} on:updateValue={(e) => handleCheck(e, handlePresetChange)}>
			{#each presets as preset, index (preset.label + index)}
				<div>
					<span>{preset.label} 🎤 🤟 🏀</span>
					{#if preset.defaultOpen}
						<div class="grid gap-6px grid-cols-11">
							{#each preset.colors as color (color)}
								<KCheckbox
									uid={getColor(color)}
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
</KColorPicker>
