<script>
	import { KSlider } from '@ikun-ui/slider';

	let step = 10;
	let value1 = 0;
	let value2 = 0;
	let format = (value) => {
		return 'Ikun' + value;
	};
	const handleInput1 = (event) => {
		value1 = event.detail;
	};
	const handleInput2 = (event) => {
		value2 = event.detail;
	};
</script>

<div>
	<KSlider showTooltip={false} on:input={handleInput1} value={value1}></KSlider>
	<p class="px-2">value: {value1}</p>
</div>

<div>
	<KSlider {step} on:input={handleInput2} {format} value={value2}></KSlider>
	<p class="px-2">format: {"(value) => {return 'Ikun'+value}"}</p>
</div>

<div>
	<KSlider {step} on:input={handleInput2} value={value2}></KSlider>
	<p class="px-2">value: {value2}</p>
	<p class="px-2">step: {step}</p>
</div>
