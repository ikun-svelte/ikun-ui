<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 3;
	const onUpdateValue = (e) => (value = e.detail);
</script>

<div class="fcc">
	<KRate {value} clearable on:updateValue={onUpdateValue}></KRate>
</div>
