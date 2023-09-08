<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 3;
	const colors = { 2: 'blue', 4: 'green', 5: 'red' };
	const onUpdateValue = (e) => (value = e.detail);
</script>

<div class="fcc">
	<div class="flex-1 fcc flex-col">
		<div class="mb-6px text-13px color-#909399">default</div>
		<KRate {value} on:updateValue={onUpdateValue}></KRate>
	</div>
	<div class="flex-1 fcc flex-col">
		<div class="mb-6px text-13px color-#909399">color for different level</div>
		<KRate {value} {colors} on:updateValue={onUpdateValue}></KRate>
	</div>
</div>
