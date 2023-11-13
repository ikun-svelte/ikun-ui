<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KPaginationProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { isString } from 'baiwusanyu-utils';
	import { KIcon } from '@ikun-ui/icon';

	export let disabled: KPaginationProps['disabled'] = false;
	export let index: KPaginationProps['index'] = 0;
	export let isActive: KPaginationProps['isActive'] = false;
	export let isBg: KPaginationProps['isBg'] = false;
	export let size: KPaginationProps['size'] = 'md';
	export let text: KPaginationProps['text'] = '';
	export let icon: KPaginationProps['icon'] = '';
	export let type: KPaginationProps['type'] = undefined;
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

	const prefixCls = getPrefixCls('pagination-pager');
	$: cnames = clsx(prefixCls, `${prefixCls}__${size}`, {
		[`${prefixCls}__active`]: isActive && !isBg,
		[`${prefixCls}__dark`]: !isActive && !isBg,
		[`${prefixCls}__bg`]: !isActive && isBg && !disabled,
		[`${prefixCls}__bg__dark`]: !isActive && isBg && !disabled,
		[`${prefixCls}__hover`]: !(isActive && isBg) && !disabled,
		[`${prefixCls}__bg__active`]: isActive && isBg,
		[`${prefixCls}__disabled`]: disabled,
		[`${prefixCls}__disabled__bg`]: isBg && disabled,
		[`${prefixCls}__disabled__bg__dark`]: !isActive && isBg && disabled
	});
	let prevPointIcon = 'i-carbon-overflow-menu-horizontal';
	let nextPointIcon = prevPointIcon;
	const handleEnter = () => {
		if (type === 'prevPoint') {
			prevPointIcon = 'i-carbon-page-first';
		}

		if (type === 'nextPoint') {
			nextPointIcon = 'i-carbon-page-last';
		}
	};
	const handleLeave = () => {
		prevPointIcon = nextPointIcon = 'i-carbon-overflow-menu-horizontal';
	};
</script>

<li
	class={cnames}
	on:mouseenter={handleEnter}
	on:mouseleave={handleLeave}
	{...$$restProps}
	on:click={(e) => handleClick(e, index)}
	aria-hidden="true"
>
	{#if !type}
		{index}
	{:else if type === 'next' || type === 'prev'}
		{#if text}
			{text}
		{:else if icon}
			<KIcon {icon} width="auto" height="auto"></KIcon>
		{:else if type === 'next'}
			<KIcon icon="i-carbon-chevron-right" width="auto" height="auto"></KIcon>
		{:else if type === 'prev'}
			<KIcon icon="i-carbon-chevron-left" width="auto" height="auto"></KIcon>
		{/if}
	{:else if type === 'prevPoint'}
		<KIcon icon={prevPointIcon} width="auto" height="auto"></KIcon>
	{:else if type === 'nextPoint'}
		<KIcon icon={nextPointIcon} width="auto" height="auto"></KIcon>
	{/if}
</li>
