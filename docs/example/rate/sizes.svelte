<script>
	import { KRate } from '@ikun-ui/rate';

	let value = 0;
	const onUpdateValue = (e) => (value = e.detail);
</script>

<KRate size="lg" {value} on:updateValue={onUpdateValue}></KRate>
<KRate size="md" {value} on:updateValue={onUpdateValue}></KRate>
<KRate size="sm" {value} on:updateValue={onUpdateValue}></KRate>
