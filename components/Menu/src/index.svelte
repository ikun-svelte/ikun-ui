<script lang="ts">
	import { menuKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KMenuProps } from './types';
	import { setContext } from 'svelte';
	import { createKMenu } from "./utils";
	export let triggerSubMenuAction: KMenuProps['triggerSubMenuAction'] = 'hover';
	export let subMenuCloseDelay: KMenuProps['subMenuCloseDelay'] = 100;
	export let subMenuOpenDelay: KMenuProps['subMenuOpenDelay'] = 0;
	export let inlineIndent: KMenuProps['inlineIndent'] = 24
	export let expandIcon: KMenuProps['expandIcon'] = 'i-carbon-chevron-down';
	export let overflowedIndicator: KMenuProps['overflowedIndicator'] =
		'i-carbon-overflow-menu-horizontal';
	export let mode: KMenuProps['mode'] = 'vertical';
	export let cls: KMenuProps['cls'] = undefined;
	export let attrs: KMenuProps['attrs'] = {};

	const menuInst = createKMenu({
		triggerSubMenuAction,
		subMenuCloseDelay,
		subMenuOpenDelay,
		expandIcon,
		overflowedIndicator,
		mode,
		inlineIndent,
		cls,
		attrs,
	})
	setContext(menuKey, menuInst);
	$: {
		menuInst.__propHandleEvtMap.forEach((cb) => {
			cb({
				triggerSubMenuAction,
				subMenuCloseDelay,
				subMenuOpenDelay,
				expandIcon,
				overflowedIndicator,
				mode,
				inlineIndent,
				cls,
				attrs,
			});
		});
	}

	const prefixCls = getPrefixCls('menu');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}-${mode}`,
		cls
	);
</script>

<ul class={cnames} {...$$restProps} {...attrs}>
	<slot/>
</ul>
