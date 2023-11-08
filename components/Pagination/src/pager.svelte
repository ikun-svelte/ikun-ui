<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KPaginationProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { isString } from 'baiwusanyu-utils';

	export let disabled: KPaginationProps['disabled'] = false;
	export let index: KPaginationProps['index'] = 0;
	export let isActive: KPaginationProps['isActive'] = false;
	export let isBg: KPaginationProps['isBg'] = false;
	export let size: KPaginationProps['size'] = 'md';
	const dispatch = createEventDispatcher();
	const handleClick = (e: MouseEvent, index: number | string) => {
		if (disabled) {
			return;
		}
		if (!isString(index)) {
			dispatch('click', index);
		} else {
			dispatch('click');
		}
	};

	const prefixCls = getPrefixCls('pagination--pager');
	$: cnames = clsx(prefixCls, `${prefixCls}__${size}`, {
		[`${prefixCls}__active`]: isActive && !isBg,
		[`${prefixCls}__bg`]: !isActive && isBg && !disabled,
		[`${prefixCls}__hover`]: !(isActive && isBg) && !disabled,
		[`${prefixCls}__bg__active`]: isActive && isBg,
		[`${prefixCls}__disabled`]: disabled,
		[`${prefixCls}__disabled__bg`]: isBg && disabled
	});
</script>

<li class={cnames} {...$$restProps} on:click={(e) => handleClick(e, index)} aria-hidden="true">
	{index}
</li>
