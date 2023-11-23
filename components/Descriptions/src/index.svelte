<script lang="ts">
	import type { KDescriptionsProps } from './types';
	import { descriptionsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { setContext } from 'svelte';

	export let title: KDescriptionsProps['title'] = '';
	export let extra: KDescriptionsProps['extra'] = '';
	export let border: KDescriptionsProps['border'] = false;
	export let column: KDescriptionsProps['column'] = 3;
	export let direction: KDescriptionsProps['direction'] = 'horizontal';
	export let size: KDescriptionsProps['size'] = 'md';
	export let cls: KDescriptionsProps['cls'] = undefined;
	export let attrs: KDescriptionsProps['attrs'] = {};

	setContext(descriptionsKey, {
		border,
		direction,
		size
	});

	const prefixCls = getPrefixCls('descriptions');
	$: cnames = clsx(prefixCls, `${prefixCls}__dark`, cls);
	$: headerCls = clsx(`${prefixCls}--header`, `${prefixCls}--header--${size}`);
	$: titleCls = clsx(`${prefixCls}--title`, `${prefixCls}--title--${size}`);
	$: extraCls = clsx(`${prefixCls}--extra`);
	$: bodyCls = clsx(`${prefixCls}--body`, `${prefixCls}--cols-${column}`, {
		[`${prefixCls}--body-border`]: border
	});
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
