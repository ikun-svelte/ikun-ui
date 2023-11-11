<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KPaginationProps } from './types';
	import { KSelect } from '@ikun-ui/select';
	import { createEventDispatcher } from 'svelte';
	export let disabled: KPaginationProps['disabled'] = false;
	export let pageSize: KPaginationProps['pageSize'] = 10;
	export let size: KPaginationProps['size'] = 'md';
	export let pageSizesWidth: KPaginationProps['pageSizesWidth'] = 100;
	export let total: KPaginationProps['total'] = 0;
	export let infinite: KPaginationProps['infinite'] = false;
	export let currentPage: KPaginationProps['currentPage'] = 1;
	export let pageSizes: KPaginationProps['pageSizes'] = [10, 20, 30, 40, 50, 100];
	// total pages
	$: pagerTotal = Number((total / pageSize).toFixed());
	$: value = { label: `${pageSize}/page`, value: pageSize, id: pageSize };
	let pageSizesList = [] as Record<string, any>[];
	$: {
		pageSizesList = pageSizes.map((v) => {
			return {
				label: `${v}/page`,
				value: v,
				id: v
			};
		});
	}

	const dispatch = createEventDispatcher();
	const onSelect = (e: CustomEvent) => {
		value = e.detail;
		let currentPageFixed = currentPage;
		if (currentPage > pagerTotal && !infinite) {
			currentPageFixed = pagerTotal <= 0 ? 1 : pagerTotal;
		} else {
			if (currentPage <= 0) {
				currentPageFixed = 1;
			} else {
				currentPageFixed = currentPage;
			}
		}
		dispatch('sizeChange', {
			currentPage: currentPageFixed,
			size: e.detail.value
		});
	};

	$: psWidth = size === 'lg' && pageSizesWidth === 100 ? 120 : pageSizesWidth;
	const prefixCls = getPrefixCls('pagination-sizes');
	$: cnames = clsx(prefixCls, {
		[`${prefixCls}__disabled`]: disabled
	});
</script>

<div class={cnames}>
	<KSelect
		{size}
		{value}
		{disabled}
		dataList={pageSizesList}
		labelKey="label"
		valueKey="value"
		key="id"
		attrs={{ style: `width: ${psWidth}px` }}
		on:updateValue={onSelect}
	></KSelect>
</div>
