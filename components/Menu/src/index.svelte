<script lang="ts">
	import { getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KMenuProps } from './types';
    export let triggerSubMenuAction: KMenuProps['triggerSubMenuAction'] = 'hover';
    export let subMenuCloseDelay: KMenuProps['subMenuCloseDelay'] = 100;
    export let subMenuOpenDelay: KMenuProps['subMenuOpenDelay'] = 0;
    export let items: KMenuProps['items'] = [];
    export let expandIcon: KMenuProps['expandIcon'] = 'i-carbon-chevron-down';
    export let overflowedIndicator: KMenuProps['overflowedIndicator'] = 'i-carbon-overflow-menu-horizontal';
    export let mode: KMenuProps['mode'] = 'vertical';
	export let cls: KMenuProps['cls'] = undefined;
	export let attrs: KMenuProps['attrs'] = {};

	const prefixCls = getPrefixCls('menu');
	$: cnames = clsx(
		prefixCls,
		cls
	);
</script>

<div class={cnames} {...$$restProps} {...attrs}>
    {#if mode !== 'horizontal'}
        {#each items as item, index (item.uid)}
            <div>
                {item.uid}
            </div>
        {/each}
    {/if}
</div>
