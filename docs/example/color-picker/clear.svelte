<script>
	import { KColorPicker } from '@ikun-ui/color-picker';
	let value = '#f8a153';
	const handleChangeComplete = (e) => {
		if (e.detail) {
			value = e.detail;
		}
	};
</script>

<KColorPicker
	defaultValue="#f8a153"
	{value}
	allowClear
	format="hex"
	showText
	on:changeComplete={handleChangeComplete}
></KColorPicker>
