<script lang="ts">
	import { afterUpdate, createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { getPrefixCls } from "@ikun-ui/utils";
	export let horizontal = false;
	export let uniqueKey: string = '';
	export let type = 'item';
	let resizeObserver: null | InstanceType<typeof ResizeObserver> = null;
	let itemDiv: null | HTMLElement = null;
	let previousSize: number;

	const dispatch = createEventDispatcher();
	const shapeKey = horizontal ? 'offsetWidth' : 'offsetHeight';

	onMount(() => {
		if (typeof ResizeObserver !== 'undefined' && itemDiv) {
			resizeObserver = new ResizeObserver(dispatchSizeChange);
			resizeObserver.observe(itemDiv);
		}
	});
	afterUpdate(dispatchSizeChange);
	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		}
	});

	function dispatchSizeChange() {
		const size = itemDiv ? itemDiv[shapeKey] : 0;
		if (size === previousSize) return;
		previousSize = size;
		dispatch('resize', { id: uniqueKey, size, type });
	}

	const prefixCls = getPrefixCls('virtual-list--item');
</script>

<div bind:this={itemDiv} class="{prefixCls}" data-kv-key="{uniqueKey}">
	<slot />
</div>
