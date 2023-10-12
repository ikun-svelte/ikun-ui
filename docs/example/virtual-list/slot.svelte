<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	let dataList = [];
	for (let i = 0; i < 100; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
</script>

<div class="h-200px">
	<KVirtualList data={dataList} key="id" let:data>
		<div
			slot="header"
			class="rounded h-30px leading-30px bg-orange-200 text-center m-2 text-ikun-main"
		>
			this is header 🥵
		</div>
		<div class="rounded h-30px leading-30px bg-orange-100 text-center m-2 text-ikun-main">
			{data.label}
		</div>
		<div
			slot="footer"
			class="rounded h-30px leading-30px bg-orange-200 text-center m-2 text-ikun-main"
		>
			this is footer 🐔
		</div>
	</KVirtualList>
</div>
