<script lang="ts">
	import type { KBreadcrumbItemPropsPropsInner } from './types';
	import { getContext } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { getPrefixCls, BreadcrumbKey } from '@ikun-ui/utils';
	import { clsx, type ClassValue } from 'clsx';

	export let href: string = '';
	export let cls: ClassValue = '';
	export let attrs: Record<string, string> = {};

	const breadcrumbProps = getContext<KBreadcrumbItemPropsPropsInner>(BreadcrumbKey) || {};
	const { separator = '/', separatorIcon = '' } = breadcrumbProps;

	// class names
	const prefixCls = getPrefixCls('breadcrumb-item');
	$: itemCls = clsx(prefixCls, cls);
	$: linkCls = clsx(`${prefixCls}-content`, `${prefixCls}-content__dark`, {
		[`${prefixCls}-link`]: !!href
	});
	$: separatorCls = clsx(`${prefixCls}-separator`, `${prefixCls}-separator__dark`);
</script>

<span class={itemCls} {...$$restProps} {...attrs}>
	<svelte:element this={href ? 'a' : 'span'} class={linkCls} {href}>
		<slot />
	</svelte:element>
	{#if separatorIcon}
		<KIcon cls={separatorCls} icon={separatorIcon} width="14px" height="14px"></KIcon>
	{:else}
		<span class={separatorCls}>{separator}</span>
	{/if}
</span>
