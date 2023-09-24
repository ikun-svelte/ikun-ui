<script lang="ts">
	import { KPopconfirm } from '@ikun-ui/popconfirm';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const handleChange = (e: CustomEvent) => {
		dispatch('change', e.detail);
	};
</script>

<KPopconfirm title="有美一人" on:change={handleChange} content="清扬婉兮">
	<div id="test_trigger">trigger</div>
</KPopconfirm>
