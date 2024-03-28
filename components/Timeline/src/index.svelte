<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTimelineItem, KTimelineItemInner, KTimelineProps } from './types';
	import { isBool, isString } from 'baiwusanyu-utils';

	export let mode: KTimelineProps['mode'] = undefined;
	export let items: KTimelineProps['items'] = [];
	export let reverse: KTimelineProps['reverse'] = false;
	export let pending: KTimelineProps['pending'] = false;
	export let cls: KTimelineProps['cls'] = undefined;
	export let attrs: KTimelineProps['attrs'] = {};

	const preHandleItems = (
		items: KTimelineProps['items'],
		pending: KTimelineProps['pending'],
		reverse: KTimelineProps['reverse']
	) => {
		let res = items.map((v, index) => {
			if (!v.uid) {
				v.uid = `${v.label}_${v.children}_${index}`;
			}
			if (index === items.length - 1) {
				(v as KTimelineItemInner).pending = !!pending;
			}
			return v;
		}) as KTimelineItemInner[];

		if (reverse) {
			res.reverse();
		}
		return res;
	};

	let resolveItems: KTimelineItemInner[] = [];
	$: {
		resolveItems = preHandleItems(items, pending, reverse);
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
	$: tailPendingCls = clsx(tailCls, {
		[`${prefixCls}-item-tail--pending`]: hasLabel || (!hasLabel && mode === 'alternate')
	});

	$: headBaseCls = clsx({
		[`${prefixCls}-item-head--center`]: hasLabel || (!hasLabel && mode === 'alternate'),
		[`${prefixCls}-item-head--right`]: !hasLabel && mode === 'right',
		[`${prefixCls}-item-head--left`]: !hasLabel && mode === 'left'
	});
	$: headCls = clsx(`${prefixCls}-item-head`, headBaseCls);

	$: headPendingCls = clsx(headCls, {
		[`${prefixCls}-item-head--pending`]: hasLabel || (!hasLabel && mode === 'alternate')
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

	$: pendingContent = (item: KTimelineItem) => {
		if (isBool(pending)) {
			return item.children;
		}
		if (isString(pending)) {
			return pending;
		}
		return '';
	};

	const isPendingTail = (index: number) => {
		if (!reverse && resolveItems[index + 1].pending) {
			return true;
		}
		return !!(index === 0 && reverse && resolveItems[index].pending);
	};
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
	{#each resolveItems as item, index (item.uid)}
		<li class={itemCls}>
			{#if index < resolveItems.length - 1 && !isPendingTail(index)}
				<div class={tailCls} style:height="calc(100% - 10px)"></div>
			{/if}

			{#if index < resolveItems.length - 1 && isPendingTail(index)}
				<div class={tailPendingCls} style:height="calc(100% - 10px)"></div>
			{/if}

			{#if !item.pending}
				<slot name="dot" {index} {item} cls={headBaseCls}>
					<div class={headCls} style:color={item.color} style:border-color={item.color}></div>
				</slot>
			{/if}

			{#if item.pending}
				<slot name="pendingDot" {index} {item} cls={headBaseCls}>
					<div
						class={headPendingCls}
						style:color={item.color}
						style:border-color={item.color}
					></div>
				</slot>
			{/if}

			{#if item.children && !item.pending}
				<slot
					name="children"
					children={item.children}
					cls={contentCls(index, item.position)}
					{index}
				>
					<div class={contentCls(index, item.position)}>{item.children}</div>
				</slot>
			{/if}
			{#if item.children && item.pending}
				<slot
					name="pending"
					children={item.children}
					{index}
					cls={contentCls(index, item.position)}
				>
					<div class={contentCls(index, item.position)}>{pendingContent(item)}</div>
				</slot>
			{/if}
			{#if item.label}
				<slot name="label" label={item.label} {index}>
					{item.label}
				</slot>
			{/if}
		</li>
	{/each}
</ul>
