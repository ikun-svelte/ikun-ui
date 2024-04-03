<script lang="ts">
	import { KIcon } from '@ikun-ui/icon';
	import { KVirtualList } from '@ikun-ui/virtual-list';
	import { createEventDispatcher, getContext, onMount, tick } from 'svelte';
	import { clsx } from 'clsx';
	import { formItemKey, formKey, getPrefixCls } from '@ikun-ui/utils';
	import { KPopover } from '@ikun-ui/popover';
	import KOption from './option.svelte';
	import type { KSelectProps } from './types';
	import { isObject, isString, isNumber, debounce } from 'baiwusanyu-utils';
	import type { IKunFormInstance } from '@ikun-ui/form';

	export let iconPrefix: KSelectProps['iconPrefix'] = '';
	export let iconSuffix: KSelectProps['iconSuffix'] = '';
	export let value: KSelectProps['value'] = '';
	export let cls: KSelectProps['cls'] = undefined;
	export let clsSelect: KSelectProps['cls'] = undefined;
	export let placeholder: KSelectProps['placeholder'] = 'Please select value';
	export let disabled: KSelectProps['disabled'] = false;
	export let attrs: KSelectProps['attrs'] = {};
	export let labelKey: KSelectProps['labelKey'] = 'label';
	export let valueKey: KSelectProps['valueKey'] = 'value';
	export let key: KSelectProps['key'] = 'id';
	export let fitInputWidth: KSelectProps['fitInputWidth'] = true;
	export let dataList: KSelectProps['dataList'] = [];
	export let maxHeight: KSelectProps['maxHeight'] = 250;
	export let clearable: KSelectProps['clearable'] = false;
	export let remote: KSelectProps['remote'] = undefined;
	export let size: KSelectProps['size'] = 'md';

	/*********************** KForm logic start ************************/
	let disabledFrom = false;
	$: disabledInner = disabledFrom || disabled;
	let sizeFrom = '';
	$: sizeInner = sizeFrom || size;
	let isErrorForm = false;
	$: isErrorInner = isErrorForm;
	const formContext = getContext(formItemKey) as string;
	const formInstance = getContext(formKey) as IKunFormInstance;
	let field: string | undefined = '';
	// Initialize the KInput value based
	// on the form value in the KFormItem context
	function formUpdateField(init = false) {
		field = formContext.split('&').pop();
		value =
			formInstance.getValueByPath(
				field,
				init ? formInstance.__default_value : formInstance.__value
			) || '';
	}
	function formPropsChangeCb(props: Record<any, any>) {
		disabledFrom = props.disabled;
		sizeFrom = props.size;
	}

	function fromFieldError(error: boolean) {
		isErrorForm = error;
	}

	// Register event, KForm can set KInput value
	if (formContext && formInstance) {
		formUpdateField(true);
		formPropsChangeCb(formInstance.__dynamicProps);
		formInstance.__itemCompMap[field] = {
			update: formUpdateField,
			type: 'select'
		};
		formInstance.__errorCompEvtMap[field] = fromFieldError;
		formInstance.__propHandleEvtMap.push(formPropsChangeCb);
	}
	/*********************** KForm logic end ************************/

	let valueType: 'o' | 'n' | 's' = 'o';
	const wrapperData = (v: KSelectProps['value']) => {
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
	let dataListInner = dataList.map(wrapperData) as Record<string, any>[];
	$: {
		dataListInner = dataList.map(wrapperData) as Record<string, any>[];
	}

	// updateValue
	const dispatch = createEventDispatcher();
	let popoverRef: any = null;
	const handleSelect = async (data: KSelectProps['value'] | null) => {
		if (disabledInner) return;
		if (data && (valueType === 'n' || valueType === 's')) {
			const finalData = data[valueKey as keyof typeof data];
			dispatch('updateValue', finalData);
			formInstance && formInstance?.updateField(field!, finalData, !formInstance.__manual_validate);
			formInstance && (value = finalData);
			await tick();
		} else if (
			(!data && (valueType === 'n' || valueType === 's')) ||
			(valueType === 'o' && isObject(data))
		) {
			dispatch('updateValue', data);
			formInstance && formInstance?.updateField(field!, data, !formInstance.__manual_validate);
			await tick();
			formInstance && (value = data!);
		}
		popoverRef.updateShow(false);
	};

	// set popover's trigger and content dom width
	let inputSelectRef: HTMLElement | null = null;
	let popoverWidth: undefined | string = undefined;
	let triggerWidth: undefined | string = 'initial';
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
		if (disabledInner) return;
		if (show) {
			getLabel(value) && (isShowClear = show);
		} else {
			isShowClear = show;
		}
	};
	const handleClear = (e: MouseEvent) => {
		e.stopPropagation();
		if (valueType === 'o') {
			handleSelect({});
		} else if (valueType === 's') {
			handleSelect('');
		} else {
			handleSelect(null);
		}
	};

	let isDisabledPopover = disabledInner || !!remote;
	$: {
		isDisabledPopover = disabledInner || !!remote;
	}

	async function onOpen(e: CustomEvent) {
		await tick();
		handleExpend(e);
		if (e.detail && dataListInner.length > 0) {
			setTimeout(setVList, 100);
		} else if (!e.detail && remote) {
			// reset remote popover disabled
			isDisabledPopover = true;
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
		if (popoverModalRef) {
			const container = popoverModalRef.childNodes[0];
			if (container) {
				const el = (container as HTMLElement).children[0];
				if (el) {
					const { height } = (container as HTMLElement).children[0].getBoundingClientRect();
					if (height > maxHeight) {
						heightInner = `${maxHeight}px`;
						await tick();
						vListRef && locateItem();
					}
				}
			}
		}
	}

	async function locateItem() {
		for (let i = 0; i < dataListInner.length; i++) {
			if (isActive(dataListInner[i] as KSelectProps['value'])) {
				vListRef && vListRef.scrollToIndex(i - 3);
				break;
			}
		}
	}

	// remote search
	let text = 'no data';
	const remoteSearch = debounce(async (e) => {
		dataListInner = [];
		isDisabledPopover = false;
		heightInner = 'initial';
		await tick();
		popoverRef.updateShow(true);
		text = 'loading';
		try {
			if (remote) {
				remote(e.target.value, (data: KSelectProps['dataList']) => {
					dataListInner = data.map(wrapperData) as Record<string, any>[];
					text = 'no data';
					dataListInner.length > 0 && setVList();
				});
			}
		} catch (e) {
			text = 'no data';
		}
	}, 300);

	// class names
	const prefixCls = getPrefixCls('select');
	$: cnames = clsx(
		`${prefixCls}--base`,
		`${prefixCls}__${sizeInner || size}`,
		{
			[`${prefixCls}--base__disabled`]: disabledInner,
			[`${prefixCls}--base__dark`]: !disabledInner,
			[`${prefixCls}--base__disabled__dark`]: disabledInner
		},
		{
			[`${prefixCls}__error`]: isErrorInner,
			[`${prefixCls}__hover`]: !isErrorInner,
			[`${prefixCls}__focus`]: !isErrorInner
		},
		clsSelect
	);
	$: selectCls = clsx(`${prefixCls}--inner`, `${prefixCls}--inner__${sizeInner || size}`, {
		[`${prefixCls}--inner__dark`]: !disabledInner,
		[`${prefixCls}--base__disabled`]: disabledInner,
		[`${prefixCls}--base__disabled__dark`]: disabledInner,
		[`${prefixCls}--inner__disabled__dark`]: disabledInner
	});
	const prefixIconCls = clsx(`${prefixCls}--prefix`, `${prefixCls}--icon__${sizeInner || size}`);
	const suffixIconCls = clsx(`${prefixCls}--suffix`, `${prefixCls}--icon__${sizeInner || size}`);
	const selectIconCls = clsx(`${prefixCls}--icon`, `${prefixCls}--icon__${sizeInner || size}`);
	const noDataCls = clsx(`${prefixCls}--tx__empty`);
	/*//initial field
  formContext?.initialField(value);
  // when filed change,dom value will change.
  formContext?.subscribe((val: any) => {
    value = val;
  });*/
	// ⭕TODO 选项分组
	// ⭕TODO 基础多选
	// ⭕TODO 多选最大显示
	// ⭕TODO 选项筛选
</script>

<svelte:window on:resize={setPopoverW} />
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
				<i>
					<KIcon icon={iconPrefix} cls={prefixIconCls} width="auto" height="auto" />
				</i>
			{/if}
		</slot>

		<input
			class={selectCls}
			readonly={!remote}
			on:input={remoteSearch}
			value={getLabel(value)}
			disabled={disabledInner}
			{placeholder}
		/>

		<slot name="suffix">
			{#if iconSuffix}
				<i>
					<KIcon icon={iconSuffix} cls={suffixIconCls} width="auto" height="auto" />
				</i>
			{/if}
		</slot>
		{#if clearable && isShowClear}
			<i data-k-select-clear aria-hidden="true" on:click={handleClear}>
				<KIcon icon="i-carbon-close-outline" cls={selectIconCls} width="auto" height="auto" />
			</i>
		{:else}
			<i>
				<KIcon icon={expendIcon} cls={selectIconCls} width="auto" height="auto" />
			</i>
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
		{#if dataListInner.length > 0}
			<KVirtualList
				data={dataListInner}
				{key}
				bind:this={vListRef}
				estimateSize={dataListInner.length}
				let:data
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
		{:else}
			<p class={noDataCls}>
				{text}
			</p>
		{/if}
	</div>
</KPopover>
