<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 0;
	const texts = { 2: 'low level', 4: 'mid levle', 5: 'high level' };
	const onUpdateValue = (e) => {
		value = e.detail;
	};
</script>

<KRate {value} showText {texts} on:updateValue={onUpdateValue}></KRate>
