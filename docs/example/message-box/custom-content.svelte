<script>
	import { KSelect } from '@ikun-ui/select';
	let value = '';
	const onSelect = (e) => {
		value = e.detail;
	};
</script>

<KSelect placeholder="Please select value" on:updateValue={onSelect} {value} cls="mx-2">
	<option>foo</option>
	<option>bar</option>
	<option>head</option>
</KSelect>
