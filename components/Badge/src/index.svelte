<script lang="ts">
	import { isNumber } from 'baiwusanyu-utils';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KBadgeProps } from './types';

	export let value: KBadgeProps['value'] = '';
	export let max: KBadgeProps['max'] = 99;
	export let isDot: KBadgeProps['isDot'] = false;
	export let show: KBadgeProps['show'] = true;
	export let type: KBadgeProps['type'] = 'error';
	export let cls: KBadgeProps['cls'] = '';
	export let attrs: KBadgeProps['attrs'] = {};

	let content = `${value}`;
	$: if (isDot) {
		content = '';
	}
	$: if (isNumber(value) && isNumber(max)) {
		content = max < (value as number) ? `${max}+` : `${value}`;
	}

	// class names
	const prefixCls = getPrefixCls('badge');
	$: baseCls = clsx(prefixCls, `${prefixCls}--base`, cls);
	$: supCls = clsx(
		`${prefixCls}--content`,
		`${prefixCls}--content-${type}`,
		`${prefixCls}--content-fixed`,
		{
			[`${prefixCls}--content-dot`]: isDot
		},
		`${prefixCls}--content__dark`
	);
</script>

<div class={baseCls} {...attrs}>
	<slot />
	{#if show && (content || isDot)}
		<sup class={supCls}>{content}</sup>
	{/if}
</div>
