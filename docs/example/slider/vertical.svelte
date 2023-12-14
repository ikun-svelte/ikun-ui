<script>
	import { KSlider } from '@ikun-ui/slider';

	let value = 0;
	const handleInput = (event) => {
		value = event.detail;
	};
</script>

<div class="fcc h-50">
	<KSlider size="lg" vertical on:input={handleInput} {value}></KSlider>
	<KSlider vertical on:input={handleInput} {value}></KSlider>
	<KSlider size="sm" vertical on:input={handleInput} {value}></KSlider>
</div>
<p class="px-2 text-center">value: {value}</p>
