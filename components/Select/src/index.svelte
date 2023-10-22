<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { KVirtualList } from '@ikun-ui/virtual-list';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import KOption from './option.svelte';
	import type { KSelectProps } from './types';
	import { isObject, isString } from 'baiwusanyu-utils';

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
	export let key: string = 'id';
	export let dataList: Array<Record<string, any>> = [];
	export let maxHeight: number = 250;
	export let clearable: boolean = false;

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
		if (isObject(item)) {
			const label = item[labelKey as keyof typeof item] || '';
			return label.toString();
		}
		return item.toString();
	};
	const isActive = (item: KSelectProps['value']) => {
		if (isObject(item)) {
			return item[valueKey as keyof typeof item] === value[valueKey as keyof typeof value];
		}
		return item === value;
	};

	// clear value
	let isShowClear = false;
	const showClearIcon = (show: boolean) => {
		if (show) {
			getLabel(value) && (isShowClear = show);
		} else {
			isShowClear = show;
		}
	};
	const handleClear = (e: MouseEvent) => {
		e.stopPropagation();
		handleAnimation();
		if (isObject(value)) {
			handleSelect({});
		} else if (isString(value)) {
			handleSelect('');
		} else {
			handleSelect(undefined);
		}
	};

	function onOpen(e: CustomEvent) {
		handleExpend(e);
		if (e.detail) {
			setVList();
		}
	}

	// expend icon
	let expendIcon = 'i-carbon-chevron-down ';
	function handleExpend(e: CustomEvent) {
		expendIcon = e.detail ? 'i-carbon-chevron-down rotate-180' : 'i-carbon-chevron-down';
	}

	// set virtual list height and locate item
	let popoverModalRef: HTMLElement | null = null;
	let vListRef: any = null;
	let heightInner = 'initial';
	async function setVList() {
		await tick();
		if (popoverModalRef) {
			const container = popoverModalRef.childNodes[0];
			if (container) {
				const { height } = (container as HTMLElement).children[0].getBoundingClientRect();
				if (height > maxHeight) {
					heightInner = `${maxHeight}px`;
					await tick();
					vListRef && locateItem();
				}
			}
		}
	}

	async function locateItem() {
		for (let i = 0; i < dataList.length; i++) {
			if (isActive(dataList[i])) {
				vListRef && vListRef.scrollToIndex(i - 3);
				break;
			}
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
	const selectIconCls = clsx(`${prefixCls}--icon`);

	// clear icon animation
	let animationCls = '';
	function handleAnimation() {
		animationCls = `${prefixCls}--clear__animate rounded-full`;
		setTimeout(() => {
			animationCls = '';
		}, 300);
	}

	// TODO 禁用 unit test
	// TODO 自定义内容渲染 🎯 unit test
	// TODO 可清除 unit test
	// TODO 虚拟列表 unit test
	// TODO 展开定位 unit test
	// TODO 🎯 string[] 和 number[] 支持 virtual list
	// TODO 宽度 🎯 unit test

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
	on:change={onOpen}
	width={triggerWidth}
	placement="bottom"
>
	<div
		{...attrs}
		class={cnames}
		slot="triggerEl"
		aria-hidden="true"
		on:mouseenter={() => showClearIcon(true)}
		on:mouseleave={() => showClearIcon(false)}
		bind:this={inputSelectRef}
	>
		<slot name="prefix">
			{#if iconPrefix}
				<KIcon icon={iconPrefix} cls={prefixIconCls} width="auto" height="auto" />
			{/if}
		</slot>
		<input class={selectCls} readonly value={getLabel(value)} {disabled} {placeholder} />
		<slot name="suffix">
			{#if iconSuffix}
				<KIcon icon={iconSuffix} cls={suffixIconCls} width="auto" height="auto" />
			{/if}
		</slot>
		{#if clearable && isShowClear}
			<div on:click={handleClear} aria-hidden="true" class={animationCls}>
				<KIcon icon="i-carbon-close-outline" cls={selectIconCls} width="16px" height="16px" />
			</div>
		{:else}
			<KIcon icon={expendIcon} cls={selectIconCls} width="16px" height="16px" />
		{/if}
	</div>
	<div
		slot="contentEl"
		class="ikun-scroll-bar"
		bind:this={popoverModalRef}
		style:overflow-y="auto"
		style:width={popoverWidth}
		style:height={heightInner}
		style:max-height={`${maxHeight}px`}
	>
		{#if $$slots.default}
			<slot />
		{:else}
			<KVirtualList
				data={dataList}
				{key}
				bind:this={vListRef}
				estimateSize={30}
				let:data
				cls="ikun-scroll-bar"
			>
				<KOption
					label={getLabel(data)}
					isActive={isActive(data)}
					on:click={() => handleSelect(data)}
				></KOption>
			</KVirtualList>
		{/if}
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
