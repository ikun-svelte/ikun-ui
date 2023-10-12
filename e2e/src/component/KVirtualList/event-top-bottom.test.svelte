<script>
	import { KVirtualList } from '@ikun-ui/core';
	let dataList = [];
	for (let i = 0; i < 100; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
	let scrollResult = '';
	const handleScrollTop = () => {
		scrollResult = 'top';
	};
	const handleScrollBottom = () => {
		scrollResult = 'bottom';
	};
</script>

<div class="h-100px">
	<div id="scroll_result_tb">
		{scrollResult}
	</div>
	<KVirtualList
		on:top={handleScrollTop}
		on:bottom={handleScrollBottom}
		id="k_v_list_event_tb"
		data={dataList}
		key="id"
		let:data
	>
		<div>
			{data.label}
		</div>
	</KVirtualList>
</div>
