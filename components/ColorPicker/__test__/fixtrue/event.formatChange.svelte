<script lang="ts">
	import { KColorPicker } from '../../src/index';
	import type { KColorPickerProps } from '../../src/index';
	let format: KColorPickerProps['format'] = 'hsv';
	const formatChange = (e: CustomEvent) => {
		format = e.detail;
	};
</script>

<KColorPicker
	defaultValue="#69b1ff"
	value="#69b1ff"
	{format}
	on:formatChange={formatChange}
	showText
></KColorPicker>
<div id="format_test">{format}</div>
