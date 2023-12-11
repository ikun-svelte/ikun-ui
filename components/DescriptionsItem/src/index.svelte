<script lang="ts">
	import { getContext } from 'svelte';
	import type { KDescriptionsCtx, KDescriptionsProps } from '@ikun-ui/descriptions';
	import type { KDescriptionsItemProps } from './types';
	import { descriptionsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';

	export let label: KDescriptionsItemProps['label'] = '';
	export let cls: KDescriptionsItemProps['cls'] = undefined;
	export let attrs: KDescriptionsItemProps['attrs'] = {};

	const ctx = getContext<KDescriptionsCtx>(descriptionsKey);

	let column = ctx?.column ?? 3;
	let border = ctx?.border ?? false;
	let direction = ctx?.direction ?? 'horizontal';
	let size = ctx?.size ?? 'md';

	$: lastGridColStart = ctx?.descriptionsItemMap?.size ? ctx.descriptionsItemMap.size % column : 0;

	function setColumn(v: KDescriptionsProps['column']) {
		column = v;
	}

	function setBorder(v: KDescriptionsProps['border']) {
		border = v;
	}

	function setDirection(v: KDescriptionsProps['direction']) {
		direction = v;
	}

	function setSize(v: KDescriptionsProps['size']) {
		size = v;
	}

	function doRegisterDescriptionsItem() {
		if (ctx) {
			ctx.registerDescriptionsItem(Symbol(`descriptions-item-${ctx.descriptionsItemMap.size}`), {
				setColumn,
				setBorder,
				setDirection,
				setSize
			});
		}
	}
	doRegisterDescriptionsItem();

	const prefixCls = getPrefixCls('descriptions-item');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}__dark`,
		`${prefixCls}--${size}`,
		`${prefixCls}__${direction}`,
		`ikun-last:${prefixCls}--col-${lastGridColStart}`,
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
	$: contentCls = clsx(`${prefixCls}--content`, `${prefixCls}--content__${direction}`, {
		[`${prefixCls}--content--${size}--border`]: border
	});
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	<label class={lableCls}>
		<slot name="label">
			{label}
		</slot>
	</label>
	<div class={contentCls}>
		<slot />
	</div>
</div>
