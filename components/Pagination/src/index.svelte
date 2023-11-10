<script lang="ts">
	import type { KPaginationProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import KPaginationComp from './pagination.svelte';
	import KJumperComp from './jumper.svelte';
	import KSizeComp from './sizes.svelte';
	import KTotalComp from './total.svelte';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	export let cls: KPaginationProps['cls'] = undefined;
	export let attrs: KPaginationProps['attrs'] = {};
	export let size: KPaginationProps['size'] = 'md';
	export let isBg: KPaginationProps['isBg'] = false;
	export let disabled: KPaginationProps['disabled'] = false;
	export let prevText: KPaginationProps['prevText'] = '';
	export let prevIcon: KPaginationProps['prevIcon'] = '';
	export let nextText: KPaginationProps['nextText'] = '';
	export let nextIcon: KPaginationProps['nextIcon'] = '';
	export let total: KPaginationProps['total'] = 0;
	export let pagerCount: KPaginationProps['pagerCount'] = 7;
	export let pageSize: KPaginationProps['pageSize'] = 10;
	export let currentPage: KPaginationProps['currentPage'] = 1;
	// layout
	export let layout: KPaginationProps['layout'] = ['pager'];
	// sizes
	export let pageSizes: KPaginationProps['pageSizes'] = [10, 20, 30, 40, 50, 100];
	export let pageSizesWidth: KPaginationProps['pageSizesWidth'] = 100;

	const composeDict = {
		pager: KPaginationComp,
		jumper: KJumperComp,
		sizes: KSizeComp,
		total: KTotalComp
	};

	let composeRef = {
		pager: null,
		jumper: null,
		sizes: null,
		total: null
	} as any;

	const dispatch = createEventDispatcher();
	const handleCurrentChange = (e: CustomEvent) => {
		dispatch('currentChange', e.detail);
	};

	const handleSizeChange = (e: CustomEvent) => {
		dispatch('sizeChange', e.detail);
	};

	const handleGoto = (e: CustomEvent) => {
		composeRef.pager.jumpTo(e);
	};

	const prefixCls = getPrefixCls('pagination-container');
	$: cnames = clsx(prefixCls);
</script>

<div class={cnames}>
	{#each layout as compNames (compNames)}
		<svelte:component
			this={composeDict[compNames]}
			bind:this={composeRef[compNames]}
			on:currentChange={handleCurrentChange}
			on:sizeChange={handleSizeChange}
			on:goto={handleGoto}
			{pageSizes}
			{pageSizesWidth}
			{cls}
			{attrs}
			{...$$restProps}
			{size}
			{isBg}
			{disabled}
			{prevText}
			{prevIcon}
			{nextText}
			{nextIcon}
			{total}
			{pagerCount}
			{pageSize}
			{currentPage}
		></svelte:component>
	{/each}
</div>
