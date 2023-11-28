<script>
	import { KSlider } from '@ikun-ui/slider';
	let value = 0;
	const handleInput = (event) => {
		value = event.detail;
	};
</script>

<KSlider size="sm" cls="my-2" on:input={handleInput} {value}></KSlider>
<KSlider size="md" cls="my-2" on:input={handleInput} {value}></KSlider>
<KSlider size="lg" cls="my-2" on:input={handleInput} {value}></KSlider>
