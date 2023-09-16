<script lang="ts">
	import { KPopconfirm } from '@ikun-ui/popconfirm';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleCancel = (e: CustomEvent) => {
		dispatch('cancel', e.detail);
	};
</script>

<KPopconfirm title="有美一人" on:cancel={handleCancel} content="清扬婉兮">
	<div id="test_trigger">trigger</div>
</KPopconfirm>
