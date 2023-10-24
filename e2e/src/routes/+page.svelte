<script>
	import KVirtualListStart from '../component/KVirtualList/start.test.svelte';
	import KVirtualListOffset from '../component/KVirtualList/offset.test.svelte';
	import KVirtualListSlotDefault from '../component/KVirtualList/slot-default.test.svelte';
	import KVirtualListSlotHeader from '../component/KVirtualList/slot-header.test.svelte';
	import KVirtualListSlotFooter from '../component/KVirtualList/slot-footer.test.svelte';
	import KVirtualListEvtScroll from '../component/KVirtualList/event-scroll.test.svelte';
	import KVirtualListEvtTB from '../component/KVirtualList/event-top-bottom.test.svelte';
  import KSelectEvtUpdated from '../component/KSelect/event-update.test.svelte';
  import KSelectEvtDisabled from '../component/KSelect/event-disabled.test.svelte';
  import KSelectClearable from '../component/KSelect/clearable.test.svelte';
</script>

<KVirtualListStart />
<KVirtualListOffset />
<KVirtualListSlotDefault />
<KVirtualListSlotHeader />
<KVirtualListSlotFooter />
<KVirtualListEvtScroll />
<KVirtualListEvtTB />
<KSelectEvtUpdated />
<KSelectEvtDisabled/>
<KSelectClearable/>
