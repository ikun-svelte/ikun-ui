<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, onMount } from "svelte";
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import type { KSelectProps } from './types';

	export let iconPrefix: KSelectProps['iconPrefix'] = '';
	export let iconSuffix: KSelectProps['iconSuffix'] = '';
	export let value: KSelectProps['value'] = '';
	export let cls: KSelectProps['cls'] = undefined;
	export let clsTrigger: KSelectProps['cls'] = undefined;
	export let placeholder: KSelectProps['placeholder'] = '';
	export let disabled: KSelectProps['disabled'] = false;
	export let attrs: KSelectProps['attrs'] = {};
	// updateValue
	const dispatch = createEventDispatcher();
	const handleSelect = (e: Event) => {
		if (disabled) return;
		dispatch('updateValue', (e.target as HTMLSelectElement).value);
	};

	let inputSelectRef: HTMLInputElement | null = null
	let popoverWidth:undefined | string = undefined
	let triggerWidth:undefined | string = undefined
	// set popover's trigger and content dom width
	const setPopoverW = () => {
		if(inputSelectRef){
			const { width } = inputSelectRef.getBoundingClientRect();
			const { marginRight, marginLeft } = window.getComputedStyle(inputSelectRef);
			triggerWidth = `${width + parseInt(marginRight, 10) + parseInt(marginLeft, 10)}px`
			popoverWidth = `${width}px`
		}
	}

	onMount(() => {
		setPopoverW()
	})


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


</script>

<KPopover
		trigger="click"
		clsTrigger={clsTrigger}
		width={triggerWidth}
		placement="bottom">
	<div {...attrs} class={cnames} slot="triggerEl" bind:this={inputSelectRef}>
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
				class={selectCls}
				readonly
				{value}
				{disabled}
				{placeholder}/>
		<slot name="suffix">
			{#if iconSuffix}
				<KIcon icon={iconSuffix} cls={suffixIconCls} />
			{/if}
		</slot>
  </div>
	<div slot="contentEl" style:width="{popoverWidth}">
		  <slot/>
	</div>
</KPopover>
