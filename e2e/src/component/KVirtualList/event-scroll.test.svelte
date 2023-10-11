<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	let dataList = [];
	for (let i = 0; i < 100; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
	let scrollResult = '';
	const handleScroll = (e) => {
		console.log(e.detail.range);
		scrollResult = JSON.stringify(e.detail.range);
	};
</script>

<div class="h-100px">
	<div id="scroll_result">
		{scrollResult}
	</div>
	<KVirtualList
		on:scroll={handleScroll}
		id="k_v_list_event_scroll"
		data={dataList}
		key="id"
		let:data
	>
		<div>
			{data.label}
		</div>
	</KVirtualList>
</div>
