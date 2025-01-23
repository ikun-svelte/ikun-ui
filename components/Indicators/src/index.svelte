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
	export let direction: KIndicatorsProps['direction'] = 'horizontal';

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

	const prefixCls = getPrefixCls('indicators');
	$: cnames = clsx(prefixCls, `${prefixCls}--${direction}`, cls);
	$: itemCls = (index: number) =>
		clsx(`${prefixCls}-item ${prefixCls}-item--${direction}`, {
			[`${prefixCls}-item--active__${direction}`]: pageIndex === index
		});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot {hoverJump} {clickJump} activeIndex={pageIndex} name="item">
		{#each arr as item}
			<button
				class={itemCls(item)}
				on:mouseenter={() => hoverJump(item)}
				on:click={() => clickJump(item)}
			></button>
		{/each}
	</slot>
</div>
