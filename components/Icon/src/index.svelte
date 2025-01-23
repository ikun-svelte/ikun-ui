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
	export let cls: KIconProps['cls'] = '';
	export let attrs: KIconProps['attrs'] = {};
	export let theme: KIconProps['theme'] = undefined;

	$: tag = btn ? 'button' : '';

	const dispatch = createEventDispatcher();
	const onClick = (event: Event) => {
		dispatch('click', event);
	};
	const onMouseenter = (event: Event) => {
		dispatch('mouseenter', event);
	};
	const onMouseleave = (event: Event) => {
		dispatch('mouseleave', event);
	};

	const prefixCls = getPrefixCls('icon');
	// class names
	$: cnames = clsx(
		`${prefixCls}--base`,
		{
			[`${prefixCls}--base__dark`]: !color && ((theme && theme === 'dark') || theme === undefined),
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
	{...$$restProps}
	{...attrs}
	style:width={widthInner}
	style:height={heightInner}
	on:mouseenter={onMouseenter}
	on:mouseleave={onMouseleave}
	on:click={onClick}
></span>
