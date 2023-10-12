<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	let dataList = [];
	for (let i = 0; i < 10000; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
</script>

<div class="w-full">
	<KVirtualList data={dataList} isHorizontal={true} key="id" let:data>
		<div class="p-2 box-border rounded leading-30px bg-orange-100 text-center m-1 text-ikun-main">
			{data.label}
		</div>
	</KVirtualList>
</div>
