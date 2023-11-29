<script>
	import KSelect from '@ikun-ui/select';
	let value = 'Normal';
	const onSelect = (e) => {
		value = e.detail;
	};
</script>

<KSelect
	{value}
	on:updateValue={onSelect}
	fitInputWidth
	dataList={[
		'TinyTinyTinyTinyTinyTinyTTinyTinyTinyTinyTinyTinyTinyTinyTinyTinyTinyTinyTinyTinyiny',
		'Small',
		'Normal',
		'Large',
		'Huge'
	]}
></KSelect>
<span id="k_select_string">{value}</span>
