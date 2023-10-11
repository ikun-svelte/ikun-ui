<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	let dataList = [];
	for (let i = 0; i < 10000; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
</script>

<div class="h-200px">
	<KVirtualList data={dataList} key="id" let:data>
		<div class="rounded h-30px leading-30px bg-orange-100 text-center m-2 text-ikun-main">
			{data.label}
		</div>
	</KVirtualList>
</div>
