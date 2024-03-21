<script>
	import { KColorPicker } from '@ikun-ui/color-picker';
	let value = '#f8a153';
	const handleChangeComplete = (e) => {
		value = e.detail;
	};
</script>

<KColorPicker
	defaultValue="#f8a153"
	{value}
	format="hex"
	size="sm"
	showText
	on:changeComplete={handleChangeComplete}
></KColorPicker>

<KColorPicker
	defaultValue="#f8a153"
	{value}
	format="hex"
	triggerClass="my-12px"
	showText
	on:changeComplete={handleChangeComplete}
></KColorPicker>

<KColorPicker
	defaultValue="#f8a153"
	{value}
	format="hex"
	showText
	size="lg"
	on:changeComplete={handleChangeComplete}
></KColorPicker>
