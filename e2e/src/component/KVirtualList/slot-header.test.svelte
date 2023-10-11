<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	let dataList = [];
	for (let i = 0; i < 100; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
</script>

<div class="h-100px" id="k_v_list_slot_header">
	<KVirtualList data={dataList} key="id" let:data>
		<div slot="header">This is a header set via slot</div>
		<div>
			{data.label}
		</div>
	</KVirtualList>
</div>
