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
	export let infinite: KPaginationProps['infinite'] = false;
	const dispatch = createEventDispatcher();
	$: isEven = pagerCount % 2 === 0;
	// total pages
	$: pagerTotal = Number((total / pageSize).toFixed());
	$: isShowAll = infinite || pagerCount >= pagerTotal;
	// Exclude the first and last pages,
	// and the pager displayed in the middle
	$: midPagerCount = pagerCount - 2;
	// Median of pagerCount
	$: mid = Number((pagerCount / 2).toFixed());
	// The number of pagers displayed before and after
	// the pager corresponding to the median
	$: offset = Math.floor(midPagerCount / 2);

	let currentPageInner = 1;
	$: if (currentPage > pagerTotal && !infinite) {
		currentPageInner = pagerTotal <= 0 ? 1 : pagerTotal;
	} else {
		if (currentPage <= 0) {
			currentPageInner = 1;
		} else {
			currentPageInner = currentPage;
		}
	}

	$: isShowNextExpand = !isShowAll;
	$: isShowPrevExpand = !isShowAll;
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
	// init
	$: if (isShowAll && infinite) {
		updatedListInfinite();
	} else {
		if (!isShowAll) {
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
		!infinite && currentPageInner >= pagerTotal && (currentPageInner = pagerTotal);
		currentPageInner <= 0 && (currentPageInner = 1);
		dispatch('currentChange', currentPageInner);
	}

	function updatedListInfinite() {
		if (currentPageInner > pagerCount) {
			fillList(currentPageInner - offset - 1, currentPageInner + offset + 1);
		} else {
			fillList(1, pagerCount);
		}
	}

	export function jumpTo(e: CustomEvent) {
		currentPageInner = Number(e.detail);
		limitCurrentPage();
		if (!infinite) {
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
		} else {
			updatedListInfinite();
		}
	}

	const handleNext = (step = 1) => {
		// compute current page
		currentPageInner = currentPageInner + step;
		limitCurrentPage();
		if (!infinite) {
			if (!isShowAll) {
				updatedExpend();
				updatedList();
				if (!isShowNextExpand) {
					fillList(pagerTotal - midPagerCount, pagerTotal - 1);
				}
			}
		} else {
			updatedListInfinite();
		}
	};
	const handlePrev = (step = 1) => {
		// compute current page
		currentPageInner = currentPageInner - step;
		limitCurrentPage();
		if (!infinite) {
			if (!isShowAll) {
				updatedExpend();
				updatedList();
				if (!isShowPrevExpand) {
					fillList(2, midPagerCount + 1);
				}
			}
		} else {
			updatedListInfinite();
		}
	};

	const prefixCls = getPrefixCls('pagination');
	$: cnames = clsx(prefixCls, {}, cls);
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
	<KPagerComp
		index={'<'}
		text={prevText}
		icon={prevIcon}
		type="prev"
		data-k-page-prev
		{isBg}
		{size}
		{disabled}
		on:click={() => handlePrev(1)}
	></KPagerComp>
	{#if !infinite}
		<KPagerComp
			index={1}
			data-k-page-first
			{isBg}
			{size}
			{disabled}
			on:click={jumpTo}
			isActive={1 === currentPageInner}
		></KPagerComp>
	{/if}
	{#if isShowPrevExpand}
		<KPagerComp
			type="prevPoint"
			{isBg}
			data-k-page-prev-exp
			{size}
			on:click={() => handlePrev(pagerCount)}
			{disabled}
		></KPagerComp>
	{/if}

	{#each arr as item}
		<KPagerComp
			index={item}
			{isBg}
			{size}
			data-k-page-center={item}
			{disabled}
			on:click={jumpTo}
			isActive={item === currentPageInner}
		></KPagerComp>
	{/each}

	{#if isShowNextExpand}
		<KPagerComp
			type="nextPoint"
			data-k-page-next-exp
			{isBg}
			{size}
			on:click={() => handleNext(pagerCount)}
			{disabled}
		></KPagerComp>
	{/if}

	{#if !infinite && pagerTotal > 1}
		<KPagerComp
			index={pagerTotal}
			{size}
			{isBg}
			{disabled}
			data-k-page-last
			on:click={jumpTo}
			isActive={pagerTotal === currentPageInner}
		></KPagerComp>
	{/if}
	<KPagerComp
		text={nextText}
		icon={nextIcon}
		type="next"
		data-k-page-next
		{size}
		{isBg}
		{disabled}
		on:click={() => handleNext(1)}
	></KPagerComp>
</ul>
