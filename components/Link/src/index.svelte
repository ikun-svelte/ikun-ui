<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KLinkProps } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';

	export let cls: KLinkProps['cls'] = undefined;
	export let attrs: KLinkProps['attrs'] = {};
	export let href: KLinkProps['href'] = '';
	export let icon: KLinkProps['icon'] = '';
	export let type: KLinkProps['type'] = 'default';
	export let disabled: KLinkProps['disabled'] = false;
	export let underline: KLinkProps['underline'] = true;
	const dispatch = createEventDispatcher();
	function handleClick(event: MouseEvent) {
		if (!disabled) dispatch('click', event);
	}

	$: hrefInner = disabled || !href ? undefined : href;

	const prefixCls = getPrefixCls('link');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}--base`,
		`${prefixCls}--${type}`,
		{
			[`${prefixCls}--${type}__hover`]: !disabled,
			[`k-cur-disabled ${prefixCls}--disabled`]: disabled,
			[`${prefixCls}--underline`]: underline && !disabled,
			[`${prefixCls}--underline__none`]: !underline || disabled
		},
		cls
	);

	$: contentCames = clsx(`${prefixCls}--content`);
</script>

<a
	class={cnames}
	{...$$restProps}
	{...attrs}
	aria-hidden="true"
	href={hrefInner}
	on:click={handleClick}
>
	{#if icon}
		<KIcon {icon} width="auto" height="auto" color="ikun-initial"></KIcon>
	{/if}
	{#if $$slots.default}
		<span class={contentCames}>
			<slot />
		</span>
	{/if}
	{#if $$slots.icon}
		<slot name="icon" />
	{/if}
</a>
