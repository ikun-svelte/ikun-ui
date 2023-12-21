<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KIndicatorsProps } from './types';
	import { createEventDispatcher } from 'svelte';

	export let defaultPageIndex: KIndicatorsProps['defaultPageIndex'] = 0;
	export let count: KIndicatorsProps['count'] = 0;
	export let trigger: KIndicatorsProps['trigger'] = 'click';
	export let cls: KIndicatorsProps['cls'] = undefined;
	export let attrs: KIndicatorsProps['attrs'] = {};

	const dispatch = createEventDispatcher();

	$: arr = [...Array(count).keys()];

	$: pageIndex = defaultPageIndex;
	const clickJump = (page: number) => {
		if (trigger !== 'click') return;
		dispatch('change', { index: page });
	};
	const hoverJump = (page: number) => {
		if (trigger !== 'hover') return;
		dispatch('change', { index: page });
	};

	const prefixCls = getPrefixCls('carousel-indicators');
	$: cnames = clsx(prefixCls, cls);
	$: itemCls = (index: number) =>
		clsx(`${prefixCls}-item`, {
			[`${prefixCls}-item--active`]: pageIndex === index
		});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot {hoverJump} {clickJump} activeIndex={pageIndex} name="item">
		{#each arr as item}
			<div
				role="button"
				class={itemCls(item)}
				aria-hidden="true"
				on:mouseenter={() => hoverJump(item)}
				on:click={() => clickJump(item)}
			></div>
		{/each}
	</slot>
</div>
