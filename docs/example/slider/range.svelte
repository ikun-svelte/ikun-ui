<script>
	import { KSlider } from '@ikun-ui/slider';

	let min = 10;
	let max = 20;
	let value = 15;
	const handleInput = (event) => {
		value = event.detail;
	};
</script>

<KSlider {min} {max} on:input={handleInput} {value}></KSlider>
<p class="px-2">value: {value}</p>
<p class="px-2">min: {min}</p>
<p class="px-2">max: {max}</p>
