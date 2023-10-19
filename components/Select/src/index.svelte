<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { createEventDispatcher, onMount } from 'svelte';
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import KOption from './option.svelte';
	import type { KSelectProps } from './types';
	import {isObject, isString} from "baiwusanyu-utils";

	export let iconPrefix: KSelectProps['iconPrefix'] = '';
	export let iconSuffix: KSelectProps['iconSuffix'] = '';
	export let value: KSelectProps['value'] = '';
	export let cls: KSelectProps['cls'] = undefined;
	export let clsTrigger: KSelectProps['cls'] = undefined;
	export let placeholder: KSelectProps['placeholder'] = '';
	export let disabled: KSelectProps['disabled'] = false;
	export let attrs: KSelectProps['attrs'] = {};

	export let labelKey: string = 'label';
	export let valueKey: string = 'value';
	export let dataList: Array<Record<string, any>> = [];
	export let maxHeight: string = '250px';
	export let clearable: boolean = false

	// updateValue
	const dispatch = createEventDispatcher();
	let popoverRef: any = null;
	const handleSelect = (data: KSelectProps['value'] | undefined) => {
		if (disabled) return;
		dispatch('updateValue', data);
		popoverRef.updateShow(false);
	};

	// set popover's trigger and content dom width
	let inputSelectRef: HTMLElement | null = null;
	let popoverWidth: undefined | string = undefined;
	let triggerWidth: undefined | string = undefined;
	const setPopoverW = () => {
		if (inputSelectRef) {
			const { width } = inputSelectRef.getBoundingClientRect();
			const { marginRight, marginLeft } = window.getComputedStyle(inputSelectRef);
			triggerWidth = `${width + parseInt(marginRight, 10) + parseInt(marginLeft, 10)}px`;
			popoverWidth = `${width}px`;
		}
	};
	onMount(() => {
		setPopoverW();
	});

	const getLabel = (item: KSelectProps['value']) => {
		if(isObject(item)){
			const label = item[labelKey as keyof typeof item] || ''
			return label.toString()
		}
		return item.toString()
	}
	const isActive = (item: KSelectProps['value']) => {
		if(isObject(item)){
			return item[valueKey as keyof typeof item] === value[valueKey as keyof typeof value]
		}
		return item  === value
	}

	// clear value
	let isShowClear = false
	const showClearIcon = (show: boolean) => {
		getLabel(value) && (isShowClear = show)
	}
	const handleClear = (e: MouseEvent) => {
		e.stopPropagation()
		handleAnimation()
		if(isObject(value)){
			handleSelect({})
		} else if(isString(value)){
			handleSelect('')
		} else {
			handleSelect(undefined)
		}
	}

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
	const clearIconCls = clsx(
			`${prefixCls}--clear`,
			`${prefixCls}--clear__hover`,
	)

	// clear icon animation
	let animationCls = '';
	function handleAnimation() {
		animationCls = `${prefixCls}--clear__animate rounded-full`;
		setTimeout(() => {
			animationCls = '';
		}, 300);
	};

	// TODO 禁用 unit test
	// TODO 自定义内容渲染
	// TODO 展开图标动画
	// TODO 可清除 unit test
	// TODO 虚拟列表
	// TODO 展开定位

	// ⭕TODO 选项分组
	// ⭕TODO 基础多选
	// ⭕TODO 多选最大显示

	// ⭕TODO 选项筛选
	// ⭕TODO 远程搜索

	// ⭕ TODO dark mode
</script>

<KPopover
	trigger="click"
	bind:this={popoverRef}
	{clsTrigger}
	cls="px-0"
	width={triggerWidth}
	placement="bottom"
>
	<div {...attrs}
		 class={cnames}
		 slot="triggerEl"
		 aria-hidden="true"
		 on:mouseenter={()=> showClearIcon(true)}
		 on:mouseleave={()=> showClearIcon(false)}
		 bind:this={inputSelectRef}>
		<slot name="prefix">
			{#if iconPrefix}
				<KIcon icon={iconPrefix} cls={prefixIconCls} width="auto" height="auto"/>
			{/if}
		</slot>
		<input class={selectCls} readonly value={getLabel(value)} {disabled} {placeholder} />
		<slot name="suffix">
			{#if iconSuffix}
				<KIcon icon={iconSuffix} cls={suffixIconCls} width="auto" height="auto"/>
			{/if}
		</slot>
		{#if clearable && isShowClear}
			<div on:click={handleClear} aria-hidden="true" class="{animationCls}">
				<KIcon icon='i-carbon-close-outline'
					   cls="{clearIconCls}"
					   width="auto"
					   height="auto"/>
			</div>
		{/if}
	</div>
	<div slot="contentEl"
		 class="ikun-scroll-bar"
		 style:overflow-y="auto"
		 style:width={popoverWidth}
		 style:max-height="{maxHeight}">
		{#if $$slots.default}
			<slot />
		{:else}
			{#each dataList as item (item[valueKey] || item)}
				<KOption label={getLabel(item)}
						 isActive={isActive(item)}
						 on:click={() => handleSelect(item)}>
				</KOption>
			{/each}
		{/if}
	</div>
</KPopover>
<style>
	.ikun-scroll-bar::-webkit-scrollbar-track-piece {
		background: transparent;
	}

	.ikun-scroll-bar::-webkit-scrollbar {
		width: 6px;
	}

	.ikun-scroll-bar::-webkit-scrollbar-thumb {
		background: var(--ikun-light-800);
		border-radius: 20px;
	}
</style>
