<script lang="ts">
	import { getPrefixCls, segmentedKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KSegmentedContext, KSegmentedItemProps, KSegmentedProps } from './types';
	import { createEventDispatcher, getContext } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { scale } from 'svelte/transition';
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
	setActive(context.segmentedValue);

	let size: KSegmentedProps['size'] = 'md';
	let iconSize = '18px';
	function setSize(sizes: KSegmentedProps['size']) {
		size = sizes;
	}
	context.sizeChangeFns.push(setSize);
	setSize(context.segmentedSize);

	const dispatch = createEventDispatcher();
	function onClick() {
		if (disabled) return;
		dispatch('click', value);
		context.onChange(value);
	}

	const prefixCls = getPrefixCls('segmented-item');
	$: cnames = clsx(
		`${prefixCls}--${size}`,
		{
			[prefixCls]: !disabled,
			[`${prefixCls}--disabled`]: disabled,
			[`${prefixCls}--block`]: context.block
		},
		cls
	);
	$: activeCls = clsx({
		[`${prefixCls}--active`]: isActive
	});
	const labelCls = `${prefixCls}--label`;
	const iconCls = `${prefixCls}--icon`;
</script>

<div class={cnames} {...$$restProps} {...attrs} on:click={onClick} aria-hidden="true">
	<slot>
		<div title={label} class={labelCls}>
			<span>
				{#if icon}
					<KIcon width={iconSize} cls={iconCls} height={iconSize} {icon}></KIcon>
				{/if}
				{#if !onlyIcon || (onlyIcon && !icon)}
					{label}
				{/if}
			</span>
		</div>
	</slot>
	{#if isActive}
		<div
			class={activeCls}
			out:scale={{ duration: 300, start: 0.3 }}
			in:scale={{ duration: 300, start: 0.3 }}
		></div>
	{/if}
</div>
