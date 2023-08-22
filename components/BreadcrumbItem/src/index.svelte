<script lang="ts">
	import { getContext } from 'svelte';
	import { KIcon } from '@ikun-ui/icon';
	import { getPrefixCls, createCls, KBreadcrumbKey } from '@ikun-ui/utils';

	export let href: string = '';
	export let cls: string = '';
	export let attrs: Record<string, string> = {};

	const { separator = '/', separatorIcon = '' } = getContext(KBreadcrumbKey) || {};

	// class names
	const prefixCls = getPrefixCls('breadcrumb-item');
	$: itemCls = createCls(prefixCls, cls);
	$: linkCls = createCls(`${prefixCls}-content`, `${prefixCls}-content__dark`, {
		[`${prefixCls}-link`]: !!href
	});
	$: separatorCls = createCls(`${prefixCls}-separator`, `${prefixCls}-separator__dark`);
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
