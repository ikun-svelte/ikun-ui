<script lang="ts">
	import { getPrefixCls, tabsKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTabsPaneProps } from './types';
	import { getContext } from 'svelte';

	export let disabled: KTabsPaneProps['disabled'] = false;
	export let label: KTabsPaneProps['label'] = '';
	export let uid: KTabsPaneProps['uid'] = '';
	export let closeable: KTabsPaneProps['closeable'] = false;
	export let cls: KTabsPaneProps['cls'] = '';
	export let attrs: KTabsPaneProps['attrs'] = {};

	const ctx = getContext(tabsKey);
	ctx.setTabsHeader({ uid, label });
	let show = false;
	function isShow(v: string | number) {
		show = v === uid;
	}
	ctx.registerTabsShowEvt(uid, isShow);
	isShow(ctx.value);

	const prefixCls = getPrefixCls('tab-pane');
	$: cnames = clsx(prefixCls, {}, cls);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
	{#if show}
		<slot />
	{/if}
</div>
