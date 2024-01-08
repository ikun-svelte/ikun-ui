<script lang="ts">
	import { getPrefixCls, segmentedKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSegmentedContext, KSegmentedItemProps, KSegmentedProps } from './types';
	import { createEventDispatcher, getContext } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	export let value: KSegmentedItemProps['value'] = '';
	export let label: KSegmentedItemProps['label'] = '';
	export let disabled: KSegmentedItemProps['disabled'] = false;
	export let icon: KSegmentedItemProps['icon'] = '';
	export let onlyIcon: KSegmentedItemProps['onlyIcon'] = false;
	export let cls: KSegmentedItemProps['cls'] = undefined;
	export let attrs: KSegmentedItemProps['attrs'] = {};
	const context = getContext(segmentedKey) as KSegmentedContext;

	let isActive = false;
	function setActive(val: KSegmentedItemProps['value']) {
		isActive = val === value;
	}
	context.valueChangeFns.push(setActive);

	let size: KSegmentedProps['size'] = 'md';
	let iconSizeMap = {
		sm: '12px',
		md: '16px',
		lg: '20px'
	};
	let iconSize = iconSizeMap[size];

	function setSize(sizes: KSegmentedProps['size']) {
		size = sizes;
		iconSize = iconSizeMap[size];
	}
	context.sizeChangeFns.push(setSize);

	const dispatch = createEventDispatcher();
	function onClick() {
		dispatch('click', value);
		context.onChange(value);
	}

	const prefixCls = getPrefixCls('segmented-item');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}--${size}`,
		{
			[`${prefixCls}--active`]: isActive,
			[`${prefixCls}--disabled`]: disabled
		},
		cls
	);

	const labelCls = `${prefixCls}--label`;
	const iconCls = `${prefixCls}--icon`;
</script>

<div class={cnames} {...$$restProps} {...attrs} on:click={onClick} aria-hidden="true">
	<slot>
		<div title={label} class={labelCls}>
			{#if !onlyIcon && icon}
				<KIcon width={iconSize} cls={iconCls} height={iconSize} {icon}></KIcon>
			{/if}
			{#if !onlyIcon}
				<div>{label}</div>
			{/if}
		</div>
	</slot>
</div>
