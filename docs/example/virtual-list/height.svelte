<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	let dataList = [];
	for (let i = 0; i < 50; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
</script>

<div class="h-200px">
	<KVirtualList data={dataList} key="id" let:data>
		<div
			style:height={`${(data.id + 3) * 10}px`}
			class="rounded leading-30px bg-orange-100 text-center m-2 text-ikun-main fcc"
		>
			{data.label} -- {(data.id + 3) * 10}px
		</div>
	</KVirtualList>
</div>
