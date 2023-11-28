<script>
	import { KSelect } from '@ikun-ui/select';
	let value = { id: 200, label: '200 item', value: 200 };
	const onSelect = (e) => {
		value = e.detail;
	};

	let dataList = [];
	for (let i = 0; i < 500; i++) {
		dataList.push({ id: i, value: i, label: `${i} item` });
	}
</script>

<KSelect
	placeholder="Please select value"
	on:updateValue={onSelect}
	clearable
	{dataList}
	labelKey="label"
	valueKey="value"
	key="id"
	fitInputWidth
	{value}
	cls="mx-200px"
></KSelect>
