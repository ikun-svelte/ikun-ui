<script lang="ts">
	import { menuKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KMenuProps } from "./types";
	import { getContext, setContext } from "svelte";
	import { createKMenu, transitionIn, transitionOut } from './utils';
	export let triggerSubMenuAction: KMenuProps['triggerSubMenuAction'] = 'hover';
	export let subMenuCloseDelay: KMenuProps['subMenuCloseDelay'] = 100;
	export let subMenuOpenDelay: KMenuProps['subMenuOpenDelay'] = 0;
	export let inlineIndent: KMenuProps['inlineIndent'] = 24;
	export let expandIcon: KMenuProps['expandIcon'] = 'i-carbon-chevron-down';
	export let mode: KMenuProps['mode'] = 'vertical';
	export let cls: KMenuProps['cls'] = undefined;
	export let attrs: KMenuProps['attrs'] = {};
	export let selectedUids: KMenuProps['selectedUids'] = [];
	export let openUids: KMenuProps['openUids'] = [];
	export let show: KMenuProps['show'] = true;

	/**
	 * @internal
	 */
	const menuInst = createKMenu({
		triggerSubMenuAction,
		subMenuCloseDelay,
		subMenuOpenDelay,
		expandIcon,
		mode,
		inlineIndent,
		openUids,
		selectedUids,
		attrs
	});
	if(!getContext(menuKey)){
		setContext(menuKey, menuInst);
	}
	$: {
		menuInst.__propHandleEvtMap.forEach((cb) => {
			cb({
				triggerSubMenuAction,
				subMenuCloseDelay,
				subMenuOpenDelay,
				expandIcon,
				mode,
				inlineIndent,
				openUids,
				selectedUids,
				attrs
			});
		});
	}

	const prefixCls = getPrefixCls('menu');
	$: cnames = clsx(prefixCls, `${prefixCls}-${mode}`, cls);
</script>

{#if show}
	<ul class={cnames}
			style:transition="height 0.3s"
			style:overflow="hidden"
			in:transitionIn out:transitionOut {...$$restProps} {...attrs}>
		<slot />
	</ul>
{/if}
