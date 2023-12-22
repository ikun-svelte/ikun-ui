<script lang="ts">
	import { dropDownKey, getPrefixCls } from '@ikun-ui/utils';
	import { clsx } from 'clsx';
	import type { KDropdownCtx, KDropdownItemProps } from './types';
	import { getContext } from 'svelte';

	export let disabled: KDropdownItemProps['disabled'] = false;
	export let divider: KDropdownItemProps['divider'] = false;
	export let command: KDropdownItemProps['command'] = '';
	export let cls: KDropdownItemProps['cls'] = undefined;
	export let attrs: KDropdownItemProps['attrs'] = {};

	const dropdownCtx = getContext(dropDownKey) as KDropdownCtx;
	const handleClick = () => {
		if (disabled) return;
		if (dropdownCtx) {
			dropdownCtx.commandEvt(command);
		}
	};
	const prefixCls = getPrefixCls('dropdown-item');
	$: cnames = clsx(
		prefixCls,
		{
			[`${prefixCls}--base`]: !disabled && !divider,
			[`${prefixCls}--base__dark`]: !disabled && !divider,
			[`${prefixCls}__disabled`]: disabled && !divider,
			[`${prefixCls}__disabled__dark`]: disabled && !divider,
			[`${prefixCls}__divider`]: divider
		},
		cls
	);
</script>

<div
	class={cnames}
	aria-hidden="true"
	data-testid="k_dropdown__item"
	on:click={handleClick}
	{...$$restProps}
	{...attrs}
>
	{#if !divider}
		<slot />
	{/if}
</div>
