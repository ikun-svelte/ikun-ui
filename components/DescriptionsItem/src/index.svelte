<script lang="ts">
	import { getContext } from 'svelte';
	import type { KDescriptionsCtx } from '@ikun-ui/descriptions';
	import type { KDescriptionsItemProps } from './types';
	import { descriptionsKey, getPrefixCls, type ReactiveContext } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

	export let label: KDescriptionsItemProps['label'] = '';
	export let span: KDescriptionsItemProps['span'] = '';
	export let cls: KDescriptionsItemProps['cls'] = undefined;
	export let attrs: KDescriptionsItemProps['attrs'] = {};

	const ctx = getContext<ReactiveContext<KDescriptionsCtx>>(descriptionsKey);

	let column = ctx.props.column || 3;
	let border = ctx.props.border || false;
	let direction = ctx.props.direction || 'horizontal';
	let size = ctx.props.size || 'md';

	function ctxPropsChange(props: KDescriptionsCtx) {
		column = props.column;
		border = props.border;
		direction = props.direction;
		size = props.size;
	}

	let colIndex = 0;

	if (ctx) {
		ctxPropsChange(ctx.props);
		ctx.evtMap.push(ctxPropsChange);
		colIndex = ctx.evtMap.length % column;
	}

	const prefixCls = getPrefixCls('descriptions-item');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}--${size}`,
		`${prefixCls}__${direction}`,
		`ikun-last:${prefixCls}--col-${colIndex}`,
		{
			[`${prefixCls}--border`]: border
		},
		cls
	);
	$: lableCls = clsx(
		`${prefixCls}--label`,
		`${prefixCls}--label__${direction}`,
		`${prefixCls}--label__${direction}--${size}`,
		{
			[`${prefixCls}--label--${size}--border`]: border
		}
	);
	$: spanCls = clsx(`${prefixCls}--span`, `${prefixCls}--span__${direction}`, {
		[`${prefixCls}--span--${size}--border`]: border
	});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<label class={lableCls}>
		<slot name="label">
			{label}
		</slot>
	</label>
	<div class={spanCls}>
		<slot>
			{span}
		</slot>
	</div>
</div>
