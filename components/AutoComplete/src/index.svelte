<script lang="ts">
	import type { AutoCompleteItems, KAutoCompleteProps } from './types';
	import { createEventDispatcher, tick, getContext, onMount } from 'svelte';
	import { KInput } from '@ikun-ui/input';
	import { formItemKey, formKey, getPrefixCls } from '@ikun-ui/utils';
	import clsx from 'clsx';
	import { isObject } from 'baiwusanyu-utils';
	import type { CSSObject } from 'unocss';
	import type { IKunFormInstance } from '@ikun-ui/form';
	import { KPopover } from '@ikun-ui/popover';
	import { KVirtualList } from '@ikun-ui/virtual-list';
	import KOption from './option.svelte';

	export let size: KAutoCompleteProps['size'] = 'md';
	export let value: KAutoCompleteProps['value'] = '';
	export let placeholder: KAutoCompleteProps['placeholder'] = '';
	export let disabled: KAutoCompleteProps['disabled'] = false;
	export let iconPrefix: KAutoCompleteProps['iconPrefix'] = '';
	export let iconSuffix: KAutoCompleteProps['iconSuffix'] = '';
	export let append: KAutoCompleteProps['append'] = '';
	export let prepend: KAutoCompleteProps['prepend'] = '';
	export let cls: KAutoCompleteProps['cls'] = undefined;
	export let attrs: KAutoCompleteProps['attrs'] = {};
	export let triggerOnFocus: KAutoCompleteProps['triggerOnFocus'] = false;
	export let fetchSuggestions: KAutoCompleteProps['fetchSuggestions'] = undefined;
	export let useCompositionInput: KAutoCompleteProps['useCompositionInput'] = false;

	export let maxHeight: KAutoCompleteProps['maxHeight'] = 250;
	export let fitInputWidth: KAutoCompleteProps['fitInputWidth'] = true;
	/**
	 * @internal
	 */
	export let isError: KAutoCompleteProps['isError'] = false;
	/**
	 * @internal
	 */
	export let center: KAutoCompleteProps['center'] = false;
	export let clearable: KAutoCompleteProps['clearable'] = false;
	// class names
	const prefixCls = getPrefixCls('auto-complete');
	const cname = clsx(prefixCls);
	const dispatch = createEventDispatcher();
	const handleEnter = (e: CustomEvent) => {
		dispatch('enter', e.detail);
	};
	const handleKeydown = (e: CustomEvent) => {
		dispatch('keydown', e.detail);
	};
	const handleChange = (e: CustomEvent) => {
		dispatch('change', e.detail);
	};
	const handleCompositionstart = (e: CustomEvent) => {
		dispatch('compositionstart', e.detail);
	};

	const handleCompositionend = (e: CustomEvent) => {
		dispatch('compositionend', e.detail);
	};

	const handleCompositionInnput = (e: CustomEvent) => {
		dispatch('compositionInput', e.detail);
	};

	const handleTriggerPrepend = (e: CustomEvent) => {
		dispatch('triggerPrepend', e.detail);
	};

	const handleTriggerAppend = (e: CustomEvent) => {
		dispatch('triggerAppend', e.detail);
	};

	// set popover's trigger and content dom width
	let inputSelectRef: HTMLElement | null = null;
	let popoverWidth: undefined | string = undefined;
	let triggerWidth: undefined | string = 'initial';
	let list = [] as Array<Record<string, any>>;
	let text = 'no data';
	const handleInput = async (e: CustomEvent) => {
		curValue = e.detail
		// 根据输入值重新触发 list 更新
		if(isOpen && fetchSuggestions){
			curValue = e.detail
			text = 'loading';
			fetchSuggestions(curValue, (res) => {
				list = res.map((v) => wrapperData(v.value as KAutoCompleteProps['value']));
				setVList();
			});
		}

		if (!triggerOnFocus) {
			isDisabledPopover = false
			await tick()
			popoverRef.updateShow(true);
		}
	};
	let popoverRef: any = null;
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

	// TODO
	let isDisabledPopover = disabled || !triggerOnFocus;
	$: {
		isDisabledPopover = disabled  || !triggerOnFocus;
	}

	let popoverModalRef: HTMLElement | null = null;
	let heightInner = 'initial';
	async function setVList() {
		if(!list.length) {
			text = 'no data';
			return
		}
		await tick();
		if (popoverModalRef) {
			const container = popoverModalRef.childNodes[0];
			if (container) {
				const { height } = (container as HTMLElement).children[0].getBoundingClientRect();
				if (height > maxHeight) {
					heightInner = `${maxHeight}px`;
				}
			}
		}
	}

	const getLabel = (item: Record<any, string>) => {
		if (isObject(item)) {
			const label = item.label || '';
			return label.toString();
		}
	};

	const wrapperData = (v: KAutoCompleteProps['value']) => {
		return {
			value: v,
			label: v,
			id: v
		};
	};

	$: curValue = value
	let isOpen = false
	async function onOpen(e: CustomEvent) {
		isOpen = e.detail
		// TODO: isDisabledPopover = true
		if (fetchSuggestions &&
				(triggerOnFocus || !triggerOnFocus && !isDisabledPopover)) {
			fetchSuggestions(curValue, (res) => {
				list = res.map((v) => wrapperData(v.value as KAutoCompleteProps['value']));
				setVList();
			});
		}
	}

	// updateValue
	const handleSelect = async (data: Record<string, any>) => {
		// TODO: if (disabledInner) return;
		dispatch('updateValue', data.value);
		curValue = data.value
		// TODO: formInstance && formInstance?.updateField(field!, data, !formInstance.__manual_validate);
		// TODO: //await tick();
		// TODO: formInstance && (value = data!);
		popoverRef.updateShow(false);
	};

	const noDataCls = clsx(`k-select--tx__empty`);
</script>

<KPopover
	trigger="click"
	bind:this={popoverRef}
	disabled={isDisabledPopover}
	clsTrigger={cls}
	cls="px-0"
	arrow={false}
	on:change={onOpen}
	width={triggerWidth}
	placement="bottom"
>
	<div class={cname} {...attrs}
		 slot="triggerEl"
		 bind:this={inputSelectRef}
		 aria-hidden="true">
		<KInput
			on:input={handleInput}
			on:enter={handleEnter}
			on:keydown={handleKeydown}
			on:change={handleChange}
			on:compositionstart={handleCompositionstart}
			on:compositionend={handleCompositionend}
			on:compositionInput={handleCompositionInnput}
			on:triggerPrepend={handleTriggerPrepend}
			on:triggerAppend={handleTriggerAppend}
			{size}
			value={curValue}
			{placeholder}
			{disabled}
			{iconPrefix}
			{iconSuffix}
			{append}
			{prepend}
			{clearable}
			{useCompositionInput}
			{...$$restProps}
			{...attrs}
			type="text"
		>
			<slot name="prefix" slot="prefix"></slot>
			<slot name="suffix" slot="suffix"></slot>
		</KInput>

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
		{#if list.length > 0}
			<KVirtualList data={list}
						  key="id"
						  estimateSize={list.length}
						  let:data>
				{#if !$$slots.default}
					<KOption
						{fitInputWidth}
						label={getLabel(data)}
						on:click={() => handleSelect(data)}
					></KOption>
				{:else}
					<slot {data} onSelect={handleSelect} label={data} />
				{/if}
			</KVirtualList>
		{:else}
			<p class={noDataCls}>{text}</p>
		{/if}
	</div>
</KPopover>
