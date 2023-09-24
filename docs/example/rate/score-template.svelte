<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 5;
	const scoreTemplate = 'The score of IKunUI is {value} points';
	const onUpdateValue = (e) => (value = e.detail);
</script>

<KRate {value} showScore {scoreTemplate} on:updateValue={onUpdateValue}></KRate>
