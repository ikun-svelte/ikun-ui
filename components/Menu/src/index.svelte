<script lang="ts">
    import { contextmenuKey, getPrefixCls}  from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KMenuProps } from './types';
    import {setContext} from "svelte";
    export let triggerSubMenuAction: KMenuProps['triggerSubMenuAction'] = 'hover';
    export let subMenuCloseDelay: KMenuProps['subMenuCloseDelay'] = 100;
    export let subMenuOpenDelay: KMenuProps['subMenuOpenDelay'] = 0;
    export let items: KMenuProps['items'] = [];
    export let expandIcon: KMenuProps['expandIcon'] = 'i-carbon-chevron-down';
    export let overflowedIndicator: KMenuProps['overflowedIndicator'] = 'i-carbon-overflow-menu-horizontal';
    export let mode: KMenuProps['mode'] = 'vertical';
	export let cls: KMenuProps['cls'] = undefined;
	export let attrs: KMenuProps['attrs'] = {};

    setContext('k-menu', {
        items: () => items
    });
	const prefixCls = getPrefixCls('menu');
	$: cnames = clsx(
		prefixCls,
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
    {#if mode !== 'horizontal'}
        <slot></slot>
    {/if}
</div>
