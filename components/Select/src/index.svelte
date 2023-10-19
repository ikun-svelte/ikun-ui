<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, onMount } from "svelte";
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import KOption from './option.svelte';
	import type { KSelectProps } from './types';

	export let iconPrefix: KSelectProps['iconPrefix'] = '';
	export let iconSuffix: KSelectProps['iconSuffix'] = '';
	export let value: KSelectProps['value'] = '';
	export let cls: KSelectProps['cls'] = undefined;
	export let clsTrigger: KSelectProps['cls'] = undefined;
	export let placeholder: KSelectProps['placeholder'] = '';
	export let disabled: KSelectProps['disabled'] = false;
	export let attrs: KSelectProps['attrs'] = {};


	export let labelKey:string = 'label'
	export let valueKey:string = 'value'
	export let dataList:Array<Record<string, any>> = []

	// updateValue
	const dispatch = createEventDispatcher();
	const handleSelect = (e: CustomEvent) => {
		if (disabled) return;
		dispatch('updateValue', e.detail);
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


	// TODO 选项禁用
	// TODO 禁用
	// TODO 选项高亮
	// TODO 支持绑定对象
	// TODO 点击后关闭
	// TODO 自定义内容渲染
	// TODO 前置图标插槽
	// TODO 后置图标插槽
	// TODO 展开图标动画
	// TODO 可清除
	// TODO 最大高度
	// TODO 虚拟列表

	// ⭕TODO 选项分组
	// ⭕TODO 基础多选
	// ⭕TODO 多选最大显示
	// ⭕TODO 选项筛选
	// ⭕TODO 远程搜索
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
		{#if $$slots.default}
			<slot/>
		{:else}
			{#each dataList as item}
				<KOption
					label="{item[labelKey]}"
					value="{item[valueKey]}"
					on:click={handleSelect}>
				</KOption>
			{/each}
		{/if}
	</div>
</KPopover>
