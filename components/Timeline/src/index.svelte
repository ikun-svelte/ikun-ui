<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTimelineProps } from './types';

	export let cls: KTimelineProps['cls'] = undefined;
	export let items: KTimelineProps['items'] = [];
	export let attrs: KTimelineProps['attrs'] = {};

	const prefixCls = getPrefixCls('timeline');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: true
		},
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#each items as item, index (item.uid)}
		<slot name="children" children={item.children} {index}>{item.children}</slot>
		<slot name="label" label={item.label} {index}>{item.label}</slot>
		<slot name="dot" {index} {item}>dot</slot>
	{/each}
</div>
