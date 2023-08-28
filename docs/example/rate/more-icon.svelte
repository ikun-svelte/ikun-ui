<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 0;
	const icons = { 3: 'i-carbon:ai-status-in-progress', 5: 'i-carbon:ai-status-rejected' };
	const colors = { 3: 'color-blue', 5: 'color-red' };
	const onUpdateValue = (e) => {
		value = e.detail;
	};
</script>

<KRate {value} {icons} {colors} on:updateValue={onUpdateValue}></KRate>
