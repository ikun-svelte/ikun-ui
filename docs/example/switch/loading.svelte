<script>
	import { KSwitch } from '@ikun-ui/switch';
	let value = true;
	const handleUpdate = (e) => {
		value = e.detail;
	};
</script>

<div class="flex items-center">
	<KSwitch {value} on:updateValue={handleUpdate} loading />
</div>
