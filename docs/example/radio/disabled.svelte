<script>
	import { KRadio } from '@ikun-ui/radio';
	let value1 = true;
	const handleUpdate1 = (e) => {
		value1 = e.detail;
	};
	let value2 = false;
	const handleUpdate2 = (e) => {
		value2 = e.detail;
	};
</script>

<div class="flex items-center">
	<KRadio
		value={value1}
		label="The Last Leaf"
		disabled
		on:updateValue={handleUpdate1}
		cls="mx-2"
	></KRadio>
	<KRadio
		value={value2}
		label="Peter Pan"
		disabled
		on:updateValue={handleUpdate2}
		cls="mx-2"
	></KRadio>
</div>
