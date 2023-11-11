<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KPaginationProps } from './types';
	import KInput from '@ikun-ui/input';
	import { debounce } from 'baiwusanyu-utils';
	import { createEventDispatcher, tick } from 'svelte';

	export let total: KPaginationProps['total'] = 0;
	export let pageSize: KPaginationProps['pageSize'] = 10;
	export let size: KPaginationProps['size'] = 'md';
	export let currentPage: KPaginationProps['currentPage'] = 1;
	export let disabled: KPaginationProps['disabled'] = false;
	export let infinite: KPaginationProps['infinite'] = false;
	$: pagerTotal = Number((total / pageSize).toFixed());
	let value = '1';
	$: if (currentPage > pagerTotal && !infinite) {
		value = `${pagerTotal <= 0 ? 1 : pagerTotal}`;
	} else {
		if (currentPage <= 0) {
			value = '1';
		} else {
			value = `${currentPage}`;
		}
	}

	const dispatch = createEventDispatcher();
	const handleGoto = (e: CustomEvent) => {
		dispatch('goto', e.detail.target.value);
	};

	const handleInput = debounce(async (e: CustomEvent) => {
		value = e.detail;
		if (value) {
			if (!/^\d+$/.test(value)) {
				await tick();
				if (currentPage > pagerTotal && !infinite) {
					value = `${pagerTotal <= 0 ? 1 : pagerTotal}`;
				} else {
					if (currentPage <= 0) {
						value = '1';
					} else {
						value = `${currentPage}`;
					}
				}
			} else {
				if (Number(value) < 1) {
					value = `1`;
				}
				if (Number(value) > pagerTotal && !infinite) {
					value = `${pagerTotal}`;
				}
			}
		}
	}, 300);

	const handleChange = (e: CustomEvent) => {
		if (!e.detail.target.value) {
			value = `1`;
		}
	};

	const prefixCls = getPrefixCls('pagination-jumper');
	$: cnames = clsx(prefixCls, {
		[`${prefixCls}__${size}`]: true,
		[`${prefixCls}__disabled`]: disabled
	});
</script>

<div class={cnames}>
	Go to
	<KInput
		{size}
		{value}
		{disabled}
		on:change={handleChange}
		on:enter={handleGoto}
		on:input={handleInput}
		center
		cls="ml-2 w-50px"
	></KInput>
</div>
