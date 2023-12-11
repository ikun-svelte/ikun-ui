<script lang="ts">
	import { setContext } from 'svelte';
	import type { KDescriptionsItemMap, KDescriptionsMapItem, KDescriptionsProps } from './types';
	import { descriptionsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

	export let title: KDescriptionsProps['title'] = '';
	export let extra: KDescriptionsProps['extra'] = '';
	export let border: KDescriptionsProps['border'] = false;
	export let column: KDescriptionsProps['column'] = 3;
	export let direction: KDescriptionsProps['direction'] = 'horizontal';
	export let size: KDescriptionsProps['size'] = 'md';
	export let cls: KDescriptionsProps['cls'] = undefined;
	export let attrs: KDescriptionsProps['attrs'] = {};

	const descriptionsItemMap: KDescriptionsItemMap = new Map();

	const registerDescriptionsItem = (uid: symbol, op: KDescriptionsMapItem) => {
		descriptionsItemMap.set(uid.toString(), op);
	};

	$: {
		Array.from(descriptionsItemMap.values()).forEach((m: KDescriptionsMapItem) => {
			m.setBorder(border);
			m.setColumn(column);
			m.setDirection(direction);
			m.setSize(size);
		});
	}

	setContext(descriptionsKey, {
		registerDescriptionsItem,
		descriptionsItemMap,
		border,
		column,
		direction,
		size
	});

	const prefixCls = getPrefixCls('descriptions');
	$: cnames = clsx(prefixCls, `${prefixCls}--${size}`, `${prefixCls}__dark`, cls);
	$: headerCls = clsx(`${prefixCls}--header`, `${prefixCls}--header--${size}`);
	$: titleCls = clsx(`${prefixCls}--title`);
	$: extraCls = clsx(`${prefixCls}--extra`);
	$: bodyCls = clsx(
		`${prefixCls}--body`,
		{
			[`${prefixCls}--body--${size}`]: !border
		},
		`${prefixCls}--cols-${column}`,
		{
			[`${prefixCls}--body--border`]: border
		}
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#if title || extra || $$slots.title || $$slots.extra}
		<div class={headerCls}>
			<div class={titleCls}>
				<slot name="title">{title}</slot>
			</div>
			<div class={extraCls}>
				<slot name="extra">{extra}</slot>
			</div>
		</div>
	{/if}
	<div class={bodyCls}>
		<slot />
	</div>
</div>
