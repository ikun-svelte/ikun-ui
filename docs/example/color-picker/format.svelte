<script>
	import { KColorPicker } from '@ikun-ui/color-picker';
	let valueHex = '#f8a153';
	const handleChangeCompleteHex = (e) => {
		valueHex = e.detail;
	};

	let valueRgb = '#f8a153';
	const handleChangeCompleteRgb = (e) => {
		valueRgb = e.detail;
	};

	let valueHsv = '#f8a153';
	const handleChangeCompleteHsv = (e) => {
		valueHsv = e.detail;
	};
</script>

<KColorPicker
	defaultValue="#f8a153"
	value={valueHex}
	format="hex"
	showText
	on:changeComplete={handleChangeCompleteHex}
></KColorPicker>

<KColorPicker
	defaultValue="#f8a153"
	value={valueRgb}
	format="rgb"
	triggerClass="my-12px"
	showText
	on:changeComplete={handleChangeCompleteRgb}
></KColorPicker>

<KColorPicker
	defaultValue="#f8a153"
	value={valueHsv}
	format="hsv"
	showText
	on:changeComplete={handleChangeCompleteHsv}
></KColorPicker>
