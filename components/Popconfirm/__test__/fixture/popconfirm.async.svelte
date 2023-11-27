<script lang="ts">
	import { KPopconfirm } from '../../src';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleConfirm = (e: CustomEvent) => {
		dispatch('confirm', e.detail);
	};

	const handleCancel = (e: CustomEvent) => {
		dispatch('cancel', e.detail);
	};
</script>

<KPopconfirm
	title="有美一人"
	asyncClose
	on:confirm={handleConfirm}
	on:cancel={handleCancel}
	content="清扬婉兮"
>
	<div id="test_trigger">trigger</div>
</KPopconfirm>
