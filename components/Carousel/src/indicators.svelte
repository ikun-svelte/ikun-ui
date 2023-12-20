<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KIndicatorsProps } from './types';
	import { createEventDispatcher } from 'svelte';

	export let defaultPageIndex: KIndicatorsProps['defaultPageIndex'] = 0;
	export let count: KIndicatorsProps['count'] = 0;
	export let cls: KIndicatorsProps['cls'] = undefined;
	export let attrs: KIndicatorsProps['attrs'] = {};

	const dispatch = createEventDispatcher();

	$: arr = [...Array(count).keys()];

	$: pageIndex = defaultPageIndex;
	const jumpPage = (page: number) => {
		dispatch('change', page);
	};

	const prefixCls = getPrefixCls('carousel-indicators');
	$: cnames = clsx(prefixCls, cls);
	$: itemCls = (index: number) =>
		clsx(`${prefixCls}-item`, {
			[`${prefixCls}-item--active`]: pageIndex === index
		});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<slot>
		{#each arr as item}
			<div
				role="button"
				class={itemCls(item)}
				aria-hidden="true"
				on:click={() => jumpPage(item)}
			></div>
		{/each}
	</slot>
</div>
