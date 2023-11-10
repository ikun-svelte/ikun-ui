<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KPaginationProps } from './types';
	import KPagerComp from './pager.svelte';
	import { createEventDispatcher } from 'svelte';

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

	const dispatch = createEventDispatcher();
	$: isEven = pagerCount % 2 === 0;
	// total pages
	$: pagerTotal = Number((total / pageSize).toFixed());
	$: isShowAll = pagerCount >= pagerTotal;
	// Exclude the first and last pages,
	// and the pager displayed in the middle
	$: midPagerCount = pagerCount - 2;
	// Median of pagerCount
	$: mid = Number((pagerCount / 2).toFixed());
	// The number of pagers displayed before and after
	// the pager corresponding to the median
	$: offset = Math.floor(midPagerCount / 2);
	$: currentPageInner = currentPage > pagerTotal ? pagerTotal : currentPage < 0 ? 1 : currentPage;
	let isShowNextExpand = false;
	let isShowPrevExpand = false;
	//TODO: refactor
	function updatedExpend() {
		isShowNextExpand = currentPageInner <= pagerTotal - (isEven ? mid + 1 : mid);
		isShowPrevExpand = currentPageInner > mid;
	}
	$: {
		!isShowAll && (isShowNextExpand = currentPageInner <= pagerTotal - (isEven ? mid + 1 : mid));
		!isShowAll && (isShowPrevExpand = currentPageInner > mid);
	}

	let arr: number[] = [];
	function fillList(start: number, end: number) {
		arr = [];
		for (let i = start; i <= end; i++) {
			arr.push(i);
		}
	}
	$: if (!isShowAll) {
		updatedList();
		if (!isShowNextExpand) {
			fillList(pagerTotal - midPagerCount, pagerTotal - 1);
		}
		if (!isShowPrevExpand) {
			fillList(2, midPagerCount + 1);
		}
	} else {
		fillList(2, pagerTotal - 1);
	}

	function getStartEnd() {
		let end = currentPageInner + offset;
		let start = currentPageInner - (isEven ? offset - 1 : offset);
		return [start, end];
	}
	function updatedList() {
		if (isShowPrevExpand && isShowNextExpand) {
			const [start, end] = getStartEnd();
			fillList(start, end);
		}
	}

	function limitCurrentPage() {
		currentPageInner >= pagerTotal && (currentPageInner = pagerTotal);
		currentPageInner <= 0 && (currentPageInner = 1);
		dispatch('currentChange', currentPageInner);
	}

	export function jumpTo(e: CustomEvent) {
		currentPageInner = Number(e.detail);
		limitCurrentPage();
		if (!isShowAll) {
			updatedExpend();
			updatedList();
			if (!isShowNextExpand) {
				fillList(pagerTotal - midPagerCount, pagerTotal - 1);
			}
			if (!isShowPrevExpand) {
				fillList(2, midPagerCount + 1);
			}
		}
	}

	const handleNext = (step = 1) => {
		// compute current page
		currentPageInner = currentPageInner + step;
		limitCurrentPage();
		if (!isShowAll) {
			updatedExpend();
			updatedList();
			if (!isShowNextExpand) {
				fillList(pagerTotal - midPagerCount, pagerTotal - 1);
			}
		}
	};
	const handlePrev = (step = 1) => {
		// compute current page
		currentPageInner = currentPageInner - step;
		limitCurrentPage();
		if (!isShowAll) {
			updatedExpend();
			updatedList();
			if (!isShowPrevExpand) {
				fillList(2, midPagerCount + 1);
			}
		}
	};
	// TODO: 偶数next测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
	// TODO: 奇数next测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
	// TODO: 偶数prev测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
	// TODO: 奇数prev测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
	// TODO: 奇数showAll = true 测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
	// TODO: 偶数showAll = true 测试(高亮、pager数量, ...显示，pager内容正确, 点击变化)
	// TODO: 点击三点测试
	// TODO: 点击 pager测试
	// TODO: nextIcon、nextText 測試
	// TODO: prevIcon、prevText 測試
	// TODO: ... hover 測試
	// TODO: size 測試
	// TODO: bg 測試
	// TODO: layout 測試
	// TODO: jumper 输入限制测试測試
	// TODO: jumper 跳转 测试
	// TODO: total 显示测试
	// TODO: sizes 组件测试 变化pageSize
	// TODO: sizes 组件测试 根据变化pageSize 修改当前页，超过最大页数就为最大页数
	// TODO: sizes 组件测试 事件
	// TODO: 禁用 组件测试 事件
	const prefixCls = getPrefixCls('pagination');
	$: cnames = clsx(prefixCls, {}, cls);
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
	<KPagerComp
		index={'<'}
		text={prevText}
		icon={prevIcon}
		type="prev"
		{isBg}
		{size}
		{disabled}
		on:click={() => handlePrev(1)}
	></KPagerComp>

	<KPagerComp index={1} {isBg} {size} {disabled} on:click={jumpTo} isActive={1 === currentPageInner}
	></KPagerComp>
	{#if isShowPrevExpand}
		<KPagerComp type="prevPoint" {isBg} {size} on:click={() => handlePrev(pagerCount)} {disabled}
		></KPagerComp>
	{/if}

	{#each arr as item}
		<KPagerComp
			index={item}
			{isBg}
			{size}
			{disabled}
			on:click={jumpTo}
			isActive={item === currentPageInner}
		></KPagerComp>
	{/each}

	{#if isShowNextExpand}
		<KPagerComp type="nextPoint" {isBg} {size} on:click={() => handleNext(pagerCount)} {disabled}
		></KPagerComp>
	{/if}
	<KPagerComp
		index={pagerTotal}
		{size}
		{isBg}
		{disabled}
		on:click={jumpTo}
		isActive={pagerTotal === currentPageInner}
	></KPagerComp>
	<KPagerComp
		text={nextText}
		icon={nextIcon}
		type="next"
		{size}
		{isBg}
		{disabled}
		on:click={() => handleNext(1)}
	></KPagerComp>
</ul>
