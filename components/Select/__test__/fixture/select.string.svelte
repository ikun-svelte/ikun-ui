<script>
	import KSelect from '../../src';
	let value = 'Normal';
	const onSelect = (e) => {
		value = e.detail;
	};
</script>

<KSelect {value} on:updateValue={onSelect} dataList={['Tiny', 'Small', 'Normal', 'Large', 'Huge']}
></KSelect>
<span id="k_select_string">{value}</span>
