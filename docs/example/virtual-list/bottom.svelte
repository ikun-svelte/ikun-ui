<script>
	import { KVirtualList } from '@ikun-ui/virtual-list';
	import { KButton } from '@ikun-ui/button';
	let dataList = [];
	for (let i = 0; i < 10000; i++) {
		dataList.push({ id: i, label: `this is item ${i}` });
	}

	let KVList = null;
	const handleToBottom = () => {
		KVList.scrollToBottom();
	};

	const handleToTop = () => {
		KVList.scrollToIndex(0);
	};
</script>

<KButton on:click={handleToTop} cls="mx-auto mb-4">handleToTop</KButton>

<div class="h-200px">
	<KVirtualList data={dataList} key="id" let:data bind:this={KVList}>
		<div class="rounded h-30px leading-30px bg-orange-100 text-center m-2 text-ikun-main">
			{data.label}
		</div>
	</KVirtualList>
</div>

<KButton on:click={handleToBottom} cls="mx-auto mt-4">handleToBottom</KButton>
