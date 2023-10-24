<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { KVirtualList } from '@ikun-ui/virtual-list';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import { clsx } from 'clsx';
	import { getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import KOption from './option.svelte';
	import type { KSelectProps } from './types';
	import { isObject, isString, isNumber } from 'baiwusanyu-utils';

	export let iconPrefix: KSelectProps['iconPrefix'] = '';
	export let iconSuffix: KSelectProps['iconSuffix'] = '';
	export let value: KSelectProps['value'] = '';
	export let cls: KSelectProps['cls'] = undefined;
	export let placeholder: KSelectProps['placeholder'] = '';
	export let disabled: KSelectProps['disabled'] = false;
	export let attrs: KSelectProps['attrs'] = {};

	export let labelKey: string = 'label';
	export let valueKey: string = 'value';
	export let fitInputWidth: boolean = false;
	export let key: string = 'id';
	export let dataList: Array<Record<string, any>> = [];
	export let maxHeight: number = 250;
	export let clearable: boolean = false;

	let valueType: 'o' | 'n' | 's' = 'o';
	const wrapperData = <T,>(v: T) => {
		if (isString(v)) {
			valueType = 's';
			return {
				[labelKey]: v,
				[valueKey]: v,
				[key]: v
			};
		}
		if (isNumber(v)) {
			valueType = 'n';
			return {
				[labelKey]: v,
				[valueKey]: v,
				[key]: v
			};
		}
		return v;
	};
	let dataListInner = dataList.map(wrapperData);
	$: {
		dataListInner = dataList.map(wrapperData);
	}

	// updateValue
	const dispatch = createEventDispatcher();
	let popoverRef: any = null;
	const handleSelect = (data: KSelectProps['value'] | null) => {
		if (disabled) return;
		if (data && (valueType === 'n' || valueType === 's')) {
			dispatch('updateValue', data[valueKey as keyof typeof data]);
		} else if (
			(!data && (valueType === 'n' || valueType === 's')) ||
			(valueType === 'o' && isObject(data))
		) {
			dispatch('updateValue', data);
		}
		popoverRef.updateShow(false);
	};

	// set popover's trigger and content dom width
	let inputSelectRef: HTMLElement | null = null;
	let popoverWidth: undefined | string = undefined;
	let triggerWidth: undefined | string = undefined;
	const setPopoverW = () => {
		if (inputSelectRef) {
			const { width: inputSelectRefWidth } = inputSelectRef.getBoundingClientRect();
			triggerWidth = `${inputSelectRefWidth}px`;
			popoverWidth = fitInputWidth ? `${inputSelectRefWidth}px` : undefined;
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
		return item as string;
	};
	const isActive = (item: KSelectProps['value']) => {
		if (valueType === 'o') {
			return item[valueKey as keyof typeof item] === value[valueKey as keyof typeof value];
		}
		return item[valueKey as keyof typeof item] === value;
	};

	// clear value
	let isShowClear = false;
	const showClearIcon = (show: boolean) => {
		if (disabled) return;
		if (show) {
			getLabel(value) && (isShowClear = show);
		} else {
			isShowClear = show;
		}
	};
	const handleClear = (e: MouseEvent) => {
		e.stopPropagation();
		handleAnimation();
		if (valueType === 'o') {
			handleSelect({});
		} else if (valueType === 's') {
			handleSelect('');
		} else {
			handleSelect(null);
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
		for (let i = 0; i < dataListInner.length; i++) {
			if (isActive(dataListInner[i])) {
				vListRef && vListRef.scrollToIndex(i - 3);
				break;
			}
		}
	}

	// class names
	const prefixCls = getPrefixCls('select');
	$: cnames = clsx(`${prefixCls}--base`, `${prefixCls}__hover`, `${prefixCls}__focus`, {
		[`${prefixCls}--base__disabled`]: disabled,
		[`${prefixCls}--base__dark`]: !disabled,
		[`${prefixCls}--base__disabled__dark`]: disabled
	});
	$: selectCls = clsx(
		`
	${prefixCls}--inner`,
		{
			[`${prefixCls}--inner__dark`]: !disabled,
			[`${prefixCls}--base__disabled`]: disabled,
			[`${prefixCls}--base__disabled__dark`]: disabled,
			[`${prefixCls}--inner__disabled__dark`]: disabled
		}
	);
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

	// TODO 自定义内容渲染  unit test
	// TODO 展开定位 unit test
	// TODO string[] 和 number[] 支持 virtual list unit test
	// TODO fitInputWidth 宽度(超宽省略号，觸發寬度) unit test

	// ⭕TODO 选项分组
	// ⭕TODO 基础多选
	// ⭕TODO 多选最大显示

	// ⭕TODO 选项筛选
	// ⭕TODO 远程搜索
</script>

<KPopover
	trigger="click"
	bind:this={popoverRef}
	{disabled}
	clsTrigger={cls}
	cls="px-0"
	arrow={false}
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
			<div on:click={handleClear} aria-hidden="true" class={animationCls} data-k-select-clear>
				<KIcon icon="i-carbon-close-outline" cls={selectIconCls} width="16px" height="16px" />
			</div>
		{:else}
			<KIcon icon={expendIcon} cls={selectIconCls} width="16px" height="16px" />
		{/if}
	</div>
	<div
		slot="contentEl"
		bind:this={popoverModalRef}
		style:overflow-y="auto"
		style:width={popoverWidth}
		style:min-width={triggerWidth}
		style:height={heightInner}
		style:max-height={`${maxHeight}px`}
	>
		<KVirtualList
			data={dataListInner}
			{key}
			bind:this={vListRef}
			estimateSize={30}
			let:data
			cls="ikun-scroll-bar"
		>
			{#if !$$slots.default}
				<KOption
					{fitInputWidth}
					label={getLabel(data)}
					isActive={isActive(data)}
					on:click={() => handleSelect(data)}
				></KOption>
			{:else}
				<slot {data} onSelect={handleSelect} label={getLabel(data)} isActive={isActive(data)} />
			{/if}
		</KVirtualList>
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
