<script lang="ts">
	import { KPopconfirm } from '@ikun-ui/popconfirm';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleConfirm = (e: CustomEvent) => {
		dispatch('confirm', e.detail);
	};
</script>

<KPopconfirm title="有美一人" on:confirm={handleConfirm} content="清扬婉兮">
	<div id="test_trigger">trigger</div>
</KPopconfirm>
