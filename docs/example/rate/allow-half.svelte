<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 2.5;
	const colors = { 2: 'blue', 4: 'green', 5: 'red' };
	const onUpdateValue = (e) => (value = e.detail);
</script>

<div class="fcc">
	<KRate {value} {colors} allowHalf on:updateValue={onUpdateValue}></KRate>
</div>
