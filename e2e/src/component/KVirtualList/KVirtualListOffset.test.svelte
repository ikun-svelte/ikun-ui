<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	let dataList = [];
	for (let i = 0; i < 100; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
</script>

<div class="h-200px">
	<KVirtualList
		data={dataList}
		offset={100}
		id="k_v_list_offset"
		key="id"
		let:data
	>
		<div slot="header">This is a header set via slot</div>
		<div>
			{data.label}
		</div>
		<div slot="footer">This is a footer set via slot</div>
	</KVirtualList>
</div>
