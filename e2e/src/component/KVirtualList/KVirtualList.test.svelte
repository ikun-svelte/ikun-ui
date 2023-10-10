<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	let dataList = [];
	for (let i = 0; i < 100; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}
	const handle = () => {
		// debugger
	};
	const handleTop = () => {
		// debugger
	};
	const handleBottom = () => {
		// debugger
	};
</script>

<div class="h-200px">
	<KVirtualList
		data={dataList}
		on:scroll={handle}
		on:top={handleTop}
		on:bottom={handleBottom}
		start={30}
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
