<script lang="ts">
	import type { KSwitchProps } from './types';
	import { KIcon } from '@ikun-ui/icon';
	import { clsx } from 'clsx';
	import { formKey, getPrefixCls } from "@ikun-ui/utils";
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import type { IKunFormInstance } from "@ikun-ui/form";
	import { formItemKey } from '@ikun-ui/utils';

	export let value: KSwitchProps['value'] = false;
	export let checkedValue: KSwitchProps['checkedValue'] = true;
	export let unCheckedValue: KSwitchProps['unCheckedValue'] = false;
	export let checkedColor: KSwitchProps['checkedColor'] = '';
	export let unCheckedColor: KSwitchProps['unCheckedColor'] = '';
	export let size: KSwitchProps['size'] = 'md';
	export let loading: KSwitchProps['loading'] = false;
	export let disabled: KSwitchProps['disabled'] = false;
	export let cls: KSwitchProps['cls'] = undefined;
	export let attrs: KSwitchProps['attrs'] = {};

	const dispatch = createEventDispatcher();

	/*********************** KForm logic start ************************/
	let disabledFrom = false
	$:disabledInner = disabledFrom || disabled
	let sizeFrom = ''
	$:sizeInner = sizeFrom || size

	const formContext = getContext(formItemKey) as string;
	const formInstance = getContext(formKey) as IKunFormInstance;
	let field: string | undefined = ''
	// Initialize the KSwitch value based
	// on the form value in the KFormItem context
	function formUpdateField(init = false){
		field = formContext.split('&').pop()
		value = formInstance.getValueByPath(
			field,
			init ? formInstance.__default_value: formInstance.__value
		)
	}
	function formPropsChangeCb(props: Record<any, any>) {
		disabledFrom = props.disabled
		sizeFrom = props.size
	}

	// Register event, KForm can set KInput value
	if(formContext && formInstance){
		formUpdateField(true)
		formPropsChangeCb(formInstance.__dynamicProps)
		formInstance.__itemCompMap[field] = {
			update: formUpdateField,
			type: 'switch'
		}
		formInstance.__propHandleEvtMap.push(formPropsChangeCb)
	}
	/*********************** KForm logic end ************************/

	$: innerState = value === checkedValue;
	/**
	 * change state method
	 */
	let changeData: {
		newVal: KSwitchProps['value'];
		oldVal: KSwitchProps['value'];
	};
	const emitChangeEvt = (): void => {
		changeData = innerState
			? {
					newVal: unCheckedValue,
					oldVal: checkedValue
			  }
			: {
					newVal: checkedValue,
					oldVal: unCheckedValue
			  };
		dispatch('change', changeData);
	};

	/**
	 * set animation class
	 */
	let switching = '';
	let switchCircleRef: null | HTMLElement = null;
	const changeClass = (checked: boolean) => {
		return new Promise((resolve) => {
			switching = `${prefixCls}-tra`;
			if (switchCircleRef) {
				const circleWidth = switchCircleRef.getClientRects()[0]?.width;
				switchCircleRef.style.right = checked ? '1px' : `calc(100% - ${circleWidth}px - 1px)`;
			}
			setTimeout(() => {
				switching = '';
				resolve(true);
			}, 300);
		});
	};

	let isUpdateModel = false;
	const switchState = async () => {
		// switch state
		emitChangeEvt();
		dispatch('updateValue', changeData.newVal);
		isUpdateModel = true;
		if(formInstance){
			formInstance.updateField(field!, changeData.newVal);
			value = changeData.newVal
		}
		await changeClass(changeData.newVal === checkedValue);
	};

	$: if (changeData && value !== changeData.newVal) {
		if (!isUpdateModel) {
			emitChangeEvt();
		}
		isUpdateModel = false;
	}
	/**
	 * click method
	 * @param {Event} e - event obejct
	 */
	const handleClick = async (e?: Event) => {
		if (disabledInner || loading) return;
		await switchState();
		dispatch('click', e);
	};
	/**
	 * initial method
	 */
	const init = async () => {
		await changeClass(innerState);
	};
	onMount(init);

	const prefixCls = getPrefixCls('switch');
	$: switchCls = clsx(
		`${prefixCls}`,
		`${prefixCls}--base`,
		`${prefixCls}--${sizeInner}`,
		innerState
			? [`${prefixCls}__checked`, checkedColor]
			: [`${prefixCls}__unchecked`, unCheckedColor],
		{
			[`${prefixCls}__disabled`]: disabledInner || loading
		},
		switching,
		cls
	);
	$: loadingCls = clsx(`${prefixCls}-loading`, `${prefixCls}-loading__dark`);
	$: circleCls = clsx(`${prefixCls}-circle`, `${prefixCls}-circle--${sizeInner}`);
	$: unCheckedTxCls = clsx(`${prefixCls}-tx__unchecked`, `${prefixCls}-tx__unchecked--${sizeInner}`);
	$: checkedTxCls = clsx(`${prefixCls}-tx__checked`, `${prefixCls}-tx__checked--${sizeInner}`);
</script>

<div class={switchCls} aria-hidden="true" {...$$restProps} {...attrs} on:click={handleClick}>
	{#if !innerState}
		<span class={unCheckedTxCls}>
			<slot name="unCheckedRender" state={innerState} />
		</span>
	{/if}
	<span class={circleCls} bind:this={switchCircleRef}>
		{#if loading}
			<KIcon cls={loadingCls} icon="i-carbon-circle-dash" />
		{/if}
	</span>
	{#if innerState}
		<span class={checkedTxCls}>
			<slot name="checkedRender" state={innerState} />
		</span>
	{/if}
</div>
