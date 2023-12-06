<script>
	import { KSlider } from '@ikun-ui/slider';

	let value1 = 0;
	const handleInput1 = (event) => {
		value1 = event.detail;
	};
</script>

<div class="flex items-end h-50">
	<KSlider vertical on:input={handleInput1} value={value1}></KSlider>
	<p class="px-2">value: {value1}</p>
</div>
