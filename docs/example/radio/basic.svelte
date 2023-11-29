<script>
	import { KRadio } from '@ikun-ui/radio';
	let value = false;
	const handleUpdate = (e) => {
		value = e.detail;
	};
</script>

<div class="flex items-center">
	You like playing
	<KRadio {value} label="basketball" on:updateValue={handleUpdate} cls="mx-2"></KRadio>
</div>
