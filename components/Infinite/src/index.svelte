<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KInfiniteProps } from './types';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import { createEventDispatcher } from 'svelte';
	export let cls: KInfiniteProps['cls'] = undefined;
	export let attrs: KInfiniteProps['attrs'] = {};

	export let threshold: KInfiniteProps['threshold'] = 0;
	export let elementScroll: KInfiniteProps['elementScroll'] = undefined;
	export let window: KInfiniteProps['window'] = false;
	export let hasMore: KInfiniteProps['hasMore'] = true;
	export let horizontal: KInfiniteProps['horizontal'] = false;
	export let reverse: KInfiniteProps['reverse'] = false;

	const dispatch = createEventDispatcher();
	const handleLoadMore = () => {
		dispatch('loadMore');
	};
	// class
	const prefixCls = getPrefixCls('infinite');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot />
	<InfiniteScroll
		{threshold}
		{elementScroll}
		{window}
		{hasMore}
		{horizontal}
		{reverse}
		on:loadMore={handleLoadMore}
	/>
</div>
