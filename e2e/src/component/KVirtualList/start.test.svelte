<script>
	import { KVirtualList } from '@ikun-ui/core';
	let dataList = [];
	for (let i = 0; i < 100; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
</script>

<div class="h-100px" id="k_v_list_start">
	<KVirtualList data={dataList} start={30} key="id" let:data>
		<div>
			{data.label}
		</div>
	</KVirtualList>
</div>
