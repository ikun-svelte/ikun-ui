<script>
	import { KSlider } from '@ikun-ui/slider';

	let value = 0;
	let min = 0;
	let max = 100;
	let step = 10;
	const handleInput = (event) => {
		value = event.detail;
	};
</script>

<div>
	<KSlider {max} {min} on:input={handleInput} {step} {value}></KSlider>
	<KSlider {max} {min} on:input={handleInput} showStops size="lg" {step} {value}></KSlider>
	<p class="px-2">value: {value}</p>
</div>

<div class="h-100 flex">
	<KSlider {max} {min} on:input={handleInput} {step} {value} vertical></KSlider>
	<KSlider {max} {min} on:input={handleInput} showStops size="lg" {step} {value} vertical></KSlider>
</div>
<p class="px-2">value: {value}</p>
