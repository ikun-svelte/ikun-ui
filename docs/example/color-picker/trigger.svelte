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
	showText
	on:changeComplete={handleChangeComplete}
>
	<span>
		ikun ui 🐔 {value}
	</span>
</KColorPicker>
