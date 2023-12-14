<script lang="ts">
	import { getPrefixCls, tabsKey } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KTabContext, KTabsPaneProps } from "./types";
	import { getContext } from 'svelte';

	export let uid: KTabsPaneProps['uid'] = '';
	export let cls: KTabsPaneProps['cls'] = '';
	export let attrs: KTabsPaneProps['attrs'] = {};

	const ctx = getContext(tabsKey) as KTabContext;
	let show = false;
	function isShow(v: string | number) {
		show = v === uid;
	}
	ctx.registerTabsShowEvt(uid, isShow);
	isShow(ctx.value);

	const prefixCls = getPrefixCls('tab-pane');
	$: cnames = clsx(prefixCls, {}, cls);
</script>
{#if show}
	<div class={cnames} {...$$restProps} {...attrs} role="tabpanel">
			<slot />
	</div>
{/if}
