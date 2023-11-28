<script>
	import { KSelect } from '../../src';
	let value = { label: 'foo8', value: 8 };
	const onSelect = (e) => {
		value = e.detail;
	};
	const list = [
		{ label: 'foo0', value: 1 },
		{ label: 'foo2', value: 2 },
		{ label: 'foo3', value: 3 },
		{ label: 'foo4', value: 4 },
		{ label: 'foo5', value: 5 },
		{ label: 'foo6', value: 6 },
		{ label: 'foo7', value: 7 },
		{ label: 'foo8', value: 8 },
		{ label: 'foo9', value: 9 },
		{ label: 'foo10', value: 0 },
		{ label: 'foo11', value: 11 }
	];
</script>

<KSelect
	disabled
	on:updateValue={onSelect}
	placeholder="please select"
	valueKey="value"
	labelKey="label"
	dataList={list}
	{value}
	cls="mx-2"
></KSelect>
