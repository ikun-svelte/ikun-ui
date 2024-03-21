<script>
	import { KColorPicker } from '@ikun-ui/color-picker';
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
</script>

<KColorPicker
	defaultValue="#f8a153"
	{value}
	{presets}
	format="hex"
	showText
	on:changeComplete={handleChangeComplete}
></KColorPicker>
