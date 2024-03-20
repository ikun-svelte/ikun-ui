<script lang="ts">
	import { KColorPicker } from '@ikun-ui/color-picker';
	import tinycolor from 'tinycolor2';
	let value = '#69b1ff';
	const handleChange = (e: CustomEvent) => {
		if (e.detail) {
			value = e.detail;
		}
	};

	const presets = [
		{
			defaultOpen: true,
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
			]
		}
	];
</script>

<KColorPicker
	on:changeComplete={handleChange}
	defaultValue="#69b1ff"
	{value}
	{presets}
	format="hsv"
	showText
>
	<div slot="preset">
		{#each presets as preset (preset.label)}
			<span>{preset.label}</span>
			<div class="fsc mt-12px">
				{#each preset.colors as color (color)}
					<div
						class="rounded-full mx-4px w-16px h-16px"
						style:background-color={tinycolor(color).toHex8String()}
					></div>
				{/each}
			</div>
		{/each}
	</div>
</KColorPicker>
