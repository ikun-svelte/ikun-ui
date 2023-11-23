<script lang="ts">
	import type { KDescriptionsCtx, KDescriptionsItemProps } from './types';
	import { descriptionsKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import { getContext } from 'svelte';

	export let label: KDescriptionsItemProps['label'] = '';
	export let span: KDescriptionsItemProps['span'] = '';
	export let align: KDescriptionsItemProps['align'] = 'left';
	export let labelAlign: KDescriptionsItemProps['labelAlign'] = 'left';
	export let cls: KDescriptionsItemProps['cls'] = undefined;
	export let attrs: KDescriptionsItemProps['attrs'] = {};

	$: border = (getContext(descriptionsKey) as KDescriptionsCtx).border || false;
	$: direction = (getContext(descriptionsKey) as KDescriptionsCtx).direction || 'horizontal';
	$: size = (getContext(descriptionsKey) as KDescriptionsCtx).size || 'md';

	const prefixCls = getPrefixCls('descriptions-item');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}--${direction}`,
		`${prefixCls}--${direction}--${size}`,
		{
			[`${prefixCls}--border`]: border
		},
		cls,
		'last:bg-red'
	);
	$: labelCls = clsx(`${prefixCls}--label`);
	$: spanCls = clsx(`${prefixCls}--span`);

	// TODO props size
	// TODO props label
	// TODO props span
	// TODO props align
	// TODO props labelAlign
</script>

{#if direction === 'horizontal'}
	<div class={cnames} {...$$restProps} {...attrs}>
		<div class={labelCls}>
			<slot name="label">{label}</slot>
		</div>
		<div class={spanCls}>
			<slot>{span}</slot>
		</div>
	</div>
{/if}
