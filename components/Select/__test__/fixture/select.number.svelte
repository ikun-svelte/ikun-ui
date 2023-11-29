<script>
	import KSelect from '../../src';
	let value = 1;
	const onSelect = (e) => {
		value = e.detail;
	};
</script>

<KSelect {value} on:updateValue={onSelect} dataList={[1, 2, 3, 4, 5]}></KSelect>
<span id="k_select_number">{value}</span>
