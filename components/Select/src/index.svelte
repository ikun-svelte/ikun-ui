<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher } from 'svelte';
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import type { KSelectProps } from './types';

	export let iconPrefix: KSelectProps['iconPrefix'] = '';
	export let iconSuffix: KSelectProps['iconSuffix'] = '';
	export let value: KSelectProps['value'] = '';
	export let cls: KSelectProps['cls'] = undefined;
	export let placeholder: KSelectProps['placeholder'] = '';
	export let disabled: KSelectProps['disabled'] = false;
	export let attrs: KSelectProps['attrs'] = {};
	// updateValue
	const dispatch = createEventDispatcher();
	const handleSelect = (e: Event) => {
		if (disabled) return;
		dispatch('updateValue', (e.target as HTMLSelectElement).value);
	};

	// class names
	const prefixCls = getPrefixCls('select');
	$: cnames = clsx(
		`${prefixCls}--base`,
		`${prefixCls}--base__dark`,
		`${prefixCls}__hover`,
		`${prefixCls}__focus`,
		{
			[`${prefixCls}--base__disabled__dark`]: disabled
		},
		cls
	);
	$: selectCls = clsx(`${prefixCls}--inner`, `${prefixCls}--inner__dark`, {
		[`${prefixCls}--base__disabled`]: disabled,
		[`${prefixCls}--base__disabled__dark`]: disabled
	});
	const prefixIconCls = `${prefixCls}--prefix`;
	const suffixIconCls = `${prefixCls}--suffix`;

	// TODO popover 最小宽度与 输入框一致
</script>

<KPopover
		trigger="click"
		placement="bottom" cls="w-full"
		containerWidth="initial">
	<div {...attrs} class={cnames} slot="triggerEl">
	<slot name="prefix">
		{#if iconPrefix}
			<KIcon icon={iconPrefix} cls={prefixIconCls} />
		{/if}
	</slot>
	<!--<select bind:value {disabled} on:change={handleSelect} class={selectCls}>
		{#if placeholder}
			<option value="" disabled hidden>
				{placeholder}
			</option>
		{/if}
		<slot />
	</select>-->
	<input
			class="k-select--inner"
			readonly
			{value}
			{disabled}
			{placeholder}
	/>
	<slot name="suffix">
		{#if iconSuffix}
			<KIcon icon={iconSuffix} cls={suffixIconCls} />
		{/if}
	</slot>
</div>
	<div slot="contentEl">
		  <slot/>
	</div>
</KPopover>
<style>
	.k-select--inner{
		--at-apply: w-full h-full;
	}
</style>
