<script>
	import { KSelect } from '@ikun-ui/select';
	let value = { label: '白发三千丈', value: '白发', id: '1' };
	const dataList = [
		{ label: '白发三千丈', value: '白发', id: '1' },
		{ label: '缘愁似个长', value: '缘愁', id: '2' },
		{ label: '不知明镜里', value: '不知', id: '3' },
		{ label: '何处得秋霜', value: '何处', id: '4' }
	];
	const onSelect = (e) => {
		value = e.detail;
	};
</script>

<KSelect {value} {dataList} labelKey="label" valueKey="value" key="id" on:updateValue={onSelect}
></KSelect>
<p class="px-2">{JSON.stringify(value)}</p>
