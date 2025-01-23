<script lang="ts">
	import { menuKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { ClickEvtPa, KMenuProps, SelectEvtPa } from './types';
	import { createEventDispatcher, getContext, setContext } from 'svelte';
	import { createKMenu, transitionIn, transitionOut } from './utils';
	export let triggerSubMenuAction: KMenuProps['triggerSubMenuAction'] = 'hover';
	export let subMenuCloseDelay: KMenuProps['subMenuCloseDelay'] = 100;
	export let subMenuOpenDelay: KMenuProps['subMenuOpenDelay'] = 0;
	export let inlineIndent: KMenuProps['inlineIndent'] = 24;
	export let expandIcon: KMenuProps['expandIcon'] = '';
	export let mode: KMenuProps['mode'] = 'vertical';
	export let cls: KMenuProps['cls'] = undefined;
	export let attrs: KMenuProps['attrs'] = {};
	export let selectedUids: KMenuProps['selectedUids'] = [];
	export let openUids: KMenuProps['openUids'] = [];
	export let show: KMenuProps['show'] = true;
	export let multiple: KMenuProps['multiple'] = false;
	export let selectable: KMenuProps['selectable'] = true;
	export let inlineCollapsed: KMenuProps['inlineCollapsed'] = false;
	export let ctxKey: KMenuProps['ctxKey'] = '';
	export let theme: KMenuProps['theme'] = undefined;
	const dispatch = createEventDispatcher();
	function onOpenChange(openUids: string[]) {
		dispatch('openChange', openUids);
	}

	function onSelect(data: SelectEvtPa) {
		dispatch('select', data);
	}

	function onClick(data: ClickEvtPa) {
		dispatch('click', data);
	}

	function onDeSelect(data: SelectEvtPa) {
		dispatch('deSelect', data);
	}

	let bdBg = 'transparent';
	function removeBorderStyleBg() {
		bdBg = '';
	}

	let menuRef: null | HTMLElement = null;
	function getParentDom() {
		if (menuRef) {
			return menuRef.parentElement;
		}
	}

	let resolveMode = mode;
	$: {
		resolveMode = inlineCollapsed && mode !== 'horizontal' ? 'vertical' : mode;
	}
	/**
	 * @internal
	 */
	const menuInst = createKMenu(
		{
			inlineCollapsed,
			triggerSubMenuAction,
			subMenuCloseDelay,
			subMenuOpenDelay,
			expandIcon,
			mode: inlineCollapsed && mode !== 'horizontal' ? 'vertical' : mode,
			inlineIndent,
			openUids,
			selectedUids,
			multiple,
			theme,
			selectable,
			attrs,
			ctxKey
		},
		onOpenChange,
		onSelect,
		onClick,
		onDeSelect,
		removeBorderStyleBg,
		getParentDom
	);
	const setContextFn = () => {
		if (!getContext(ctxKey || menuKey)) {
			setContext(ctxKey || menuKey, menuInst);
		}
	};
	setContextFn();
	$: {
		menuInst.__propHandleEvtMap.forEach((cb) => {
			const props = {
				inlineCollapsed,
				triggerSubMenuAction,
				subMenuCloseDelay,
				subMenuOpenDelay,
				expandIcon,
				mode: resolveMode,
				inlineIndent,
				openUids,
				theme,
				multiple,
				selectedUids,
				selectable,
				attrs,
				ctxKey
			};
			menuInst.__dynamicProps = props;
			setContextFn();
			cb(props);
		});
	}

	const prefixCls = getPrefixCls('menu');
	$: cnames = clsx(
		prefixCls,
		`${prefixCls}-${mode}`,
		{
			[`${prefixCls}__dark`]: theme === 'dark' || theme === undefined,
			[`${prefixCls}-${mode}__dark`]: theme === 'dark' || theme === undefined
		},
		cls
	);
	$: darkCls = clsx('overflow-hidden', { dark: theme === 'dark' });
</script>

{#if show}
	<div class={darkCls} bind:this={menuRef} role="menu">
		<ul
			class={cnames}
			style:border-color={bdBg}
			style:transition="height 0.3s"
			in:transitionIn
			out:transitionOut
			{...$$restProps}
			{...attrs}
		>
			<slot />
		</ul>
	</div>
{/if}
