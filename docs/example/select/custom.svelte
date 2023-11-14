<script>
	import { KSelect } from '@ikun-ui/select';
	let value = { label: '白发三千丈', value: '白发', id: '1' };
	const dataList = [
		{ label: '白发三千丈', value: '白发', id: '1' },
		{ label: '缘愁似个长', value: '缘愁', id: '2' },
		{ label: '不知明镜里', value: '不知', id: '3' },
		{ label: '何处得秋霜', value: '何处', id: '4' }
	];
	const handleSelect = (e) => {
		value = e.detail;
	};
</script>

<KSelect
	{value}
	{dataList}
	labelKey="label"
	valueKey="value"
	key="id"
	let:label
	let:data
	let:isActive
	let:onSelect
	on:updateValue={handleSelect}
>
	<div
		on:click={onSelect(data)}
		class={`${
			isActive ? 'text-ikun-main' : ''
		} cursor-pointer flex px-2 py-1 h-32px hover:(bg-ikun-main text-white)`}
		aria-hidden="true"
	>
		🎯{label}🤡
	</div>
</KSelect>
<p class="px-2">{JSON.stringify(value)}</p>
