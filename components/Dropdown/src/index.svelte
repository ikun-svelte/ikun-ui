<script lang="ts">
	import { buttonGroupKey, dropDownKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KDropdownProps } from './types';
	import { KPopover } from '@ikun-ui/popover';
	import { createEventDispatcher, setContext } from 'svelte';

	export let placement: KDropdownProps['placement'] = 'bottom';
	// hover click manual
	export let trigger: KDropdownProps['trigger'] = 'hover';
	export let disabled: KDropdownProps['disabled'] = false;
	export let tabindex: KDropdownProps['tabindex'] = 0;
	export let role: KDropdownProps['role'] = 'menu';
	export let maxHeight: KDropdownProps['maxHeight'] = undefined;
	export let hideOnClick: KDropdownProps['hideOnClick'] = true;
	export let cls: KDropdownProps['cls'] = undefined;
	export let attrs: KDropdownProps['attrs'] = {};

	setContext(buttonGroupKey, {
		disabled
	});
	let cbList = [] as Array<(isDisabled: boolean) => void>;
	setContext(dropDownKey, {
		disabledEvt: cbList,
		commandEvt: handleCommand
	});
	$: {
		if (cbList.length) {
			cbList.forEach((cb) => {
				cb(disabled);
			});
		}
	}

	let popoverRef: any = null;
	/**
	 * @public
	 * api handleOpen
	 */
	export function handleOpen() {
		popoverRef.updateShow(true);
	}

	/**
	 * @public
	 * api handleClose
	 */
	export function handleClose() {
		popoverRef.updateShow(false);
	}

	const dispatch = createEventDispatcher();
	function handleCommand(value: number | string | Record<any, any>) {
		if (disabled) return;
		if (hideOnClick) handleClose();
		dispatch('command', value);
	}
	function onChange(value: CustomEvent) {
		dispatch('change', value.detail);
	}

	const prefixCls = getPrefixCls('dropdown');
	$: cnames = clsx(prefixCls, cls);
	$: itmeCls = clsx(`${prefixCls}-item-container`, 'ikun-scroll-bar');
</script>

<KPopover
	{trigger}
	{disabled}
	bind:this={popoverRef}
	clsTrigger={cls}
	cls="px-0"
	on:change={onChange}
	arrow={false}
	{placement}
>
	<button class={cnames} {...$$restProps} {role} {tabindex} {...attrs} slot="triggerEl">
		<slot />
	</button>
	<div slot="contentEl" class={itmeCls} style:max-height={maxHeight}>
		<slot name="dropdown" />
	</div>
</KPopover>

<style>
	:global(.ikun-scroll-bar::-webkit-scrollbar-track-piece) {
		background: transparent;
	}

	:global(.ikun-scroll-bar::-webkit-scrollbar) {
		width: 6px;
	}

	:global(.ikun-scroll-bar::-webkit-scrollbar-thumb) {
		background: var(--ikun-light-800);
		border-radius: 20px;
	}
</style>
