<script>
	import { KSelect } from '@ikun-ui/select';
	let value = '';
	const onSelect = (e) => {
		value = e.detail;
	};
	const list = ['Tiny', 'Small', 'Normal', 'Large', 'Huge'];
</script>

<div class="fac my-10px">
	<KSelect cls="w-200px" size="sm" clearable {value} dataList={list} on:updateValue={onSelect}
	></KSelect>
	<KSelect cls="w-200px" size="md" clearable {value} dataList={list} on:updateValue={onSelect}
	></KSelect>
	<KSelect
		cls="w-200px"
		size="lg"
		clearable
		{value}
		dataList={list}
		placeholder="Please select"
		on:updateValue={onSelect}
	></KSelect>
</div>

<div class="fac my-10px">
	<KSelect
		cls="w-200px"
		size="sm"
		clearable
		{value}
		dataList={list}
		iconPrefix="i-carbon-search"
		on:updatee={onSelect}
	></KSelect>
	<KSelect
		cls="w-200px"
		size="md"
		clearable
		{value}
		dataList={list}
		iconPrefix="i-carbon-search"
		on:updateValue={onSelect}
	></KSelect>
	<KSelect
		cls="w-200px"
		size="lg"
		clearable
		{value}
		dataList={list}
		placeholder="Please select"
		iconPrefix="i-carbon-search"
		on:updateValue={onSelect}
	></KSelect>
</div>

<div class="fac my-10px">
	<KSelect
		cls="w-200px"
		size="sm"
		clearable
		{value}
		dataList={list}
		iconSuffix="i-carbon-search"
		on:updateValue={onSelect}
	></KSelect>
	<KSelect
		cls="w-200px"
		size="md"
		clearable
		{value}
		dataList={list}
		iconSuffix="i-carbon-search"
		on:updateValue={onSelect}
	></KSelect>
	<KSelect
		cls="w-200px"
		size="lg"
		clearable
		{value}
		dataList={list}
		placeholder="Please select"
		iconSuffix="i-carbon-search"
		on:updateValue={onSelect}
	></KSelect>
</div>
