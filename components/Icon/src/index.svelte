<script lang="ts">
	import type { KIconProps } from './types';
	import { createEventDispatcher } from 'svelte';
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';

	export let icon: KIconProps['icon'] = '';
	export let btn: KIconProps['btn'] = false;
	export let width: KIconProps['width'] = '24px';
	export let height: KIconProps['height'] = '24px';
	export let color: KIconProps['color'] = '';
	export let cls: KIconProps['cls'] = undefined;
	export let attrs: KIconProps['attrs'] = {};

	$: tag = btn ? 'button' : '';

	const dispatch = createEventDispatcher();
	const onClick = (event: Event) => {
		dispatch('click', event);
	};

	const prefixCls = getPrefixCls('icon');
	// class names
	$: cnames = clsx(
		`${prefixCls}--base`,
		{
			[`${prefixCls}--base__dark`]: !color,
			[`${prefixCls}--role-button`]: !!btn
		},
		`${prefixCls}-transition`,
		icon,
		color,
		cls
	);
	$: widthInner = !width ? '24px' : width === 'auto' ? undefined : width;
	$: heightInner = !height ? '24px' : height === 'auto' ? undefined : height;
</script>

<span
	class={cnames}
	role={tag}
	aria-hidden="true"
	{...$$restProps}
	{...attrs}
	style:width={widthInner}
	style:height={heightInner}
	on:click={onClick}
></span>
