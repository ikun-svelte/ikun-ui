<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTimelineItemInner, KTimelineProps } from './types';

	export let mode: KTimelineProps['mode'] = undefined;
	export let items: KTimelineProps['items'] = [];
	export let reverse: KTimelineProps['reverse'] = false;
	export let pending: KTimelineProps['pending'] = false;
	export let cls: KTimelineProps['cls'] = undefined;
	export let attrs: KTimelineProps['attrs'] = {};

	$: resolveItems = items.map((v, index) => {
		if (!v.uid) {
			v.uid = `${v.label}_${v.children}_${index}`;
		}
		if (index === items.length - 1 && pending) {
			(v as KTimelineItemInner).pending = true;
		}
		return v;
	}) as KTimelineItemInner[];

	let reverseInner = reverse;
	if (reverseInner) {
		resolveItems = resolveItems.reverse();
	}
	$: {
		if (reverseInner !== reverse) {
			reverseInner = reverse;
			resolveItems = resolveItems.reverse();
		}
	}

	// 有 label 时，无论mode 是啥，一直在中间，
	// 无 label 时，只有 mode 是 alternate 才在中间
	$: hasLabel = items.some((v) => !!v.label);

	const prefixCls = getPrefixCls('timeline');
	const itemCls = `${prefixCls}-item`;
	$: tailCls = clsx(`${prefixCls}-item-tail`, {
		[`${prefixCls}-item-tail--center`]: hasLabel || (!hasLabel && mode === 'alternate'),
		[`${prefixCls}-item-tail--right`]: !hasLabel && mode === 'right'
	});
	$: headCls = clsx(`${prefixCls}-item-head`, {
		[`${prefixCls}-item-head--center`]: hasLabel || (!hasLabel && mode === 'alternate'),
		[`${prefixCls}-item-head--right`]: !hasLabel && mode === 'right'
	});
	$: contentCls = (index: number, position: null | undefined | 'left' | 'right') => {
		const isCenter = hasLabel || (!hasLabel && mode === 'alternate');
		const placement = !(index % 2) ? 'right' : 'left';
		return clsx(`${prefixCls}-item-content`, {
			[`${prefixCls}-item-content--cl`]: isCenter && placement === 'left',
			[`${prefixCls}-item-content--cr`]: isCenter && placement === 'right',
			[`${prefixCls}-item-content--right`]: !hasLabel && mode === 'right',
			[`${prefixCls}-item-c__${position}`]: mode === 'alternate' && position
		});
	};
	$: cnames = clsx(prefixCls, cls);
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
	{#each resolveItems as item, index (item.uid)}
		<li class={itemCls}>
			{#if index < resolveItems.length - 1}
				<div class={tailCls} style:height="calc(100% - 10px)"></div>
			{/if}
			<slot name="dot" {index} {item}>
				<div class={headCls} style:color={item.color} style:border-color={item.color}></div>
			</slot>
			{#if item.children}
				<slot name="children" children={item.children} {index}>
					<div class={contentCls(index, item.position)}>{item.children}</div>
				</slot>
			{/if}
			{#if item.label}
				<slot name="label" label={item.label} {index}>{item.label}</slot>
			{/if}
		</li>
	{/each}
</ul>
